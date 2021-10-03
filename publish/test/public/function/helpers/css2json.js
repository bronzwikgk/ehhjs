var CSSStyleSheetSchema = {
   rules: "cssRules.$all.$only-object.$follow-CSSRuleSchema",
   "type":'constructor.name'
};
var CSSRuleSchema = {

  "~$condition-(selectorText||keyText)" : 'style.$all-with-keys.$non-empty.$only-string',
  "conditionText": 'conditionText',
  "rules":'cssRules.$all.$only-object.$follow-CSSRuleSchema',
  "name": 'name',
  "namespaceURI":'namespaceURI',
  "prefix":'prefix',

  "type":'constructor.name'

}
function css2json(stylesheet, model){
   if(!model) model = CSSStyleSheetSchema;
   return copyAs(stylesheet, model);
}
