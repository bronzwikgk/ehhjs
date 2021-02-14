class ActionView {
    constructor(model) {
        this.model = model
    }

    updateDomContent = (data) => {
        this.model.updateJson(data)
        document.getElementById('actionOutput-block').innerHTML = data
    }

    wrapContent = (wrapper) => {

        let selectedText = window.getSelection().anchorNode.data.substring(window.getSelection().anchorOffset, window.getSelection().extentOffset);
        let wrappedText = `<${wrapper}>${selectedText}</${wrapper}>`
        this.updateEditor(wrappedText)
    }

    applyStyle = (style) => {
        let selectedText = window.getSelection().anchorNode.data.substring(window.getSelection().anchorOffset, window.getSelection().extentOffset);
        let wrappedText = `<div style="${style}">${selectedText}</div>`
        this.updateEditor(wrappedText)

    }

    insertTag=(tag)=>{
        let editor=document.getElementById('editor')
        document.getElementById('editor').innerText=`${editor.innerText} <${tag}>`
        console.log(editor.innerText)
        editor.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }


    }

    updateEditor = (wrappedText) => {
        let sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(wrappedText));
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = wrappedText;
        }

        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });

        document.getElementById('editor').dispatchEvent(event);

        this.model.updateJson(wrappedText)
    }

    autoComplete(){
        let val= document.getElementById('editor').innerText.trim()
        const input=val.split(/[^A-Za-z]/);
        AutoComplete.checkSuggestion(input[input.length - 1], document.getElementById('editor'))
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });

        document.getElementById('editor').dispatchEvent(event);

    }
}
