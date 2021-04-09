//https://johnresig.com/blog/revised-javascript-dictionary-search/
//http://stevehanov.ca/blog/index.php?id=120

document.onkeyup = handleKeyup;
var lastKey;
let searchDictionary = new Set();
let activeKeyInputs = new Map();
activeKeyInputs.set('keyUpEvent', "");
let wordInput = new Map();
let sentenceInput = new Map();
let paraInput = new Set();
let currentWord = new Map();
console.log("saving",activeKeyInputs.get('keyUpEvent'), 'activeKeyInputs');
save(activeKeyInputs.get('keyUpEvent'), 'activeKeyInputs');
 // we are only interested in alphanumeric keys
searchDictionary.add('searchKey', 'abc789');
searchDictionary.add('closureSet', 'whenThis', 'Addthis','rightNextToit');
searchDictionary.add('closureSet', '{', '}');
searchDictionary.add('closureSet', '(', ')');
searchDictionary.add('closureSet', '[', ']');
console.log(searchDictionary);


function handleKeyup(e) { 
    //console.log(arguments.callee.name);
   //console.log(searchDictionary);
    var lastKey = activeKeyInputs.get('keyUpEvent');
    console.log("last key pressed",lastKey);
    var currentKey = e.key;
    console.log("curre", currentKey);
    newMapKey = currentKey.concat(lastKey)
    activeKeyInputs.set('keyUpEvent', newMapKey);
    save(activeKeyInputs.get('keyUpEvent'), 'activeKeyInputs');
    save('currentWord', currentWord);
    
    var response = searchInMap(currentKey);
    if (response) {
        console.log(response);
    }
}


function searchInMap(entity) {
   
    searchDictionary.forEach(function (value, key) {
        //  console.log(key + ' = ' + value, typeof value)
        var searchKeyInput = '/' + entity + '/g';
        var result = value.match(entity);
        if (result) {
            console.log('matchFound', result);
            return result;
            //console.log(e.keyCode, e.srcElement, e.key);
        }
    })

    
}