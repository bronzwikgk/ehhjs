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

}
