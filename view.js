import { isSelfClosingTag, specialToUnicode } from "./Utility/htmlHelpers.js";
import { Utility } from "./Utility/utility.js"; // Added import

const utility = new Utility(); // Added instance

class ActionView {
  constructor(config) {
    this.config = config;
    this.templates = config.templates || {}; // Initialize with templates from config
    this.root = document.querySelector(config.root || "#root");
  }

  // Method to load and cache templates if needed (can still be used for dynamic loading)
  async loadTemplate(templateName) {
    if (this.templates[templateName]) {
      return this.templates[templateName];
    }
    // In a real app, this might fetch templates from a URL
    // For now, if not in config, it's considered not found
    return null;
  }

  render(templateName, data, targetSelector) {
    if (!targetSelector) {
      console.error("ActionView.render requires a targetSelector.");
      return;
    }

    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      console.error(`ActionView: Target element "${targetSelector}" not found.`);
      return;
    }

    const template = this.templates[templateName];
    if (!template) {
        console.error(`ActionView: Template "${templateName}" not found.`);
        return;
    }

    let finalHtml;
    // Simple logic to inject data into JSON template
    // For 'usersTemplate', 'userAddedTemplate' or 'errorTemplate'
    if (templateName === 'usersTemplate' && Array.isArray(data)) {
        let ulContent = data.map(user => this.json2html({ nodeType: 1, tagName: "li", children: [{ nodeType: 3, textContent: user.name }] })).join('');
        
        // Find the original H1, UL, and FORM parts from the usersTemplate
        const h1Part = template.children.find(child => child.tagName === 'h1');
        const ulPart = template.children.find(child => child.tagName === 'ul');
        const formPart = template.children.find(child => child.tagName === 'form');

        // Reconstruct the template with dynamic UL content
        finalHtml = this.json2html({ 
            ...template, 
            children: [
                h1Part, // Copy H1
                { ...ulPart, children: [{ nodeType: 3, textContent: ulContent }] }, // Inject ulContent into UL
                formPart // Copy form
            ] 
        });

    } else if (templateName === 'usersTemplate' && (!data || Array.isArray(data) && data.length === 0)) {
      // Render usersTemplate with just the form if no data
      finalHtml = this.json2html(template);
    }
    else if (templateName === 'userAddedTemplate' && data && data.name) {
        finalHtml = this.json2html({ nodeType: 1, tagName: "li", children: [{ nodeType: 3, textContent: data.name }] });
    }
    else if (templateName === 'errorTemplate' && data && data.message) {
        finalHtml = this.json2html({ ...template, children: [{ nodeType: 3, textContent: data.message }] });
    }
    else {
        finalHtml = this.json2html(template);
    }
    
    targetElement.innerHTML = finalHtml;

    // After rendering, if it's the usersTemplate, re-add the form submit listener
    // This is a workaround for dynamic HTML rendering, in a real app
    // you'd use a reactive framework or event delegation at a higher level.
    if (templateName === 'usersTemplate') {
        const form = targetElement.querySelector('#add-user-form');
        if (form) {
            // Need to re-bind the event listener as innerHTML replaces elements
            form.addEventListener('submit', (e) => {
              e.preventDefault(); // Prevent default form submission
              window.ehhjsApp.clients.SPA_CLIENT.handlePageAction(e);
            });
        }
    }
  }

  json2html(json) {
    if (Array.isArray(json)) {
      return json.map(item => this.json2html(item)).join('');
    }

    let response = "";
    if (json.nodeType == 1) {
      response += `<${json.tagName}`;
      for (const key in json.attributes) {
        response += " ";
        response += key;
        const attrValue = json.attributes[key].value;
        if (typeof attrValue == "string") {
          response += `= "${attrValue}"`;
        } else if (typeof attrValue == "object") {
          let res = JSON.stringify(attrValue);
          // This part for request unparsing might need its own utility
          res = res.replace(/"/g, "'");
          response += `= ${res}`;
        }
      }
      response += ">";
      if ((!json.children || !json.children[0]) && json.textContent) {
        response += specialToUnicode(json.textContent);
      }
      if (json.children) {
        // If children is an array of objects (JSON templates)
        if (Array.isArray(json.children) && json.children.every(c => typeof c === 'object' && c.nodeType)) {
            response += this.json2html(json.children);
        } else if (typeof json.children === 'string') {
            // If children is already a pre-rendered string (e.g., from dynamic ulContent)
            response += json.children;
        }
      }
      if (isSelfClosingTag(json.tagName)) {
        response = response.slice(0, -1);
        response += `/>\n`;
      } else {
        response += `</${json.tagName}>\n`;
      }
    } else if (json.nodeType === 3 && json.textContent) {
        // Handle text nodes directly
        response += specialToUnicode(json.textContent);
    }
    return response;
  }
}

export { ActionView };
