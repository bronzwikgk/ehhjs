async function json2css(cssjson){
  if(!cssjson.rules) return "";
  var text = "";
  for(var i=0;i<cssjson.rules.length;i++){
    var cri = cssjson.rules[i];
    // console.log(cri);
    switch(cri.type){
      case undefined:
      case "CSSStyleRule":
      case "CSSKeyframeRule":
        text += (await stylerule2css(cri));
        break;
      case "CSSNamespaceRule":
        text += "@namespace url(\"" + cri.namespaceURI + "\");";
        break;
      case "CSSPageRule":
        text += "@page "+(await stylerule2css(cri));
        break;
      case "CSSImportRule":
        text += "@import "+cri.href +" "+ cri.media;
        break;
      case "CSSSupportsRule":
        text += "@supports " + cri.conditionText + " {" + (await json2css(cri)) + "}";
        break;
      case "CSSMediaRule":
        text += "@media " + cri.conditionText + " {" + (await json2css(cri)) + "}";
        break;
      case "CSSKeyframesRule":
        text += "@-webkit-keyframes "+ cri.name + " {" + (await json2css(cri)) + "}";
        break;
      case "CSSFontFaceRule":
        text += "@font-face "+(await stylerule2css(cri));
        break;
      default:
        if(cri.type)
          console.error(cri, cri.type, "not supported");
    }
  }
  return text;
}
async function stylerule2css(cssjson){
  // console.log( "here ++++++++++++++ ", cssjson,);
  delete cssjson['type'];

  var sel = Object.keys(cssjson)[0];
  var text = "";
  if(sel !== undefined && sel !== "undefined")
    text += sel;
  text += " {";

  delete cssjson[sel]['cssText'];

  for(var k in cssjson[sel]){
    if(!isNaN(parseInt(k))) continue;
    text += k + ":" + cssjson[sel][k] + ";";
  }
  text += "}";
  // console.log( "here --------------- ", text);
  return text;
}