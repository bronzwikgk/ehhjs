/**
 * The RequestObj object.
 * @typedef {Object} RequestObj
 * @property {string} [reqName] - requset name.
 * @property {string} [index] - requset index.
 * @property {Object} objectModel -namespace.
 * @property {string} method - request method available on name space.
 * @property {Array.<String>} arguments - arguments to be passed into the method.
 * @property {RequestObj} [andThen] - nested request object which isn't a callback.
 * @property {string} [callBack] - call back for single requests.
 */

/**
 * The flow Request Object
 * @typedef {Object} FlowRequest
 * @property {Array.<RequestObj>} flowRequest - Array of requests
 */
