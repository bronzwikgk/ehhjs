class DOMConversion {
  constructor() {}
  get(key,parent) {
      // console.log("for Initaition", key, objectModel, objectModel[key])
      if(parent[key]) {
          // console.log("for Initaition", key, objectModel, objectModel[key])
          var response=parent[key];
          // console.log("Initaites found",response)
          return response;
      }


  }


  /**
   * This method is used for converting DOM element to JSON object
   * @param {HTMLElement} object - HTML DOM Element to convert to JSON
   * @param {object} model - Model Schema for JSON object
   */
  static toJSON(object,model) {
      const output={}; // Initialize output object
      // iterate over the properties of the model
      for(var key in model) {
          var value=model[key];
          if(model.hasOwnProperty(key)&&Validators.validate(object[key],value)) {
              if(value.type==='object') {  // check if values is a nested object
                  var nestedItem=value.value;
                  output[key]=this.toJSON(object[key],nestedItem) // Create corresponding nested object in output object
              }
              else if(value.type==='array') {  // Check if value is an array
                  output[key]=[];
                  for(var i=0;i<object[key].length;i++) {
                      output[key].push(this.toJSON(object[key][i],model));
                  }
              }
              else {
                  output[key]=object[key]||'' // if the value is neither an array or an object, assign the corresponding output[key] to the Elements' object property's value
              }
          }
      }
      return output;

  }

  static displayDOMJSON(domJSON) {
      console.log(domJSON);
  }

  /**
   * This method is used for adding InnerHTML to DOM Elements
   * @param {HTMLElement} DOMElement - HTML DOM Element to add HTML to
   * @param {HTMLElement} propertyName - HTML element property name e.g className, href, name
   * @param {HTMLElement} input - HTML Input Element to be added into DOMElement
   */
  static addHTMLElementProperty(DOMElement,propertyName,input) {
      console.log(DOMElement)
      DOMElement[propertyName]=input;
  }
}