
class Collection {
    constructor() {
      this._array = [];
      this._map = {};
      this.length = 0;
    }
  
    get = function (key) {
      if (this._map.hasOwnProperty(key)) {
        return this._array[this._map[key]].value;
      }
      return undefined;
    };
  
    getByIndex = function (index) {
      if (this.length <= index) {
        return undefined;
      }
      return this._array[index].value;
    };
  
    put = function (key, object) {
      if (typeof object === 'undefined') {
        this.remove(key);
      } else if (!this._map.hasOwnProperty(key)) {
        this._map[key] = this._array.length;
        this._array.push({
          value: object,
          key: key
        });
        this.length++;
      } else {
        this._array[this._map[key]].value = object;
      }
    };
  
    remove = function (key) {
      if (this._map.hasOwnProperty(key)) {
        var index = this._map[key];
        delete this._map[key];
        for (var name in this._map) {
          if (this._map.hasOwnProperty(name) && this._map[name] >= index) {
            this._map[name]--;
          }
        }
        this._array.splice(index, 1);
        this.length--;
      }
    };
  
    forEach = function (callback, thisObject) {
      if (!thisObject) {
        thisObject = this;
      }
      for (var i = 0, arr = this._array, ln = arr.length; i < ln; i++) {
        if (typeof arr[i].value !== 'undefined') {
          callback.call(thisObject, arr[i].value, i, arr[i].key, this);
        }
      }
    };
  
    defaultCompare(a, b) {
      if (a == b) {
        return 0;
      } else if (a < b) {
        return -1;
      }
      return 1;
    }
  
    sortByKeys = function (cmp) {
      if (!cmp) {
        cmp = defaultCompare;
      }
      this._array.sort(function (a, b) {
        return cmp(a.key, b.key);
      });
      for (var i = 0, arr = this._array, ln = arr.length; i < ln; i++) {
        this._map[arr[i].key] = i;
      }
    };
  
    keys = function () {
      var result = [];
      this.forEach(function (value, key) {
        result.push(key);
      });
      return result;
    };
  }