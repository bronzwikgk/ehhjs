var hashActionReqForURIBuild;
//It replaces the current ActionStory from Dom blank || template.
var newActionStoryReq = {
    name: 'newActionStory',
    objectModel: 'actionSpaceViewInstance',
    method: 'load',
    argument: ['sampleActionStory', 'activeActionStory'],
}


var loadObject2Dom = {
    name: 'loadObject2Dom',
    objectModel: 'actionSpaceViewInstance',
    method: 'load',
    arguments: [`StorageHelper[get]('e.target.id')`, `document.getElementbyId('')`],
    callBack: {
        objectModel: 'StorageHelper',
        method: 'set',
        arguments:['input','input']
    }
}
/**
 * List of request required
 * get an element from dom, get Mulitple with andThen and callbacks,
 * set a property of a element in dom or multiple with andThen and callback
 * append an element or multiple from dom
 * copy2  a model that copies key's and values from one object to another
 *    copy2 a element to json
 *    copy2 a file to json
 *    copy2 a folder to json
 * make a httpService call to an external service.
 * make a seqFlow req  || get object >> store in database >> update View
 * make a asyncSeqFlow req SignUp \\ Login \\ gAuth
 * 
 */

var entityModelV2 = {
    'name': {
        value: 'input.nameTagName',
        'process': [
            {
                'objectModel': 'operate',
                'method': 'isInsideArray',
                'arguments': 'HTMLElementList'
            }
        ]
    },
    // description : "",
    'id': {
        value: 'input.id',
        'operator': [
            {
                'method': 'isInsideArray',
                'arguments': 'HTMLElementList'
            }
        ]
    },
    'entityType': {
        value: 'operate.is(input)',
        'operator': [
            {
                'method': 'isOptional',
                'arguments': 'value',
            }
        ]
    },
    resource: {
        value: 'input.url',
        operate: ['isUrl'],
    },
    attributes: {
        value: null,
        operate: [find('input.attributes', ['class', 'style', 'src'])],
    },
    content: '',
    'contentMimeType': '',//[HTML,JSON,TEXT,JAVASCRIPT],
    resourceBinding: ''
}

var entityModel4Html = {
    tagName: "tagName",
    attributes: { 'class': "class.value", 'style': "style.value", 'src': "" },
    children: ['all'],
}



var copy2 = {
    reqName: 'copy2',
    objectModel: 'processV6',
    method: 'iterate',
    arguments: [
        { 'previous': 'response' },
        entityModel4Html,
        {
            params: {
                maxDepth: 5,
                maxChildren: 120,
                response: {},// option to choose what kind of response do we want. isOneOf([",{},[],an HTML element,"andSelf means return the output"])
                callback: 'setEntityReq',
            }
        }
    ],

}


/**
 * The RequestObj object.
 * @typedef {Object} RequestObj
 * @property {string} [reqName] - requset name.
 * @property {string} [index] - requset index.
 * @property {Object} objectModel -namespace.
 * @property {string} method - request method available on name space.
 * @property {Array.<String>} arguments - arguments to be passed into the method.
 * @property {Operate.isOneOf[object,Array,String]} response -this is where the output will be stored during runtime or till in buffer arguments to be passed into the method.
 * @property {RequestObj} [andThen] - nested request object which isn't a callback.
 * @property {string} [callBack] - call back for single requests.
 */

/**
 * The flow Request Object
 * @typedef {Object} FlowRequest
 * @property {Array.<RequestObj>} flowRequest - Array of requests
 */



//
var reqOutputModel = {
    entityName: 'entityName',
    entityId: 'entityId',
    depth: '1',
    parent: "parent",
    entityAttributes: {
        key: ['selected Array of Keys ', "or an condition"],
        value: ['all of selected type of Values', "or an condiotn"]
    }
}


/**
* @type RequestObj
*/
var domGetReq = {
    reqName: "getElementandCopy2",
    objectModel: 'document',
    method: "getElementById",
    argument: ["actionSpaceLayoutContainer"],
    callBack: "convertToJSON",
};
//console.log(domGetReq);
//document.getElementByID("nestedP")["attributes"]["style"]["nodeValue"]
var getInnerHtml= {
    objectModel: 'document',
    method: "getElementById",
    argument: ["actionSpaceBody"],
    andThen: ['innerHTML'],
    response:{},
}
var getKey = {
    objectModel: 'document',
    method: "getElementById",
    argument: ["actionSpaceBody"],
    andThen: ['attributes','style'],
    response: {},
}

var walkReqModel = {
    name: 'walk',
    objectModel: 'Entity',
    method: 'walk',
    argument: ['input'],
    params: {
        response: {},// If present the response is stored here. If an object returned as an object, if an array return as an array.
        recurse:'true',
        maxDepth: 5,
        maxItem: 10,
    }
}

/**
* @type RequestObj
*/
var convertToJSON = {
    objectModel: 'DOMConversion',
    method: "toJSON",
    arguments: ["fromPrevious", entityModel4Html],
}

var set2IndexDb = {
    objectModel: 'indexDb',
    method: 'set',
    arguments: ['key', 'value'],
    andThen:'updateView',
}

var openFolderReqModel = {
    objectModel: 'processFSInstance',
    method: 'OpenDirectoryV2',
    argument: ['event'],
    response: {},
  //  andThen: '',
    callback: 'set2IndexDb',// call back to recive update in storage.
}
var openFileReqModel = {
    objectModel: 'processFSInstance',
    method: 'OpenFileV2',
    argument: ['event'],
   // andThen: '',
    callback: 'set2IndexDb',// call back to recive update in storage.
}

var updateDomObject = {
    reqName: 'updateDomObject',//CommanName
    objectModel: document,
    method: 'getElementById',
    argument: ['output'],
    response: [],
    andThen: ['setAttributesReq'],

}
var eachKeyReqModelV1 = {
    name: 'eachKey',
    objectModel: 'ActionEngine',
    method: 'eachKey',
    argument: ['input'],
    params: {
        response: {
            value:''
        },
        maxDepth: 5,
        maxItem: 10,

    }

}
var getObjectVer2 = {
    reqName: 'getElement',//CommanName
    objectModel: document,
    method: 'getElementById',
    arguments: ['navigationSection'],
    response: [],
    // andThen: ['savetoStorageReq']
}
var entityModelV2 = {
    'name': {
        value: 'input.nameTagName',
        'process': [
            {
                'objectModel': 'operate',
                'method': 'isInsideArray',
                'arguments': 'HTMLElementList'
            }
        ]
    },
    // description : "",
    'id': {
        value: 'input.id',
        'operator': [
            {
                'method': 'isInsideArray',
                'arguments': 'HTMLElementList'
            }
        ]
    },
    'entityType': {
        value: 'operate.is(input)',
        'operator': [
            {
                'method': 'isOptional',
                'arguments': 'value',
            }
        ]
    },
    resource: {
        value: 'input.url',
        operate: ['isUrl'],
    },
    attributes: {
        value: null,
        operate: [find('input.attributes', ['class', 'style', 'src'])],
    },
    content: '',
    'contentMimeType': '',//[HTML,JSON,TEXT,JAVASCRIPT],
    resourceBinding: ''
}

var copy2 = {
    reqName: 'copy2',
    objectModel: 'processV6',
    method: 'iterate',
    arguments: [
        { 'previous': 'response' },
        entityModel4Html,
        {
            params: {
                maxDepth: 5,
                maxChildren: 120,
                response: {},// option to choose what kind of response do we want. isOneOf([",{},[],an HTML element,"andSelf means return the output"])
                callback: 'setEntityReq',
            }
        }
    ],

}
