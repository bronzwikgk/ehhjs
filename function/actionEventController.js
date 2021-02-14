//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
//this file handles all the events that are Initialised during Init.

//To make a getReq to a appScript server the queryParameter have to be added to the url using buildEncodedURI.
//when making a post request a normal post works.
// function processButtonClick(e) {
//     e.preventDefault();
//     console.log(e.target.id);
//     if (e.target.id === 'get') {
//         request.method = "GET";
//         var encodedParam = clientNodeFetch.buildEncodedUri(request);
//         var url2 = url + "?" + encodedParam;
//         clientNodeFetch.fetchUrl(url2);
//     }
//     if (e.target.id === 'post') {
//         //request = getRequest;
//         request.method = "POST";
//         clientNodeFetch.fetchHttpRequest(url, request);
//     }
//
//
// }
//
//
// document.getElementById("get").addEventListener("click", processButtonClick);
// document.getElementById("post").addEventListener("click", processButtonClick);
//

class actionEventController {
    constructor(context) {
        this._events = {};
        this.context = context
        this.createListeners(context)
    }


    on(evt, listener) {
        console.log(evt);
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }

    emit(evt, arg) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }

    createListeners(entity) {
        console.log(entity)
        let events = dataHelpers.find(entity, 'on')
        console.log(events)

        events.forEach((evt) => {
            window[evt] = this.conductEvent
        })
    }


    conductEvent = (e) => {

        if (e.type === "mouseover") {
            // console.log("Mouse moved")
            //TODO
            // this.emit(e.type, e.target)
        } else if (e.type === "click") {
            // console.log("click")
            console.log(e.target)
            this.emit("click", e.target)
            if (e.target.hasAttribute('data-cmd')) {
                var cmd = e.target.getAttribute('data-cmd');

                if (cmd === "heading") {
                    this.emit('richTextWrap', 'h1')
                } else if (cmd === "justifyRight") {
                    this.emit('richTextStyle', 'text-align:right')
                } else if (cmd === "justifyLeft") {
                    this.emit('richTextStyle', 'text-align:left')

                } else if (cmd === "justifyCenter") {
                    this.emit('richTextStyle', 'text-align:center')

                } else if (cmd === "Bold") {

                    this.emit('richTextWrap', 'b')
                } else if (cmd === "italic") {

                    this.emit('richTextWrap', 'i')
                } else if (cmd === "underline") {

                    this.emit('richTextWrap', 'u')
                } else if (cmd === "insertUnorderedList") {

                    this.emit('richTextWrap', 'li')
                } else if (cmd === "insertOrderedList") {
                    this.emit('richTextWrap', 'ol')

                } else if (cmd === "createLink") {
                    this.emit('richTextWrap', 'a')

                } else if (cmd === "showCode") {
                    //TODO
                } else if (cmd === "undo") {
                    //    TODO
                } else if (cmd === "redo") {
                    //TODO
                }else if(cmd==="save"){
                    var key=document.getElementById('save-file-name').value.toString(),
                        value=document.getElementById('editor').innerText
                    this.emit('save',{key,value})
                }

            }
        }
        if (e.type === "contextmenu") {
            e.preventDefault();

        } else if (e.type === "input") {
            console.log(e.target)
            this.emit('updateEditor', e.target.innerText)
            console.log(e.target.innerText)
        }
        if (e.type==="keyup"){
            if (e.path[0].id==="editor" && e.keyCode===13 ){
                e.preventDefault()
                this.emit("insertTag","br")
            }
            if (e.keyCode===9){
                console.log("yp")
                e.preventDefault()
                this.emit('autoComplete')
            }

        }

    }


}
