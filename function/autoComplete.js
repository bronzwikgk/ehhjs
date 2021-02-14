const snippets = [

    {
        prefix: "for",
        body: ["for (let i = 0; i < size; i++) { \n }  \n "]
    },
    {

        "prefix": "function",
        "body": [
            "function  name (params)\n {\n }\n "
        ]
    },
    {
        "prefix": "if",
        "body": [
            "if   (condition) {\n }\n "
        ],
    },
    {
        "prefix": "log",
        "body": [
            "console.log();"
        ],
    }
];

class AutoComplete {
    static checkSuggestion(keyword, editor) {
        keyword = this.removeSpecialCharacters(keyword.trim());

        if (this._isContains(snippets, keyword)) {
            // console.log(snippets)
            for (let i = 0; i < snippets.length; ++i) {

                const obj = snippets[i];
                // console.log(obj.prefix+" "+keyword)

                if (obj.prefix === keyword.trim()) {

                    console.log(editor.innerText.substring(0, editor.innerText.length - keyword.trim().length))
                    editor.innerText = editor.innerText.substring(0, editor.innerText.length - keyword.trim().length) + obj.body
                    this.setCaretToEnd(editor)
                }
            }
        } else {
            console.log("Nope")
        }
    }

    static removeSpecialCharacters(keyword) {
        // console.log(keyword)
        const desired = keyword.replace(/[^\w\s]/gi, '');
        // console.log(desired.trim())
        return desired
    }

    static _isContains(json, value) {
        // console.log(value.trim())
        let contains = false;
        Object.keys(json).some(key => {
            contains = typeof json[key] === 'object' ? this._isContains(json[key], value.trim()) : json[key] === value.trim();
            return contains;
        });
        return contains;
    }

    static setCaretToEnd(target) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(target);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        target.focus();
        range.detach(); // optimization

        // set scroll to the end if multiline
        target.scrollTop = target.scrollHeight;
    }

}
