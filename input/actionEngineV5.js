//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

//An eg  usage of BuildActionRequest || ProcessStringRequest || executeSyncnActionStep
//var buildParams;
//This is a sample obj to be used to build a String Process Req.
var buildActionRequest = {
    buildArguments: { //Inside Entity defineing the request to build. 
        entityObjectModel: 'document',
        request: {
            method: 'get',
            entity: 'Element',
            entityIdentifier: 'ById',
            entityId: "(" + '"' + reqEntity.entityId + '"' + ")",
        },
      //  and: 'innerHTML',
    },
    'buildParams': { // defining the parameters of recusiosn and output
        'recurse': true,// this is to check if arguments have to be recursed or not.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'callback',// [isOneof ( response, callback//operator) ]
            callBackReq : {
                callbackClass: 'actionEngineV5Instance',
                callback: 'processStringRequest',
                args: "cleanReq",
                andThen: 'innerHTML',
         //      test: buildActionRequest.buildParams.recurse
            }
        }


    }
}

var requestBody = {
    resourceID: '1LIFMxfGptICuOEoPZAd-IrKLy1dhN3s9Fem4SDweSJk',
    entityName: 'signUpFromSchemaModel',
    
}

var httpGetReqObject = {
    method: 'GET',
    mode: 'no-cors',
    body: requestBody,
}
var httpPostReqObject = {
    method: 'POST', // or 'PUT'
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
    // cache: 'no-cache',
  //  body: requestBody,
}

var actionStepGetRequest = {
    class: httpServiceV2,
    method: 'serverNodeReqSwitcher',
    arguments: [serviceUrl, httpGetReqObject],
    'stepParams': { // defining the parameters of recusiosn and output
        'Every1': false,// this is to check if Need to apply same method on all the argument individually.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'callback',// [isOneof ( response, callback//operator) ]
            callBackReq: {
                callbackClass: document,
                callback: 'getElementById',
                args: "output",
                andThen: 'innerHTML',
                andThenArgs: ['innerHTML'],
                //      test: buildActionRequest.buildParams.recurse
            }
        }


    }
}

var actionStepPostRequest = {
    class: httpServiceV2,
    method: 'serverNodeReqSwitcher',
    arguments: [serviceUrl, httpPostReqObject],
    'stepParams': { // defining the parameters of recusiosn and output
        'Every1': false,// this is to check if Need to apply same method on all the argument individually.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'callback',// [isOneof ( response, callback//operator) ]
            callBackReq: {
                callbackClass: document,
                callback: 'getElementById',
                args: "output",
                andThen: 'innerHTML',
                andThenArgs: ['innerHTML'],
                //      test: buildActionRequest.buildParams.recurse
            }
        }


    }
}

var callBackReqModel = {
    callbackClass: 'document',
    callback: 'getElementById',
    args: "action",
    andThen: 'innerHTML'
}




var nestedReq = [
    {
        index: 1,
        entity: (action),
        method: 'innerHTML',
    },
]

var getSignUpFormReq = {
    class: httpServiceV2,
    method: 'serverNodeReqSwitcher',
    arguments: [serviceUrl, httpGetReqObject],
    'stepParams': { // defining the parameters of recusiosn and output
        'Every1': false,// this is to check if Need to apply same method on all the argument individually.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'response',// [isOneof ( response, callback//operator) ]
        }


    }
}
var getElementByIdReq = {
    class: document,
    method: 'getElementById',
    arguments: 'action',
    'stepParams': { // defining the parameters of recusiosn and output
        'Every1': false,// this is to check if Need to apply same method on all the argument individually.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'response',// [isOneof ( response, callback//operator) ]
        }


    }
}
var obj2Req = {
    class: process,
    //command: process,
    method: 'processReq',
    arguments: ['fromPrevious',{}],
    'stepParams': { // defining the parameters of recusiosn and output
        'Every1': false,// this is to check if Need to apply same method on all the argument individually.
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'response',// [isOneof ( response, callback//operator) ]
        }


    }
}

var actionFlowModelReq = {
    flowRequest: [
        {
            actionStepName: 'Generic', //Name Identifier is used for maintaining the templates of the Model.
            actionStepIndex: 'index#1',
            actionStepReq: getElementByIdReq,
            response:{},
        },
        {
            actionStepName: 'Generic', //Name Identifier is used for maintaining the templates of the Model.
            actionStepIndex: 'index#2',
            actionStepReq: obj2Req,
        },
        {
            actionStepName: 'Generic', //Name Identifier is used for maintaining the templates of the Model.
            actionStepIndex: 'index#3',
            actionStepReq: 'new Entity',
            actionStepArgs: ['fromPrevious',`document.createElement('div')`],

        },

    ],
    actionFlowParams: {
        flowAction: 'sync',//Can be ASync,
        ifError: 'ignore',//
        runtimeStorage: 'localStorage',
        outPutCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'callback',// [isOneof ( response, callback//operator) ]
            callBackReq: {
                callbackClass: 'actionEngineV5Instance',
                callback: 'processStringRequest',
                args: "cleanReq",
                andThen: 'innerHTML',
                //      test: buildActionRequest.buildParams.recurse
            }
        }
    }
}

