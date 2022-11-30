class Utility {
  constructor() {}

   getUniqueId(length) {
    var allowed =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
    // 26 + 26 + 10 + 1 = 63
    var res = "";
    for (var i = 0; i < length; i++) {
      res += allowed[parseInt(Math.floor(Math.random() * 63))];
    }
    return res;
  }

  generateMethodPrototype(method) {
    let fun = {
      method: "",
      args: [],
    };

    let currItem = "";
    for (let i = 0; i < method.length; i++) {
      const element = method[i];
      if (element == "(") {
        fun.method = currItem;
        currItem = "";
      } else if (element == ")") {
        fun.args.push(currItem);
        break;
      } else if (element == ",") {
        fun.args.push(currItem);
        currItem = "";
      } else if (element == '"' || element == "'") {
        continue;
      } else {
        currItem += element;
      }
    }

    return fun;
  }

  isPromise(p) {
    if (typeof p === "object" && typeof p.then === "function") {
      return true;
    }

    return false;
  }
}

export { Utility };
