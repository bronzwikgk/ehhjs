var config = {
  "count": 0,
  "files": {},
  "directories": {},
  "current": {"path": null},
  "custom": {"style": null},
  "download": {"id": '', "url": '', "saveAs": false},
  "elements": {
    "toggle": {},
    "sidebar": {
      "resize": {
        "threshold": 3,
        "action": false
      }
    }
  },
  "storage": {
    "object": {},
    "defaults": {
      "tabs": {},
      "files": {},
			"cursor": {},
      "sorted": [],
      "active": null,
      "directories": {},
      "open-left": "open",
      "open-right": "close",
      "sidebar-left": "open",
      "sidebar-right": "close"
    },
    "read": function (id) {return config.storage.object[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      config.storage.object[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  },
  "make": {
    "random": {
      "name": function makeid() {
        var text = '', possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 7; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
    }
  },
  "reset": function () {
    mscConfirm("Reset", "Do you really want to restore the app to factory settings?", function () {
      chrome.storage.local.clear(function () {
        document.getElementById("reloadApp").click();
      });
    }, function () {});
  },
  "sort": {
    "array": function (e) {return e.sort()},
    "object": function (e) {
      var keys = Object.keys(e);
      return keys.sort().reduce((a, v) => {
        a[v] = e[v];
        return a;
      }, {});
    }
  },
  "restore": function () {
    var loop = {};
    var rendered = false;
    /*  */
    loop.restore = function (key, id, action) {
      return new Promise(resolve => {
        var item = config.storage.object[key][id];
        var action = key === "files" ? "readFile" : "readDirectory";
        /*  */
        if (chrome.fileSystem) {
          chrome.fileSystem.restoreEntry(item, function (entry) {
            var lastError = chrome.runtime.lastError;
            if (entry) {
              rendered = true;
              config[key][entry.fullPath] = entry;
              config[action](entry).then(resolve);
            } else config.remove(key, id, resolve);
          });
        } else config.remove(key, id, resolve);
      });
    };
    /*  */
    loop.entity = async function (key, callback) {
      var count = 0;
      var o = config.storage.object[key];
      var length = Object.keys(o).length;
      if (length) {
        for (var id in o) {
          count = count + 1;
          await loop.restore(key, id);
          if (count === length) callback();
        }
      } else callback();
    };
    /*  */
    loop.entity("files", function () {
      loop.entity("directories", function () {
        var tabs = config.storage.object.sorted.length ? config.storage.object.sorted : Object.keys(config.storage.object.tabs);
        if (tabs && tabs.length) {
          for (var i = 0; i < tabs.length; i++) {
            var selector = "div[id='" + tabs[i] + "']";
            var item = config.elements.sidebar.left.querySelector(selector);
            item ? item.click() : delete config.remove("tabs", tabs[i], function () {});
          }
          /*  */
          window.setTimeout(function () {
            var selector = "div[id='" + config.storage.object.active + "']";
            var item = config.elements.sidebar.left.querySelector(selector);
            if (item) item.click();
          }, 300);
        }
        /*  */
        if (rendered === false) document.getElementById("new").click();
      });
    });
  },
  "color": {
    "check": function (color) {
      var r, g, b, hsp;
      if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
      } else {
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
      }
      /*  */
      hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
      return hsp > 127.5 ? "light" : "dark";
    }
  },
  "excluded": {
    "intelliSense": {
      "trigger": {
        "keys": {
          "8": "backspace",
          "9": "tab",
          "13": "enter",
          "16": "shift",
          "17": "ctrl",
          "18": "alt",
          "19": "pause",
          "20": "capslock",
          "27": "escape",
          "33": "pageup",
          "34": "pagedown",
          "35": "end",
          "36": "home",
          "37": "left",
          "38": "up",
          "39": "right",
          "40": "down",
          "45": "insert",
          "46": "delete",
          "67": "c",
          "83": "s",
          "86": "v",
          "90": "z",
          "91": "left window key",
          "92": "right window key",
          "93": "select",
          "107": "add",
          "109": "subtract",
          "110": "decimal point",
          "111": "divide",
          "112": "f1",
          "113": "f2",
          "114": "f3",
          "115": "f4",
          "116": "f5",
          "117": "f6",
          "118": "f7",
          "119": "f8",
          "120": "f9",
          "121": "f10",
          "122": "f11",
          "123": "f12",
          "144": "numlock",
          "145": "scrolllock",
          "186": "semicolon",
          "187": "equalsign",
          "188": "comma",
          "189": "dash",
          "191": "slash",
          "192": "graveaccent",
          "220": "backslash",
          "222": "quote"
        }
      }
    }
  }
};
