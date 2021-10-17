

class Entity {
    constructor() {
        this.objectStore = {};
        this.counter = 0;
    }
    /**
     * creates a new entity with output as the datatype and input as the data
     * @param {any} input
     * @param {any} output
     */
    static create(input, output) {
        //convert input into output
        var itype = operate.trueTypeOf(input).toLowerCase();
        var otype = operate.trueTypeOf(output).toLowerCase();
        var response;

        if (otype.includes("string")) {
            //so, it's the datatype
            otype = output.toLowerCase();
        }

        if (otype.includes("html")) {
            if (itype.includes("object")) {
                response = json2html(input);
            }
        }
        else if (otype.includes("css")) {
            if (itype.includes("object")) {
                response = json2css(input);
            }
        }
        else if (otype.includes("object")) {

            if (itype.includes("array")) {
                // input should have numeric keys
                response = arr2obj(input, {});
            }
            else if (itype.includes("css")) {
                response = css2json(input);
            }
            else if (itype.includes("html")) {
                response = html2json(input);
            }
        }
        else if (otype.includes("array")) {
            if (itype.includes("object")) {
                response = obj2arr(input, []);
            }
        }

        return response || input;
    }
    /**
     * Appends a single value to array
     * Concatenates two arrays (pass "concat" as options)
     * Sets a key value pair into object (pass input as value and options as the key)
     * @param {any} input
     * @param {any} parent
     * @param {any} options
     */
    static append(input, parent, options) {

        var ptype = operate.trueTypeOf(parent).toLowerCase();
        var itype = operate.trueTypeOf(parent).toLowerCase();
        if (ptype.includes("html")) {
            parent.appendChild(input);
        }
        else if (ptype.includes("array")) {

            if (options === "concat") {
                parent = parent.concat(input);
            } else {
                parent.push(input);
            }
        }
        else if (ptype.includes("object")) {
            var key = options;
            parent[key] = input;
        } else {
            parent += input;
        }
        return parent;
    }
    static get(key, parent) {
        var keys;

        if (operate.isArray(key))
            keys = key;
        else
            keys = Entity.stringToPath(key);
        var hold = parent;

        var l = { keys: keys, hold: hold };

        Entity.walk({ rngstart: 0, rngend: keys.length }, {
            value: {
                func: function (i, l) {
                    var key = l.keys[i];
                    if (!l.hold) return false;
                    l.hold = l.hold[key];
                    return false;
                },
                args: [l]
            }
        });

        if (l.hold) {
            return l.hold;
        } else {
            return key;
        }
    }
    static getValue(str, l, x) {
        if (operate.isString(str) && str.charAt(0) == '$') {
            //console.log(str, l, x);
            return eval(str.substr(1));
        }
        return (x !== undefined) ? x : str;
    }
    static setObjKeyVal(obj, key, val) {
        obj[key] = val;
    }
    static uniqueId(obj) {
        if(!obj.__proto__){
            console.error("Cannot set uid of ", obj);
            return;
        }
        if(obj.__proto__.__uniqueId === undefined) obj.__proto__.__uniqueId = counter++; 
        this.objectStore[obj.__proto__.__uniqueId] = obj;
    }
    static getById(uid) {
        return this.objectStore[uid];
    }
    // static requestExpander(request) {
    //     if (request == null) return;

    //     if (operate.isString(request)) {
    //         request = window[request];
    //     }

    //     if (!operate.isObject(request)) {
    //         console.error(request, " is not a valid Object");
    //         throw Error("Terminate Called");
    //     }

    //     var rclone = { ...request };
    //     var parent = null;

    //     if (request.hasOwnProperty('extends')) {

    //         var parent = Entity.requestExpander(window[request['extends']]); // parent is a JSON request

    //         request = { ...parent };
    //         delete request['extends'];

    //         var del = rclone.delete;
    //         delete rclone.delete;

    //         request = Entity.extends(rclone, request, del);

    //         delete request['extends'];
    //     }
    //     return request;

    // }
    // static complexRequestExpander(requestArr, maxDebugDepth = 10, depth = 0) {
    //     if (requestArr == null) return;

    //     if (operate.isString(requestArr)) {
    //         requestArr = window[requestArr];
    //     }

    //     if (depth > maxDebugDepth) {
    //         console.warn('Will not expand when depth > ', maxDebugDepth);
    //         return resultArr;
    //     }

    //     if (operate.isObject(requestArr)) {
    //         requestArr = [requestArr];
    //     } else if (!operate.isArray(requestArr)) {
    //         console.error(requestArr, " is not a valid Object or Array");
    //         throw Error("Terminate Called");