//console.log("test",buildActionRequest.buildParams.output.callBackReq.test)
class ActionEngineV5 {
    constructor() {
        
    }
    buildActionRequest(buildReq) {
         console.log("BUildReq",buildReq)
        if (operate.isObject(buildReq) != true) {
            return console.error("Need a JSON, Please refer to the documentation", "Does this >", buildReq, "look like JSON to you. It's damn", operate.is(buildReq));
        } else {
            console.log("building", buildReq);
            var response = [];
            for (var key in buildReq.buildArguments) { //iterating Each key of req
                if (typeof buildReq.buildArguments[key] === "object") {
                    console.log("udi",Object.values(buildReq.buildArguments[key]));
                    response.push(Object.values(buildReq.buildArguments[key]).join(" ").replace(/\s/g, ""))
                } else {
                    response.push(buildReq.buildArguments[key]);
                }
            }

            /**
            * cleanUpStage
            */
            //  console.log(response);
            this.cleanReq = "return " + response.join(".");
            var builtReq = "return " + response.join(".");
            //  console.log(buildReq.buildParams.output.outputType);
            if (buildReq.buildParams.output.outputType === 'callback') {
                var classToCall = buildReq.buildParams.output.callBackReq.callbackClass;
                var methodtoCall = buildReq.buildParams.output.callBackReq.callback;
                var andThen = buildReq.buildParams.output.callBackReq.andThen;
                var paraArg = buildReq.buildParams.output.callBackReq.args
                var args = this[paraArg];
                console.log(args)
                var callbackResponse = this.executeSyncnActionStep(classToCall, methodtoCall, args, andThen);
                
                return callbackResponse;
            } else {
                console.log('builtReq', builtReq);
                return builtReq;
            }
            
        }

    }
    processStringRequest(request) {
        console.log("request",request)
        if (operate.isString(request) != true) {
            return console.error("not my job")//To be routed through BuildActionReq
        } else {
            //var exeCommand = this.buildActionRequest(reqObject);
            console.log("executing command", request)
            //  var codeToExecute = "return document.getElementById('action').innerHTML";
            var response = new Function(request)();
            console.log("Processed String request", response);
            return response;
        }
         
    }
    //SetTimeOut(Now) optional attribute to be added to this method, which allows to conduct this callback Immidietly in the que.
    executeSyncActionStep(actionStep, andThen) {
        console.log(actionStep)
        var response;
        if (actionStep.command) {
            console.log(actionStep, "found command", actionStep.command, actionStep.arguments[0], actionStep.arguments[1]);
            window[actionStep.command];
            console.log(actionStep.command)

        } else {
            //var response = callbackClass[callback](args[0]);
      
            if (operate.isString(actionStep.arguments)) {
                var response = actionStep.class[actionStep.method](actionStep.arguments)//need to get this argument thing working
            } else  {
                console.log("Object found", actionStep)
                var response = actionStep.class[actionStep.method](actionStep.arguments[0], actionStep.arguments[1])//need to get this argument thing working
                  console.log(response)

            }

            
        }
        
      console.log("executeSyncActionStep response",response);
         return response;
    }
    executeAsyncActionStep(actionStep) {
    //    console.log(JSON.parse(actionStep.arguments[1]))
        var promise1 = actionStep.class[actionStep.method](actionStep.arguments[0],actionStep.arguments[1])
            .then(response => {
                if (!response.ok) { throw new Error("Could not reach website."); }
                return response.text();
            })
            .then(data => {
                if (actionStep.stepParams) {
                  //  console.log(actionStep.stepParams);
                  //  console.log("Data", data);
                    var callbackClass = actionStep.stepParams.output.callBackReq.callbackClass;
                    var callback = actionStep.stepParams.output.callBackReq.callback;
                    var args = actionStep.stepParams.output.callBackReq.args;
                    var andThen = actionStep.stepParams.output.callBackReq.andThen;
                    var andThenArgs = actionStep.stepParams.output.callBackReq.andThenArgs;
                    andThenArgs.push(data);
                    var response = this.executeSyncActionStep(callbackClass, callback, [args],andThen,andThenArgs)
                //    console.log("Data",  response);
                    this.handleResponse(data);
                }
                
            })
            .catch(err => console.error(err))    
    }
    // response.text() – read the response and return as text,
    //response.json() – parse the response as JSON,
    //response.formData() – return the response as FormData object(explained in the next chapter),
    //response.blob() – return the response as Blob (binary data with type),
    //response.arrayBuffer()

