async function json2html(query, parent, first = true) {
    if (!query) return undefined;
    if (first) query = JSON.parse(JSON.stringify(query));

    if ((!operate.isArray(query)) && query.length === undefined) {
        var waselem = true;
        query = [query];
    }
    for (var i = 0; i < query.length; i++) {
        if (query[i].type === 'comment') {
            var el = document.createComment(query[i].text);
            if (parent) Entity.append(el, parent);
        }
        else if (query[i].type === 'text') {
            var el = document.createTextNode(query[i].text);
            if (parent) Entity.append(el, parent);
        }
        else if (query[i].name && (query[i].name.toLowerCase() === 'style' || (query[i].name.toLowerCase() === 'link' && query[i].sheet))) {
            var text = await json2css(query[i].sheet);

            var el = document.createElement('style');
            el.innerHTML = text;
            if (parent) Entity.append(el, parent);
        } else {

            var el = document.createElement(query[i].name || 'div');
            for (var key in query[i].attributes) {
                if (key.toLowerCase() === 'style') {
                    for (var k in query[i].attributes.style) {
                        el.style[k] = query[i].attributes.style[k];
                    }
                } else {
                    el.setAttribute(key, query[i].attributes[key]);
                }
            }

            if (query[i].items)
                await json2html(query[i].items, el, false);

            if (parent) Entity.append(el, parent);
            query[i] = el;
        }
    }
    if (waselem) return query[0];
    return query;
}