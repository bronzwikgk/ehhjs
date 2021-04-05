
class DOMConversion {
  constructor() { }

  static toJSON(input, reqModel, isAttribute = false) {
    const output = {};
    
    for (var [key, value] of input.entries(reqModel)) {

      if (Operate.isinput(value)) {
        // input keys list
        var props = input.keys(value);
        output[key] = {}
        for (var i = 0; i < props.length; i++) {

          if (input[key][props[i]] && input[key][props[i]].nodeValue) {

            output[key][props[i]] = input[key][props[i]] && input[key][props[i]].nodeValue;
            
          } else if (input[key][props[i]] && !input[key][props[i]].nodeValue) {
            output[key][props[i]] = input[key][props[i]];
          }
        }
      } else if (Operate.isArray(value)) {
        output[key] = Array.from(input[key], function (childItem) {
          if (childItem instanceof HTMLElement) {
            return this.toJSON(childItem, reqModel);
          }
        }.bind(this))
      }
      else {
        output[key] = input[value] || ''
      }
    }
    return output;

  }

  static displayDOMJSON(domJSON) {
    console.log(domJSON);
  }
}
