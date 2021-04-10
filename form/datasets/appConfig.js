var activeListerners = {
    'window': {
        'onload': 'handleEvent',
        'onbeforeunload':'handleEvent',
        'onhashchange':'handleEvent',
        'onpopstate':'handleEvent',
        'onclick':'handleEvent',
        'onclick':'handleEvent',
        'onstorage':'handleEvent',


    },
    'document': {
        'onDOMContentLoaded': 'handleEvent',
        'onload': 'handleEvent',   
        'onreadystatechange':'handleEvent',
        'onmouseleave':'handleEvent',
        'onmouseout':'handleEvent',
        'onbeforeunload':'handleEvent',
        'onunload':'handleEvent',
        'onkeydown':'handleEvent',
        'onkeyup':'handleEvent',
        'onkeypress':'handleEvent',
    }
}
//document.addEventListener('mouseenter', e => this.emit('handleEvent', e));
    

//console.log("loaded",Object.keys(activeListerners['window']))