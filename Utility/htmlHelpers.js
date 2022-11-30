// to be added in AppDataSet named Json file and loaded at run time.
const selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]

//To be added in Text validation.
function isSelfClosingTag(tagName) {
  
  if (selfClosingTags.includes(tagName.toLowerCase())) {
    return true;
  }
  return false;
}
//To be added in Text actionEntity
function specialToUnicode(textContent) {
  textContent = textContent.replaceAll(">", "&gt;");
  textContent = textContent.replaceAll("<", "&lt;");
  textContent = textContent.replace("´", "&#180;");
  textContent = textContent.replace("©", "&#169;");
  return textContent;
}

export { isSelfClosingTag, specialToUnicode };
