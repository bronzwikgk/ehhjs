class Editor{
    constructor(element) {
        this._editor = [element]
        console.log(element)
        //this._editor['blocks'] = "", // query selector command to be input.
        document.addEventListener("keydown", function(e) {
            console.log(e.which);
            editor.getCaret(e);
          })
          window.addEventListener("change", function(e) {
            console.log(e.which,e.type);
          })
    }
    getCaret(e){
        console.log(console.type,e.target)
    }
}

var editor = new Editor(window['actionEditor'], { theme: 'snow' });


