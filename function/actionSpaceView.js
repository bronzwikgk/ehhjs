class ActionView {
     constructor(model) {
        this.model = model
    }

    updateDomContent=(data)=> {
        this.model.updateJson(data)
        document.getElementById('actionOutput-block').innerHTML=data
    }

    getDomContent() {

    }
    updateDom(cmd) {
        console.log("update Dom Called")
        const headingDiv = document.createElement("div");
        headingDiv.classList.add("div-block");
        headingDiv.contentEditable = "true";
        const editor = document.getElementsByTagName("divblock")[0];

        editor.appendChild(headingDiv);
        headingDiv.focus();

        if (cmd === "headingBlock") {

            document.execCommand("formatBlock", false, '<h1>');
        } else if (cmd === "paraBlock") {
            document.execCommand("formatBlock", false, '<p>');

        }
    }
}
