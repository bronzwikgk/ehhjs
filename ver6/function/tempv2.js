
var actionRequest = {
    'entityObjectModel': 'document',
    'methodName': 'getElementById',
    'entity': 'actionStory1'
}

var classtoCall = document;
var method2Call = "getElementById";
var entity2Call = "actionStory1";


const exeReq = function (req) {
    //this = actionRequest.entityObjectModel;
  //  window[actionRequest.entityObjectModel];
    var requestbuild = "return " + req.entityObjectModel + "." + req.methodName + "(" + actionRequest.entity + ")";
    console.log(requestbuild);
    var response = new Function( requestbuild);
    var output = response();

 //   var response = this[actionRequest.methodName](actionRequest.entity);
    console.log(output);
}
exeReq(actionRequest);

var classtoCall = document;
var method2Call = "getElementById";
var entity2Call = "actionStory1";
var codeToExecute = "return document.getElementById('actionStory1')";
var tmpFunc = new Function(codeToExecute);
var t = tmpFunc();
console.log(t)


function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

console.log(executeFunctionByName(method2Call,classtoCall,entity2Call))