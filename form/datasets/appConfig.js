var activeListerners = {
    'window': {
        'onhashchange': 'callback',
        'onclick':'callback',
    },
    'document': {
        'onDOMContentLoaded': '',
        'onload': '',
        'onbeforeunload':'',
        'onunload':''
        
    }
}


//console.log("loaded",Object.keys(activeListerners['window']))