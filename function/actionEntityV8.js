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

class Entity {
    constructor(input, output) {
    //    console.log("entity", input, output)
        this.input = input;
        this.output = output;
        this.entity = process.processReq(input, output);
    }
    static create(input, output, key, value) {
        //  console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            if (operate.isInt(parseInt(key))) {
               // console.log("check me")
                var response = document.createElement('option');
            }
            else {
                // console.log(operate.is())
                var response = document.createElement(key);
            }

            // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            //   console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (!response) console.log("no response", output);
        return response;
    }
    static append(input, output, key, value) {
        // console.log('appending', input,output)

        if (operate.is(output).includes("HTML")) { //Only HTML creation
            var response = output.appendChild(input);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output[key] = input;
            var response = output;
            //var response = document.createElement(key);

        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output.push(input);
            var response = output;
            //var response = document.createElement(key);

        }



        // console.log('appended',response)
        return response;
    }
    static set(input, output, key, value) {
        //  console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation

            if (operate.isInsideArray(key, htmlAttributesListV2)) {


                output.setAttribute(key, value)
                if (key == "innerText") {
                    console.log("setting", key, value, "in", output)
                }
            } else {
                // console.log("set", key, value, "in", output)

                //var buffer = output;
                output[key] = input[key];
                //buffer=output;
            }

        }
        return output;
    }
    /**
     * 
     */
    static insert(str, index, value) {
        var response = str.substr(0, index) + value + str.substr(index);
        //  console.log("inserted",response)
        return response;
    } 
}

console.log("I am loaded > entity",)
