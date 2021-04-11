var partial = true;
//console.log("app", app)
class ActionEvent {
    constructor(entity, activeListerners) {
     //   console.log(entity, activeListerners);
       this._activeEntity = [],
       this._activeListners = [];
       this._events = {};
        this.createListeners(entity, activeListerners);
        this._objectModels = [];
        //console.log(this);
       }
    createListeners(entity,activeListerners) {
    // console.log([arguments])
        this._activeEntity.push(window[entity]);
        var objectModel=window[entity];
     //   console.log(objectModel,activeListerners);
        Object.keys(activeListerners).forEach((key) => {
            this._activeListners.push(key);
            objectModel[key] = this.handleEvent // Need to use Emit instead of a direct call //Also Binding
        })
    }
    addListener(eventName, fn) {
    console.log("add listner",eventName, fn);
        this._events[eventName] = this._events[eventName] || [];
        this._events[eventName].push(fn);
     //   console.log(this._events);
        return this;
    }
    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }
    emit(eventName, ...args) {
        console.log('I was called');
        let fns = this._events[eventName];
        //  console.log("Emitted",eventName)
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }
    registerObjectModels(objectModel) {
        this._objectModels.push(objectModel);
    }
    handleEvent(e) {
        console.log("event",e.type)
    //    console.log("this._activeEntity", Object.getOwnPropertyNames(actionEventInstance.__proto__));
        var methodsInstance = Object.getOwnPropertyNames(actionEventInstance.__proto__);
       
      //  var registerdEvents = operate.findMatchingInArrayOfObject(EventCommandMapReq, 'keyword', e.type, 'values',);
       // console.log(registerdEvents)
     
       // console.log(methodsInstance.includes('onClick'), e.type );
        var matchedMethod = operate.find(methodsInstance, e.type, 'values', partial);
      //  console.log(matchedMethod);
        if (matchedMethod.length > 0) {
            actionEventInstance.__proto__[matchedMethod[0]](e); //make the call to the respective function
        }

    }
    onPopState(e) {
        console.log(e.type)
    }
    
   
    onHashChange(e) {
         e.preventDefault();
       // console.log("event occoured", e.type);
        var actionEngineMethods = Object.getOwnPropertyNames(engine.__proto__);
      //  console.log(actionEngineMethods);

        if (window.location.hash) {
          console.log()
        }
        var hashCommand = window.location.hash.split(":")[0];

        var matchedMethod = operate.find(actionEngineMethods, hashCommand.substring(1), 'values', partial);
  
        if (matchedMethod.length > 0) {
            console.log(hashCommand, "matchedMethod", matchedMethod);
            engine[matchedMethod[0]](document.location.hash); //make the call to the respective function
        }


    }

    onClick(e) {
       
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
    //  console.log("Clicked    " + e.target.parentElement);
        e.preventDefault();

        if (e.target.hasAttribute('href')) {
                  //   console.log("link found", href)
                var href = e.target.getAttribute('href');
                e.target.setAttribute('state', 'currentState = clicked');
                this.conductRoute(href);

            } else if (e.target.parentElement.hasAttribute('href')) {
                  //   console.log("link found", href)
                var href = e.target.parentElement.getAttribute('href');
                e.target.parentElement.setAttribute('state', 'currentState = clicked');
                this.conductRoute(href);
            }
       
       
       
        //   e.preDefault();
        if (e.target.hasAttribute("data-command")) {

            var dataCommand = e.target.getAttribute('data-command');
            //          console.log(dataCommandT);
            var commandJson = JSON.parse(dataCommand);
            console.log("Command " + commandJson[0].command);
            switch (commandJson[0].command) {

                case 'modal':
                    ActionView.modalForm(e, commandJson[0].entity); break;
                case 'closeModal':
                    ActionView.closeModal(e); break;
                case 'NewItem':
                    this.NewItem(e); break;
                case 'RemoveItem':
                    this.RemoveItem(e); break;
                case 'SubmitInvoice':
                    this.SubmitInvoice(e); break;
                case 'importFromSheet':
                    this.importFromSheet(e); break;
                case 'exportToSheet':
                    this.exportToSheet(e); break;
                //signup,login
                case 'Signup':
                    this.SignUp(e); break;
                case 'Login':
                    this.LogIn(e); break;
                case "new":
                    console.log("new")
                    this.new1(e); break;
                case 'google':
                    Authorization.oAuth(e, 'json'); break;
                //sheet

                //File System
                case 'FSOpenDirectory':
                    processFS.OpenDirectory(e); break;
                case 'FSNew':
                    processFS.NewFile(e); break;
                case 'FSOpen':
                    processFS.readFile(e); break;
                case 'FS_Save':
                    processFS.saveFile(e); break;
                case 'FS_SaveAs':
                    processFS.saveAsFile(e); break;
                // case 'file':
                //     this.file(e);break;
                // case 'caret':
                //     this.caret(e);break;
                // local storage

                case 'save':
                    this.save(e); break;
                case 'cloud':
                    this.load(e); break;
                case 'download':
                    this.download(e); break;
                case 'delete':
                    this.delete(e); break;
                case 'logout':
                    this.logout(e); break;
                case 'keyup':
                    this.onKeyUp(e); break;
                case 'mouseover':
                    this.onMouseOver(e); break;
                case 'storage':
                    console.log("storage", e.type, e.target)
                    console.log(Object.keys(actionStorageInstance.entity))
                    break;
                default:
                // console.log("I don't know such values",e.type);
            }
        }
        if (e.target.classList.contains('editable')) {
            // console.log("clickedOn", entity.target.id, entity.target.classList.contains('editable')) // TO check if it's content
            e.target.setAttribute('contentEditable', 'true');
            //entity.target.setAttribute('State', "contentEditable");
        }
        if (e.target.classList.contains('parent')) {
            console.log("yo")
            e.target.parentElement.querySelector(".nested").classList.toggle("active");
            e.target.classList.toggle("parent-down");
        }
        if (e.target.id == 'MainHeaderHamburger1') {
            document.getElementById('navigationSection').classList.toggle('hide')
            document.getElementById('navigationSection').classList.toggle('active')
        }
 return;
    }
    conductRoute(hash) {
        console.log("conducting route", hash)
        var reqModel = hash.split(":")[1].split("[")[0];
        var argumentsTemp = hash.split(":")[1].split("[")[0];
        var currentRoute = window.location.href;
        var url = currentRoute + HttpService.buildEncodedUri(window[reqModel]);
       
        console.log(url);
      //  window.location.href = currentRoute + uri
        window.history.pushState("objec", "[everyThing Happens here]", url);
      //  window.location.assign(currentRoute + uri);
       // e.preventDefault()
    }
    
    

}

//https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p
//https://willtaylor.blog/client-side-routing-in-vanilla-js/

function gotoService(service) {
    window.location.href = service;
}

function onLocationChange(e) {

    ///  console.log("detetced location Change", document.location);
    if (document.location.hash) {
        //console.log("it's a hash Change", document.location.hash.substring(1));
        response = document.location.hash.substring(1);
    } else if (document.location.search) {
        //console.log("it's a search Change", document.location.search.substring(1));
        response = document.location.search.substring(1);
    } else {
        console.log("no idea");
    }
    //console.log(response);
    if (response) {
        var route = unbuildEndodedUri(response);
        conductRoute(route);
    }

    //console.log("token",route);


}



