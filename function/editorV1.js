class Editor{
    constructor(element) {
        this._editor = [element]
        //this._editor['blocks'] = "", // query selector command to be input.
        document.addEventListener("keydown", function(e) {
            console.log(e.which);
          })
    }
    getCaret(){

    }

}

var editor = new Editor('#actionEditor', { theme: 'snow' });


