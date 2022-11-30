config.sorted = function () {
  var sorted = [];
  var tabs = [...config.elements.tabs.querySelectorAll("table")];
  for (var i = 0; i < tabs.length; i++) {
    var id = tabs[i].getAttribute("id");
    if (id) sorted.push(id.replace("tabs-table-for-item-", ''));
  }
  /*  */
  config.storage.object.sorted = sorted;
  chrome.storage.local.set({"sorted": sorted}, function () {});
};

config.remove = function (key, id, callback) {
  if (key && id) {
    chrome.storage.local.get(null, function (e) {
      var storage = {"tabs": e.tabs || {}, "files": e.files || {}, "cursor": e.cursor || {}, "directories": e.directories || {}};
      if (storage[key][id]) delete storage[key][id];
      /*  */
      config.storage.object[key] = storage[key];
      chrome.storage.local.set(storage, callback);
    });
  }
};

config.store = function (key, entry) {
  return new Promise(resolve => {
    if (key && entry) {
      chrome.storage.local.get(null, function (e) {
        var storage = {"tabs": e.tabs || {}, "files": e.files || {}, "cursor": e.cursor || {}, "directories": e.directories || {}};
        /*  */
        if (key === "cursor") storage[key][entry.fullPath] = entry;
        else if (key === "tabs") storage[key][entry.fullPath] = entry.fullPath;
        else storage[key][entry.fullPath] = chrome.fileSystem ? chrome.fileSystem.retainEntry(entry) : null;
        /*  */
        config.storage.object[key] = storage[key];
        chrome.storage.local.set(storage, resolve);
      });
    }
  });
};

config.save = {
  "extension": function (e) {
    var option = {};
    config.download.id = '';
    config.download.saveAs = "saveAs" in e ? e.saveAs : false;
    var text = config.editor.codemirror[e.fullPath].getValue();
    var type = "fileType" in e ? e.fileType : config.options.codemirror.mode;
    config.download.url = URL.createObjectURL((new Blob([text], {"type": type})));
    /*  */
    option["url"] = config.download.url;
    option["conflictAction"] = "overwrite";
    option["saveAs"] = config.download.saveAs;
    if (config.download.saveAs === false) option["filename"] = e.fullPath.replace('/', '');
    /*  */
    config.listeners.changed.remove(e.fullPath);
    chrome.downloads.download(option, function (e) {config.download.id = e});
  },
  "app": function (e) {
    var path = e.fullPath;
    if (chrome.fileSystem) {
      chrome.fileSystem.getWritableEntry(e, function (entry) {
        if (path in config.editor.codemirror) {
          entry.file(function (file) {
            entry.createWriter(function (writer) {
              writer.truncate(0);
              config.listeners.changed.remove(path);
              writer.onwriteend = function () {
                if (writer.length === 0) {
                  writer.write(new Blob([config.editor.codemirror[path].getValue()], {"type": file.type}));
                }
              };
             }, function () {});
           });
         }
      });
    }
  }
};

config.saveAs = {
  "extension": function () {config.save.extension({"saveAs": true, "fullPath": config.current.path})},
  "app": function () {
    chrome.fileSystem.chooseEntry({"type": "saveFile"}, function (entry) {
      var lastError = chrome.runtime.lastError;
      if (entry) {
        entry.file(function (file) {
          entry.createWriter(function (writer) {
            writer.truncate(0);
            const OLD = config.current.path;
            writer.onwriteend = function () {
              if (writer.length === 0) writer.write(new Blob([config.editor.codemirror[OLD].getValue()], {"type": file.type}));
              else {
                config.editor.remove.codemirror(OLD, true, true);
                config.store("files", entry).then(function () {
                  config.readFile(entry).then(function (options) {
                    var item = document.getElementById(options.fullPath);
                    if (item) item.click();
                  });
                });
              }
            };
          }, function () {});
        });
      }
    });
  }
};

config.readFile = function (entry) {
  return new Promise(resolve => {
    var lastError = chrome.runtime.lastError;
    if (entry && entry.fullPath) {
      if ((entry.fullPath in config.editor.codemirror) === false) {
        entry.file(function (file) {
          var reader = new FileReader();
          reader.readAsText(file);
          reader.fileType = file.type;
          reader.fileName = entry.name;
          reader.isFile = entry.isFile;
          reader.fullPath = entry.fullPath;
          reader.isDirectory = entry.isDirectory;
          config.files[entry.fullPath] = entry;
          reader.onload = function (e) {
            var options = {
              "isFile": e.target.isFile,
              "result": e.target.result,
              "fileType": e.target.fileType,
              "fileName": e.target.fileName,
              "fullPath": e.target.fullPath,
              "isDirectory": e.target.isDirectory
            };
            /*  */
            config.editor.create.codemirror(options, function () {resolve(options)});
          };
        });
      } else {
        var item = document.getElementById(entry.fullPath);
        if (item) item.click();
      }
    }
  });
};

