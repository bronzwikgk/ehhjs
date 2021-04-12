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
   
    handleEvent(e) {
       // console.log("event",e.type,e.target)
        var commandList ={
            keyword:'data-command',
            keyword:'href',
        };
        var methodsInstance = Object.getOwnPropertyNames(actionEventInstance.__proto__);
        var matchedMethod = operate.find(methodsInstance, e.type, 'values', partial);
     //  console.log("matchedMethod",matchedMethod);
        if (matchedMethod.length > 0) {
            actionEventInstance.__proto__[matchedMethod[0]](e); //make the call to the respective function
        }
    }
    onPopState(e) {
        console.log(e.type)
    }  
    onHashChange(e) {
        // e.preventDefault();
      // console.log("event occoured", e.type);
        var actionEngineMethods = Object.getOwnPropertyNames(engine.__proto__);
       //console.log(actionEngineMethods);
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
        var response;
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
     console.log("Clicked >>   " + e.type, e.target);
       
   //e.preventDefault();
        if (e.target.hasAttribute('data-command')) {
            response = JSON.parse(e.target.getAttribute('data-command'));
      //    console.log(response);
            this.handleInput(e, response);
        }
        if (e.target.parentElement.hasAttribute('data-command')) {
            
            response = JSON.parse(e.target.parentElement.getAttribute('data-command'));
            
    //      console.log(response[0]);
            this.handleInput(e, response);
            
        }
      

 return;
    }

    handleInput(e, entity) {
    //    console.log('response', e, entity);

        var req = {
            objectModel: 'engine',
            method: entity[0]['command'],
            arguments: window[entity[0]['req']]
        }
        var buffer = [];
        for (var key in entity[0]['arguments']) {

          console.log(entity[0]['arguments'][key],);

            //buffer.push(window['workSpaceBody'])
            
}
       // console.log(req['method'],req['arguments']['arguments'],entity[0]['arguments'], buffer)

    }
    conductRoute(hash) {
        //console.log("conducting route", hash)
        var reqModel = hash.split(":")[1].split("[")[0];
        var argumentsTemp = hash.split(":")[1].split("[")[0];

       // console.log("herer ",hash);
        var currentRoute = window.location.pathname;
        var url = currentRoute + "#"+HttpService.buildEncodedUri(window[reqModel]);
       
        console.log(url);
      //  window.location.href = currentRoute + uri
        window.history.pushState("objec", "[everyThing Happens here]", url);
        window.dispatchEvent(new Event('popstate'));
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



