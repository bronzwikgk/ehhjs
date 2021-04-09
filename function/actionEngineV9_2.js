

class ActionEngine {
    constructor() {
        this._flowResultState = {};
        this._request = [];// has to be synced with Local Storage or indexDb 
        this._request['StorageLimit'] = 20; // This denotates how many request will we save in buffer.
    }
     doSomething(n, callback) {
         setTimeout(function () { callback(null, true); }, n);
     }
    get(key,parent) {
       // console.log("for Initaition", key, objectModel, objectModel[key])
        if (parent[key]) {
           // console.log("for Initaition", key, objectModel, objectModel[key])
            var response = parent[key];
           // console.log("Initaites found",response)
            return response;
        }


    }
    executeSynReq(req, result) {
      //  console.log("execute req", req)
        //testing if the req is an object
        if (operate.isObject(req) != true) {
            return console.error("Need a JSON, Please refer to the documentation", "Does this >", req, "look like JSON to you. It's damn", operate.is(req));
        }
      //  console.log("objectModel", req.objectModel, window['ActionView']);
        var objectModel = this.get(req.objectModel, window);//Getting the object Model from window Object
       // console.log("objectModel", objectModel);
        if (result) {//Used for either callback cases, where 
            var argument = result;
        } else {
            var argument = req.argument;
        }
                //Build Arguments
        for (var i = 0; i < argument.length; i++) {
          //  console.log(argument[i]);
            argument[i] = this.get(argument[i], window);
          //  console.log(argument[i]);

        }

       
        if (req['andThen']) {
            var andThenLength = req['andThen'].length;
            if (andThenLength > 0) {
                console.log(andThenLength);
                switch (andThenLength) {
                    case 1:
                        var response = objectModel[req.method](argument)[req['andThen']?.[0]];
                        console.log("response ", response);
                        //  console.log("click", event.type, event.target)
                        break;
                    case 2:
                        var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1]];
                        console.log("response ", response);
                        //  console.log("click", event.type, event.target)
                        break;
                    case 3:
                        var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1], req['andThen']?.[2]];
                        console.log("response ", response);
                        //  console.log("click", event.type, event.target)
                        break;
                    case 4:
                        var response = objectModel[req.method](argument)[req['andThen']?.[0], req['andThen']?.[1], req['andThen']?.[2], req['andThen']?.[3]];
                        console.log("response ", response);
                        //  console.log("click", event.type, event.target)
                        break;
                    default:
                    // console.log("I don't know such values",event.type);
                }
            }
        } else {
         console.log(objectModel,req.method,argument)
            var response = objectModel[req.method](argument);
       //     console.log("response ", response);
        }
        req[response] = response;
        if (req['callBack']) {
       //     console.log("callback found")
            var callBack = window[req['callBack']];
            var response = this.reqProcessor(callBack, req[response]);
        }
      //  console.log(response)
        return response;
    }
    //Executes an array of conditions of a values and returns true if all are true.Used for more than one validation with &&
    validateAllTrue(value, rules) {
        var self = this;
        return rules.every(function (rule) {
            return self[rule](value);
        });
    };
    validateSomeTrue(value, rules) {
        var self = this;
        return rules.some(function (rule) {
            return self[rule](value);
        });
    };

    validate (value, key,params) {
        if (this.validateAllTrue(value, key.validator)) {
            if (params['onTrue'] === 'true') {
                //doThis
                return true;
            } 
           // key.value = value;
            
        }
        else if (params['onFalse'] === 'false'){
            //do This
            return false;
        }
        
    };
   
    /**
     * This method, walks through all the key's of an javascript object.
     * Be it a string || object ||array || Object, 
     *
     * 
     * @param {*} req.Input input argument if no options it just initiates it by finding it in default ObjectModel of actionSpaceInstance. 
     * In Development window is treated as the default object.
     * @param {*} req.params: optional parameters for when visiting each key
     * @param {*} req.params
     * 
     */
    eachKey(req) {
      //  if (!req['currentDepth']) { req['currentDepth'] = 0;console.log("it's a fresh start")}     
        if (typeof req === 'object'){
            for (var key in req) {
              //  req['currentDepth'] = req['currentDepth'] + 1; // add a break || continue condition to exit if more than max Depth
                if (req.hasOwnProperty(key)) {

                    var buffer = this.get(req[key], window);
                    if (operate.isUseless(buffer) === false) {
                       // console.log("iam Here raw", key, req[key]);
                        req[key] = buffer;
                        console.log("iam Here Intiated", key, req[key]);
                    }
                    
                    if (operate.isString(req[key])) {
                  //  console.log("found string",key,req[key]) 
                     }
                    else if (operate.isObject(req[key])) {
                      //  console.log("found Object", key, req[key])
                     }
                    else if (operate.isArray(req[key])) {
                      //  console.log("found Array", key, req[key])
                     }
                }
                   //f(m,loc,expr,val,path);
             }
        }
       // console.log(req);
        return req;
    }
    static promisifyRequest(request) {
        return new Promise((resolve, reject) => {
            // @ts-ignore - file size hacks
            request.oncomplete = request.onsuccess = () => resolve(request.result);
            // @ts-ignore - file size hacks
            request.onabort = request.onerror = () => reject(request.error);
        });
    }
}

var engine = new ActionEngine();
//console.log(domGetReq);
