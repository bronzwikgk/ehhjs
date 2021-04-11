var directoryDataModelSchema = {
    directoryname: {
        directoryName: 'name',
        type: 'folder/collection',
        items: [],
        lastModified: [],
        location: '',
        createdon: '',
        attributes:['readonly:boolean','Hidden:boolean']
    }   
}

/**
 * @type {HTMLJSONEntityModel4Html}
 */
var entityModel4Html = {
    tagName: "tagName",
    attributes: { class: "class", style: "style", src: "src", alt: "alt" },
    children: ["all"],
};

var fileModel = {
    directoryname: {
        directoryName: 'name',
        id:'',
        type: 'folder/collection',
        items: [],
        lastModified: [],
        location: '',
        createdon: '',
        attributes: ['readonly:boolean', 'Hidden:boolean']
    }
}
var fileData = {
    'sample.xml': {
        data: '<test>Hello!</test>',
        type: 'application/xml'
    },
    'sample.csv': {
        data: 'Test1,Test2\nHello1,Hello2',
        type: 'text/csv'
    },
    'sample.json': {
        data: JSON.stringify({ test: 'Hello!' }),
        type: 'application/json'
    }
}
var directoryJSON = {
    'li': {
        'name': 'li',
        'span': {
            'name': 'span',
            'class': 'parent',
            "textContent": '', //inner Text will be included
        },
        'list': {
            'name': 'ul',
            'class': 'nested',
            'id': '' //id - Unique ID with which directory handle of this folder can ke retrieved from indexDB
        }
    }
}
var fileJSON = {
    'name': 'li',
    'id': '', //id - Unique ID with which file handle of this file retrieved from indexDB
    //'class':'file'//used for opening a file
    "textContent": '',
    //innerText - name of the file
    'data-command': `[{"command":"file"}]`,
}
const pickerOpts = {
    types: [
        {
            description: '.txt,.html,.js,.json,.csv,.xml,.xlsx,.jpg,.jpeg,.png,.mp4',
            accept: {
                'text/*': ['.txt', '.html', '.json', '.js', '.xml', '.csv'],
                'image/*': ['.jpg', '.jpeg', '.png'],
                'video/*': ['.mp4'],
            }
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

const recentFiles = [
    {
        name: '',
        title:'',
        id: '',
        actionContent:'',
    }
]