    //     }
    //     var resultArr = [];

    //     Entity.walk(
    //         { rngstart: 0, rngend: requestArr.length },
    //         {
    //             value: {
    //                 func: function (i, requestArr, resultArr) {
    //                     var request = requestArr[i];

    //                     // single request
    //                     // console.log(request);
    //                     var rclone = Entity.copy(request);
    //                     var parent = null;

    //                     if (request.hasOwnProperty('extends')) {

    //                         var parent = Entity.complexRequestExpander(window[request['extends']], depth); // parent is a JSON request

    //                         request = Entity.copy(parent);

    //                         var del = rclone.delete;
    //                         delete rclone.delete;

    //                         request = Entity.extends(rclone, request, del);

    //                         delete request['extends'];
    //                     }

    //                     if (request.hasOwnProperty('callback')) {
    //                         request.callback = Entity.complexRequestExpander(request.callback, depth + 1);
    //                     }

    //                     resultArr.push(request);
    //                 },
    //                 args: [requestArr, resultArr]
    //             }
    //         }
    //     );
    //     if (resultArr.length == 1) {
    //         return resultArr[0];
    //     }
    //     return resultArr;
    // }
    // static get2(path, l) {

    //     var start = 0, inside = false;
    //     var parent = l;
    //     function get2Simple(key){
    //         if(it has a .)
    //     }

    //     for(var i=0;i<path.length;i++){
    //         var ch = path.charAt(i);