    handleResponse(response) {

        console.log(response.length, operate.is(response));
        var responseJSON = JSON.parse(response);
        console.log("responseJson",responseJSON);
        var outputJson = mutate.arr2Object(responseJSON, responseJSON[0], {});
        console.log("Output :- Array To Object");
        console.log(outputJson);
        var output = new Entity(outputJson, document.createElement('div'));
        document.getElementById('output').appendChild(output.entity);
        var tempo = mutate.Obj2(output.entity, []);
        console.log(tempo);
          // 
          //  var responseUnbuild = httpServiceV2.unbuildEndodedUri(response);
            // 
        for (var key in (responseJSON)) {
            
         //   console.log(key, responseJSON[key], operate.is(responseJSON[key]))
        }

    }
    //This acts like a router to all the registered methods in ActionEngine.
    //It also maintains a buffer for status(for retry's/timeouts/sotrage in case or error) and a buffer [this.output], for dependentarguments 
    runSyncActionFlow(actionFlowReq) {
        var bufferResponse = [];

      //  console.log(actionFlowReq.flowRequest)

        for (var key in actionFlowReq.flowRequest) {
            var i = 0; i = i + 1; var step = {};
            step['runningIndex'] = i;
            step['actionStepName'] = actionFlowReq.flowRequest[key].actionStepName;
            step['thisStepReqMethod'] = actionFlowReq.flowRequest[key].actionStepReq;
            step['thisStepReq'] = actionFlowReq.flowRequest[key];
           // console.log(">>>>", step['thisStepReq'].actionStepReq.arguments)

            if (step['thisStepReq'].actionStepReq.arguments.includes('fromPrevious')) {

               
              //  console.log("yo",step['thisStepReq'].actionStepReq.arguments[step['thisStepReq'].actionStepReq.arguments.indexOf('fromPrevious')])
                step['thisStepReq'].actionStepReq.arguments[step['thisStepReq'].actionStepReq.arguments.indexOf('fromPrevious')] = bufferResponse[i - 1].response;
             //   console.log(step['thisStepReqMethod'])
                //step['thisStepReq'].actionStepArgs;
              //  console.log(step['thisStepReq'].actionStepArgs,"<<<<" )

                
            }
            
            console.log(step['thisStepReqMethod'])
            var response = this.executeSyncActionStep(step['thisStepReqMethod']);
            
        //    console.log('runSyncActionFlow', response);
            step['response'] = response;
            bufferResponse.push(step);
          //  console.log("bufferResponse", bufferResponse[0].response);
            
        }
    }
    
    runAsyncActionFlow(actionFlow) {
        

        // for await (var key of actionFlow) {

        // }
    }
        //Returns True only if all are trues, else breaks
    validateAll(a, b, callbacks) {
        return callbacks.every(function (callback) { return operate[callback](a, b); });
       
    }
    validateSome() {
        return callbacks.some(function (callback) { return operate[callback](a, b); });
    }
   
}

var processReqModel = {
    processClass: 'processV3',
    processMethod: 'get',//[create,get,set,append,update,delete,replace,]

    processArguments: { //Inside Entity defineing the request to build. 
        processClass: 'processV3',
        processMethod: 'get',//[create,get,set,append,update,delete,replace,]
        
        request: {
            method: 'get',
            entity: 'Element',
            entityIdentifier: 'ById',
            entityId: "(" + '"' + reqEntity.entityId + '"' + ")",
        },
        //  and: 'innerHTML',
    },
    'processParams': { // defining the parameters of recusiosn and output
        'recurse': true,// this is to check if arguments have to be recursed or not.
        outputCondition: null,//an operator can be added,if True, if False
        output: {
            outputType: 'response',// [isOneof ( response, callback//operator) ]
           outputDummy:'' //[ an live Object,HTMLElement,An Array,An String ]
        }


    }
}

//this Object is istended to work as a req for any kind of process related with any kind of entity.
var reqOutputModel = {
    entityName: 'entityName',
    entityId: 'entityId',
    depth: '1',
    parent:"parent",
    entityAttributes: {
        key: ['selected Array of Keys ', "or an condition"],
        value:[ 'all of selected type of Values', "or an condiotn"]
    }
}
var processReqModelV2 = {
    processName:'ObjeMutate',
    processClass: 'processV3',
    processMethod: 'create',
    methodArgument: ['input',],
    processParams: {
        recurse: true,
        output: {
            outputType: 'response',// [isOneof ( response, callback//operator) ]
            outputDummy: ''
        }

    },    
    andThen: ''
}
class processV3{
    static processReq(input, output, key, value) {
        //   console.log(input, output)
        if (typeof input === 'object') {
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'Array') {
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'String') {
            console.log('String >>>', key, value);
            //Entity.set(input,this.output,key,value);           
        }
        return buffer;
    }
    static iterateObj(input, output) {
        for (var key in input) {
          

        }
        // console.log('Iterate Objoutput',output)
        return output;
    }
    static iterateArr(input, output, key, value, callback, callbackClass) {
        //  console.log("Iterating Array", input, output, key, value);

        for (var i = 0; i < input.length; i++) {
       
        }
        // console.log("iterator Array response", response);
        return response;
    }
}


var exportJson4mHtmlFlow = [
    {
        step: 1, method: document.getElementById('action'),
        stepParams: {
            
        }
    },

]



var actionEngineV5Instance = new ActionEngineV5();
var response = actionEngineV5Instance.runSyncActionFlow(actionFlowModelReq);

// var response2 = new Entity(nestedReq, document.createElement('div'));


// console.log(response2.entity)