config.readDirectory = function (e) {
  return new Promise(resolve => {
    var lastError = chrome.runtime.lastError;
    if (e) {
      var folder = e.createReader();
      folder.readEntries(async entries => {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.isFile) await config.readFile(entry);
          else await config.readDirectory(entry);
        }
        /*  */
        resolve();
      });
    }
  });
};

config.fileio = function (e) {
  var id = e.target.getAttribute("id");
  /*  */
  if (id === "reset") config.reset();
  else if (id === "support") background.send("support");
  else if (id === "donation") background.send("donation");
  else if (id === "openSettings") document.querySelector(".open-right").click();
  else if (id === "saveAs") config.saveAs[chrome.fileSystem ? "app" : "extension"]();
	else if (id === "refresh") {
		var active = config.editor.codemirror[config.current.path];
		if (active) active.refresh();
	}
	else if (id === "reloadApp") {
		if (config.listeners.changed.check.all()) {
			var message = 'There are some unsaved changes! Please save all files before reloading the app.';
			mscConfirm("Close", message, function () {}, function () {});
			return;
		} else {
      if (chrome.fileSystem) chrome.runtime.reload();
      else document.location.reload();
    }
	}
  else if (id === "saveAll") {
    for (var name in config.files) {
      if (config.editor.codemirror[name]) {
        config.save[chrome.fileSystem ? "app" : "extension"](config.files[name]);
      }
    }
  }
  else if (id === "save") {
    if (config.current.path) {
      var entry = config.files[config.current.path];
      if (entry) config.save[chrome.fileSystem ? "app" : "extension"](entry);
      else config.saveAs[chrome.fileSystem ? "app" : "extension"]();
    }
  }
  else if (id === "new") {
    var options = {
      "result": '',
      "fileType": '',
      "fullPath": '',
      "isFile": true,
      "isDirectory": false,
      "fileName": "untitled" + config.count++
    };
    /*  */
    config.editor.create.codemirror(options, function () {
      var item = document.getElementById(options.fileName);
      if (item) item.click();
    });
  }
  else if (id === "open") {
    if (chrome.fileSystem) {
      chrome.fileSystem.chooseEntry({"type": "openFile"}, function (entry) {
        var lastError = chrome.runtime.lastError;
        config.store("files", entry).then(function () {
          config.readFile(entry).then(function (options) {
            var item = document.getElementById(options.fullPath);
            if (item) item.click();
          });
        });
      });
    } else {
    	var input = document.createElement("input");
      document.body.appendChild(input);
      input.style.display = "none";
      input.type = "file";
      input.click();
      /*  */
      input.addEventListener("change", function (e) {
        var file = e.target.files[0];
        if (!file) return;
        /*  */
        var tmp = e.target.value.substring(e.target.value.indexOf('\\') >= 0 ? e.target.value.lastIndexOf('\\') : e.target.value.lastIndexOf('/'));
        if (tmp.indexOf('\\') === 0 || tmp.indexOf('/') === 0) tmp = tmp.substring(1);
        var fileName = tmp ? tmp : config.make.random.name();
        /*  */
        document.body.removeChild(input);
        var fileType = file.type;
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
          var result = e.target.result;
          var fullPath = '/' + fileName;
          config.files[fullPath] = {"fileName": fileName, "fullPath": fullPath, "fileType": fileType};
          config.editor.create.codemirror({
            "isFile": true,
            "result": result,
            "isDirectory": false,
            "fileType": fileType,
            "fileName": fileName,
            "fullPath": fullPath
          }, function () {
            var item = document.getElementById(fullPath);
            if (item) item.click();
          });
        };
      });
    }
  }
  else if (id === "openFolder") {
    if (chrome.fileSystem) {
      chrome.fileSystem.chooseEntry({"type": "openDirectory"}, function (entry) {
        var lastError = chrome.runtime.lastError;
        if (entry) config.directories[entry.fullPath] = entry;
        config.store("directories", entry).then(function () {config.readDirectory(entry)});
      });
    }
  }
  else {/* files */}
};

if (!chrome.fileSystem) {
  chrome.downloads.onChanged.addListener(function (e) {
    const OLD = config.current.path;
    /*  */
    if (e.id === config.download.id) {
      if (e.state) {
        if (e.state.current === "complete")  {
          chrome.downloads.search({"id": e.id}, function (items) {
            chrome.downloads.erase({}, function () {
              URL.revokeObjectURL(config.download.url);
              /*  */
              if (config.download.saveAs) {
                var result = config.editor.codemirror[OLD].getValue();
                var fileName = items[0].filename.replace(/^.*[\\\/]/, '');
                var fullPath = '/' + fileName;
                /*  */
                config.editor.remove.codemirror(OLD, true, true);
                config.files[fullPath] = {"fileName": fileName, "fullPath": fullPath};
                config.editor.create.codemirror({"isFile": true, "fileType": '', "isDirectory": false, "fileName": fileName, "result": result, "fullPath": fullPath}, function () {
                  var item = document.getElementById(fullPath);
                  if (item) item.click();
                });
              }
            });
          });
        }
      }
    }
  });
}
