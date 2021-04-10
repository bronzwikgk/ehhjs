
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

    test(){
        console.log("test",arguments);
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











        
    }

}