    //         if((ch == '[' || ch == '.') && !inside){
    //             //get Ready we have to do something
    //             key = '';
    //             inside = true;
    //         } else if(ch == '\'' || ch == '\"'){
    //             continue;
    //         } else if( ch == ']'){
    //             inside = false;
    //             parent = parent[get2(key)];
    //         } else if( path[i] == '.'){
    //             inside = true;
    //             parent = parent[get2(key)];
    //             key='';
    //         } else
    //             key += ch;
    //         if(key != ''){
    //             parent = parent[key];
    //         }
    //     }
    //     return parent;
    // }
    static stringToPath(path) {

        if (typeof path !== 'string') return path;

        var output = [];
        var debug;
        // if(path === "attributes.$all.$into-parent.$only-object.$follow-HTMLAttributeSchema")debug = true;

        var dt = { '\"': 1, "\'": 1 }; //toggle
        var dn = [']', ")", "}"]; //negative
        var dp = ['[', "(", "{"]; //positive
        var ds = ['.']; //seperator
        var lastdepth = 0, depth = 0;

        var key = '';

        for (var i = 0; i < path.length; i++) {
            var x = path.charAt(i);

            if (Object.keys(dt).indexOf(x) >= 0) {
                depth += dt[x];
                if (dt[x] === 1) dt[x] = -1;
                else dt[x] = 1;
            } else if (dp.indexOf(x) >= 0) {
                depth += 1;
            } else if (dn.indexOf(x) >= 0) {
                depth -= 1;
            }
            if (ds.indexOf(x) >= 0) {
                if (depth === 0) {
                    if (key.trim() !== '') {
                        output.push(key.trim());
                        key = '';
                    } else key += x;
                } else key += x;
            }
            else if (lastdepth >= 0) {
                key += x;
            }

            lastdepth = depth;
        }
        if (key.trim() !== '') {
            output.push(key.trim());
        }

        return output;

    }
    static equalizeArraysInDelete(req, del) { //Fixing function
        var l = { req: req };
        var callback = {
            object: {
                func: function (del, key, l) {
                    var clone = l.req;

                    l.req = l.req[key];
                    Entity.walk(del[key], l.callback);
                    l.req = clone;

                    return false;
                },
                args: [l]
            },
            array: {
                func: function (del, key, l) {
                    while (del[key].length < l.req[key].length) {
                        del[key].push(null);
                    }
                    var clone = l.req;

                    l.req = l.req[key];
                    Entity.walk(del[key], l.callback);
                    l.req = clone;

                    return false;
                },
                args: [l]
            }
        }
        l.callback = callback;
        Entity.walk(del, callback);

        return del;
    }
    static deleteProps(req, del) {
        // console.log(del);
        del = Entity.equalizeArraysInDelete(req, del);
        // console.log(del);
        var l = { req: req };

        var callback = { // iterating over del
            value: {
                func: function (obj, key, l) {
                    // console.log(l.tmp);
                    if (l.tmp) {  // is not null
                        if (obj[key]) { // ignore this
                            return;
                        } else { // add this to the array
                            l.tmp.push(l.req[key]);
                        }
                    } else if (obj[key]) // is not null
                        delete l.req[key];

                    return false;

                },
                args: [l]
            },
            array: {
                func: function (obj, key, l) {

                    var clone = l.req;
                    var clonetmp = l.tmp || null;

                    l.tmp = [];
                    l.req = l.req[key];
                    Entity.walk(obj[key], l.callback);
                    l.req = clone;

                    var anstmp = l.tmp;


                    if (clonetmp)
                        clonetmp.push(anstmp);
                    else
                        l.req[key] = anstmp;

                    l.tmp = clonetmp;

                    return false;
                },
                args: [l]
            },
            object: {
                func: function (obj, key, l) {
                    var clone = l.req;
                    var clonetmp = l.tmp || null;

                    l.tmp = null;

                    l.req = l.req[key];
                    Entity.walk(obj[key], l.callback);
                    l.req = clone;

                    if (clonetmp)
                        clonetmp.push(l.req[key]);
                    // else
                    //     l.req[key] = l.req[key]; //lol

                    l.tmp = clonetmp;

                    return false;
                },
                args: [l]
            }

        }
        l.callback = callback;

        Entity.walk(del, callback);

        return l.req;
    }
    static setProps(req, model, ALLSTATES = {}) {
        if(operate.trueTypeOf(model) === "html") {
            for (var key in req) {
                if (key === 'style') {
                    for (var k in req.style) {
                        el.style[k] = req.style[k];
                    }
                } else {
                    model.setAttribute(key, req[key]);
                }
            }
        }
        else if(operate.trueTypeOf(model) === "object") {
            for (var key in req) {
                // console.log(ALLSTATES, key, req[key]);
                var subkeys = Entity.stringToPath(key);
                var parent = ALLSTATES;
                for (var i = 0; i < subkeys.length - 1; i++) {
                    // console.log(parent);
                    parent = parent[subkeys[i]];
                }
                // console.log("SETPROPS", parent, subkeys[subkeys.length-1], req[key]);
                parent[subkeys[subkeys.length - 1]] = Entity.updateProps(req[key], null, ALLSTATES, true);
            }
        }
    }
    static updateProps(req, model, ALLSTATES = {}, parse = true) {
        if (req && req.__parse !== undefined) parse = req.__parse;
        if(operate.trueTypeOf(req) === "object") {


            
        }
        else if ((operate.trueTypeOf(req) != operate.trueTypeOf(model)) || (!req)) {
            if (operate.isArray(req) && (!operate.isArray(model))) model = [];
            else if (operate.isObject(req) && (!operate.isObject(model))) model = {};
            else if (operate.isWithKeys(req)) {
                if (!model) model = {};
            }
        }

        var l = { model: model };

        var callback = {
            array: {
                func: function (obj, key, l) {

                    l.model[key] = l.model[key] || [];
                    var clone = l.model;

                    l.model = l.model[key];
                    Entity.walk(obj[key], l.callback);
                    l.model = clone;

                    return false;
                },
                args: [l]
            },
            object: {
                func: function (obj, key, l) {

                    l.model[key] = l.model[key] || {};
                    var clone = l.model;

                    l.model = l.model[key];
                    Entity.walk(obj[key], l.callback);
                    l.model = clone;

                    return false;
                },
                args: [l]
            },
            value: {
                func: function (obj, key, l, ALLSTATES, parse) {
                    if (parse) l.model[key] = Entity.getValue(obj[key], ALLSTATES);
                    else l.model[key] = obj[key];

                    // console.log(l.model, key, l.model[key], obj[key]);
                    return false;
                },
                args: [l, ALLSTATES, parse]
            }
        };
        l.callback = callback;
        Entity.walk(req, callback, ALLSTATES);

        return l.model;
    }
    static extends(req, model, del) {

        model = { ...model };
        if (del) model = Entity.deleteProps(model, del);
        model = Entity.updateProps(req, model, {}, false);

        return model;
    }
    static async walk(req, callback, ALLSTATES = {}, maxdepth = Infinity, depth = 0) { // it goes for depth first

        if (depth > maxdepth) return;

        var emp = function () { };

        if (!callback.value) callback.value = {};
        if (!callback.value.func) callback.value.func = emp;
        if (!callback.value.args) callback.value.args = [];

        if (!callback.l) callback.l = {};

        var rtype = operate.trueTypeOf(req);

        if (rtype === 'object' && req.hasOwnProperty('rngstart')) {
            if (!req.delta) {
                req.delta = 1;
            }
            // console.log(callback.value.func, req.rngstart, req.rngend);
            for (var i = req.rngstart; i != req.rngend; i += req.delta) {
                callback.l.args = [i, ...callback.value.args];

                if (operate.isFunction(callback['value'].func)) {
                    if (callback['value'].wait) {
                        if (await callback['value'].func(...callback.l.args))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                    }
                    else if (callback['value'].func(...callback.l.args))
                        await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                }
                else {
                    if (callback['value'].wait) {
                        if (await engine.processRequest(callback['value'].func, callback.l))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                    }
                    else if (engine.processRequest(callback['value'].func, callback.l))
                        await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                }
            }
        } else if (rtype === 'array') {

            for (var i = 0; i < req.length; i++) {

                var type = operate.trueTypeOf(req[i]);
                if (callback.hasOwnProperty(type)) {

                    callback.l.args = [req, i, ...callback[type].args];

                    if (operate.isFunction(callback[type].func)) {
                        if (callback[type].wait) {
                            if (await callback[type].func(...callback.l.args))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                        }
                        else if (callback[type].func(...callback.l.args))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                    }
                    else {
                        if (callback[type].wait) {
                            if (await engine.processRequest(callback[type].func, callback.l))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                        }
                        else if (engine.processRequest(callback[type].func, callback.l))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                    }
                } else {
                    callback.l.args = [req, i, ...callback['value'].args];

                    if (operate.isFunction(callback['value'].func)) {
                        if (callback['value'].wait) {
                            if (await callback['value'].func(...callback.l.args))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                        }
                        else if (callback['value'].func(...callback.l.args))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                    }
                    else {
                        if (callback['value'].wait) {
                            if (await engine.processRequest(callback['value'].func, callback.l))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                        }
                        else if (engine.processRequest(callback['value'].func, callback.l))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                    }
                }
            }
        } else if (operate.isWithKeys(req)) {
            for (var i in req) {
                // var x = i;
                // i = Entity.getValue(i, ALLSTATES);

                // if(x!=i)console.log("x, i:", x, i, ALLSTATES);

                var type = operate.trueTypeOf(req[i]);
                if (callback.hasOwnProperty(type)) {

                    callback.l.args = [req, i, ...callback[type].args];

                    if (operate.isFunction(callback[type].func)) {
                        if (callback[type].wait) {
                            if (await callback[type].func(...callback.l.args))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                        }
                        else if (callback[type].func(...callback.l.args)) {
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                        }

                    }
                    else {
                        if (callback[type].wait) {
                            if (await engine.processRequest(callback[type].func, callback.l))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                        }
                        else if (engine.processRequest(callback[type].func, callback.l))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                    }
                } else {
                    callback.l.args = [req, i, ...callback['value'].args];

                    if (operate.isFunction(callback['value'].func)) {
                        if (callback['value'].wait) {
                            if (await callback['value'].func(...callback.l.args))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                        }
                        else if (callback['value'].func(...callback.l.args))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);

                    }
                    else {
                        if (callback['value'].wait) {
                            if (await engine.processRequest(callback['value'].func, callback.l))
                                await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                        }
                        else if (engine.processRequest(callback['value'].func, callback.l))
                            await Entity.walk(req[i], callback, ALLSTATES, maxdepth, depth + 1);
                    }
                }
            }
        } else {
            console.warn("req should be an object/array.What's this? ", req);
            return;
        }
    }
    // Entity with dom now
    static querySelectorAll(selector, element = document) {
        return element.querySelectorAll(selector);
    }
    static querySelector(selector, element = document) {
        return element.querySelector(selector);
    }
    static replaceChild(newChild, oldChild, parent) {
        return parent.replaceChild(newChild, oldChild);
    }
    static appendChild(elem, parent) {
        return parent.appendChild(elem);
    }
    static setProps(input, props) {
    }
    static async getExtendedJson(url) {
        
        try {
            
            var resp = await fetch(url);
            if(resp.status !== 200) throw Error("Error while fetching", url);
            resp = await resp.text();

            resp = await JSON.parse(resp);
            
            await Entity.walk(resp, {
                value:{
                    func:async function(obj, key){
                        if(operate.isObject(obj[key]) || operate.isArray(obj[key])){
                            return true;
                        }
                        if(operate.isString(obj[key]) && obj[key].indexOf("$getJson-") === 0){
                            obj[key] = await Entity.getExtendedJson(obj[key].substr("$getJson-".length));
                        }
                    }, 
                    args:[],
                    wait:true
                }
            })
            return resp;
        } catch(e) {
            console.error(e);
            return url;
        }
    }
}

