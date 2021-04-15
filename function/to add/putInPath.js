/*!
 * Add items to an object at a specific path
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object}       obj  The object
 * @param  {String|Array} path The path to assign the value to
 * @param  {*}            val  The value to assign
 */
var put = function (obj, path, val) {

    /**
     * If the path is a string, convert it to an array
     * @param  {String|Array} path The path
     * @return {Array}             The path array
     */
    var stringToPath = function (path) {

        // If the path isn't a string, return it
        if (typeof path !== 'string') return path;

        // Create new array
        var output = [];

        // Split to an array with dot notation
        path.split('.').forEach(function (item, index) {

            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {

                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }

            });

        });

        return output;

    };

    // Convert the path to an array if not already
    path = stringToPath(path);

    // Cache the path length and current spot in the object
    var length = path.length;
    var current = obj;

    // Loop through the path
    path.forEach(function (key, index) {

        // Check if the assigned key shoul be an array
        var isArray = key.slice(-2) === '[]';

        // If so, get the true key name by removing the trailing []
        key = isArray ? key.slice(0, -2) : key;

        // If the key should be an array and isn't, create an array
        if (isArray && Object.prototype.toString.call(current[key]) !== '[object Array]') {
            current[key] = [];
        }

        // If this is the last item in the loop, assign the value
        if (index === length - 1) {

            // If it's an array, push the value
            // Otherwise, assign it
            if (isArray) {
                current[key].push(val);
            } else {
                current[key] = val;
            }
        }

        // Otherwise, update the current place in the object
        else {

            // If the key doesn't exist, create it
            if (!current[key]) {
                current[key] = {};
            }

            // Update the current place in the object
            current = current[key];

        }

    });

};



var obj = {
    'id': '',
    'issue': {

    }
};

var lunch = {};
put(lunch, 'sandwich.toppings[]', 'mayo');
put(lunch, 'sandwich.toppings[]', 'tomato');
put(lunch, 'sides.chips', 'Cape Cod');
put(lunch, 'sides.cookie', true);
put(lunch, 'sides.drink', 'soda');

console.log(lunch);


///these function set a value to a ONotation path


function setValue(obj, path, value) {
    var a = path.split('.')
    var o = obj
    while (a.length - 1) {
        var n = a.shift()
        if (!(n in o)) o[n] = {}
        o = o[n]
    }
    o[a[0]] = value
}

function getValue(obj, path) {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')
    var a = path.split('.')
    var o = obj
    while (a.length) {
        var n = a.shift()
        if (!(n in o)) return
        o = o[n]
    }
    return o
}


/**
 * Set the value for the given object for the given path
 * where the path can be a nested key represented with dot notation
 *
 * @param {object} obj   The object on which to set the given value
 * @param {string} path  The dot notation path to the nested property where the value should be set
 * @param {mixed}  value The value that should be set
 * @return {mixed}
 *
 */
function set(obj, path, value) {
    // protect against being something unexpected
    obj = typeof obj === 'object' ? obj : {};
    // split the path into and array if its not one already
    var keys = Array.isArray(path) ? path : path.split('.');
    // keep up with our current place in the object
    // starting at the root object and drilling down
    var curStep = obj;
    // loop over the path parts one at a time
    // but, dont iterate the last part,
    for (var i = 0; i < keys.length - 1; i++) {
        // get the current path part
        var key = keys[i];

        // if nothing exists for this key, make it an empty object or array
        if (!curStep[key] && !Object.prototype.hasOwnProperty.call(curStep, key)) {
            // get the next key in the path, if its numeric, make this property an empty array
            // otherwise, make it an empty object
            var nextKey = keys[i + 1];
            var useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
            curStep[key] = useArray ? [] : {};
        }
        // update curStep to point to the new level
        curStep = curStep[key];
    }
    // set the final key to our value
    var finalStep = keys[keys.length - 1];
    curStep[finalStep] = value;
};
