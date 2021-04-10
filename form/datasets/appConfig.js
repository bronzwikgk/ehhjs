var activeListerners = {
    'window': {
        'onhashchange': 'handleEvent',
        'onclick':'handleEvent',
    },
    'document': {
        'onDOMContentLoaded': 'handleEvent',
        'onload': 'handleEvent',
        'onbeforeunload':'handleEvent',
        'onunload':'handleEvent'
    }
}


//console.log("loaded",Object.keys(activeListerners['window']))