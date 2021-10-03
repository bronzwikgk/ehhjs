
var HTMLSchema = {
  name:'tagName',
  type:"$condition-(wholeText && tagName != 'SCRIPT')?'text':((data)?'comment' : 'element')",
  attributes:'$condition-((tagName==="STYLE")?undefined:attributes.$all.$into-parent.$only-object.$follow-HTMLAttributeSchema)',
  items:'$condition-((tagName==="STYLE")?undefined:childNodes.$all.$only-object.$follow-HTMLSchema)',
  text:"$condition-(wholeText)?wholeText:((data)?data:text)",
  sheet:'$condition-((tagName==="STYLE")?sheet.$only-object.$into-parent.$follow-CSSStyleSheetSchema:undefined)'
}
var HTMLAttributeSchema = {
   '~name':'nodeValue'
}
function html2json(elem, model){
   if(!model) model = HTMLSchema;
   var x = copyAs(elem, model);
   return x;
}