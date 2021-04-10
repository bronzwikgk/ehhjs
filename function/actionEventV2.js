
//console.log("app", app)
class ActionEvent {
    constructor(entity,activeListerners) {
       this._activeEntity = [],
       this._activeListners = [];
       this._events = {};
         this.createListeners(entity,activeListerners);
       }

    createListeners(entity,activeListerners) {
    // console.log([arguments])
        this._activeEntity.push(window[entity]);
        var objectModel=window[entity];
      //  console.log(objectModel);
        Object.keys(activeListerners).forEach((key) => {
            //this._activeListners.push(key);
            objectModel[key] = this.handleEvent // Need to use Emit instead of a direct call    
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
        console.log("event Happened",e.type,e.target);
          
          switch (e.type) {
              case 'load':
                   // console.log(event.type)
  
                  this.onRouteChange();
                  //  console.log("click", event.type, event.target)
                  break;
              case 'beforeunload':
                 // console.log(event.type)
  
                  this.onRouteChange(e);
                  //  console.log("click", event.type, event.target)
                  break;
              case 'readystatechange':
               //   console.log(event.type)
                  this.onRouteChange(e);
                  //  console.log("click", event.type, event.target)
                  break;
              case 'DOMContentLoaded':
                 // console.log(event.type)
                  this.onRouteChange(e);
                  //  console.log("click", event.type, event.target)
                  break;
              case 'hashchange':
                  this.onRouteChange(e);
                  //  console.log("click", event.type, event.target)
                  break;
              case 'click':
                 
                  this.onClick(event);
                  //  console.log("click", event.type, event.target)
                  break;
              case 'submit':
                  this.onSubmit(event);
              case 'selectstart':
                  //console.log("selectstart", event.type, event.target)
                  break;
              case 'keydown':
                
                  this.onKeyDown(event)
                // console.log("keydown", event.type,event.key, event.target)
                  break;
              case 'keypress':
                  // this.emit('keypress', event)
                  this.onKeyPress(event)
                 // console.log("keypress", event.type,event.key ,event.target)
                  break;
              case 'keyup':
                  this.onKeyUp(event)
                  //  console.log("message", event.type, event.target)
                  break;
              case 'mouseover':
                  this.onMouseOver(event);
                  //console.log("mouseover", event.type, event.target)
                  break;
              case 'mouseenter':
                  this.onMouseEnter(event);
                  //console.log("mouseover", event.type, event.target)
                  break;
              case 'mouseleave':
                  this.onMouseLeave(event);
                  //console.log("mouseover", event.type, event.target)
                  break;
              case 'mouseout':
                  this.onMouseLeave(event);
                  //console.log("mouseover", event.type, event.target)
                  break;
              case 'storage':
                  console.log("storage", event.type, event.target)
                  console.log(Object.keys(actionStorageInstance.entity))
  
                  break;
              default:
              // console.log("I don't know such values",event.type);
          }
          // console.log("handler", event.type, event.target.getAttribute('name'))
          //  window.postMessage()
  
          //filter the registerd events paired with Target
  
      }
      onRouteChange(e) {
        //  console.log("event occoured",e.type);
          var routeKeyword;
          if (document.location.hash) {
             // console.log("it's a hash Change", document.location.hash.substring(1));
              routeKeyword = document.location.hash.substring(1);
          } else if (document.location.search) {
            //  console.log("it's a search Change", document.location.search.substring(1));
              routeKeyword = document.location.search.substring(1);
          } else {
             // console.log("no idea");
          }
  
        //  const hashLocation = window.location.hash.substring(1);
        
          if (routeKeyword) {
             // console.log(hashLocation);
              var routeModel = operate.findMatchingInArrayOfObject(actionSpaceViewModel, 'keyword', routeKeyword, 'values');
             // console.log(routeModel[0].model, this.view._actionView)
              //console.log(routeModel)
              if (routeModel.length !=0) {
                  this.view.replaceChild([routeModel[0].model, this.view._actionView.entity]);
              } else {
                  console.log('no route found');
              }  
          }
      }

}