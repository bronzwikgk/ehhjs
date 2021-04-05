
var sampleActionStory= {
    name: 'div',
    class: 'richText container column',
    id: 'activeActionStory',
    fav: 'false',
    created: '',
    title: {
        name: 'span',
        class: 'container',
        textContent:'title'
    },
    blockCollection: {
        name: 'blocks',
        id: 'block+Index',
        inlineContent: {
            name: 'span',
            class: 'inlineContent',
            id: 'inlineContent',
            textContent:'Yo',

            
        }
    }
}

// const sampleNote0 = {
//     id: uuid(),
//     text: `# Scratchpad The easiest note to find.`,
//     category: '',
//     scratchpad: true,
//     class:'richText',
//     favorite: false,
//     created: dayjs().format(),
//     lastUpdated: dayjs().format(),
// }

const invoiceSample = {
    "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "InvoiceInputModel",
            "type": "object",
                "properties": {
        "DueDate": { "type": "string" },
        "Balance": { "type": "number" },
        "DocNumber": { "type": "string" },
        "Status": { "type": "string" },
        "Line": {
            "type": "array",
                "items": {
                "type": "object",
                    "properties": {
                    "Description": { "type": "string" },
                    "Amount": { "type": "integer" },
                    "DetailType": { "type": "string" },
                    "ExpenseDetail": {
                        "type": "object",
                            "properties": {
                            "Customer": {
                                "type": "object",
                                    "properties": {
                                    "value": { "type": "string" },
                                    "name": { "type": "string" }
                                }
                            },
                            "Ref": {
                                "type": "object",
                                    "properties": {
                                    "value": { "type": "string" },
                                    "name": { "type": "string" }
                                }
                            },
                            "Account": {
                                "type": "object",
                                    "properties": {
                                    "value": { "type": "string" },
                                    "name": { "type": "string" }
                                }
                            },
                            "LineStatus": { "type": "string" }
                        }
                    }
                }
            }
        },
        "Vendor": {
            "type": "object",
                "properties": {
                "value": { "type": "string" },
                "name": { "type": "string" }
            }
        },
        "APRef": {
            "type": "object",
                "properties": {
                "value": { "type": "string" },
                "name": { "type": "string" }
            }
        },
        "TotalAmt": { "type": "number" }
    }
}
