var activeListerners = {
    'window': {
        'onload': 'handleEvent',
        'onbeforeunload':'handleEvent',
        'onhashchange':'handleEvent',
       
        'onstorage':'handleEvent',
      //  'onmousemove':'handleevent',
        'onDOMContentLoaded': 'handleEvent',
        'onload': 'handleEvent',   
        'onreadystatechange':'handleEvent',
        // 'onmouseenter':'handleEvent',
        // 'onmouseover':'handleEvent',
        // 'onmouseleave':'handleEvent',
        
        // 'onmouseout':'handleEvent',
        // 'onbeforeunload':'handleEvent',
        'onpopstate':'handleEvent',
        'onkeydown':'handleEvent',
        'onkeyup':'handleEvent',
        'onkeypress':'handleEvent',
        'onclick':'handleEvent',
    },
    'document': {
        
    }
}
var EventCommandMapReq = [
  {
    keyword: 'click',
    callback: ['onClick'],
  },
  {
    keyword: 'hashchange',
    callback: [' actionSpaceController.onHashChange'],
  },
  {
    keyword: 'popstate',
   callback: [' actionSpaceController.onPopState'],
  },
  
]


//document.addEventListener('mouseenter', e => this.emit('handleEvent', e));
    

//console.log("loaded",Object.keys(activeListerners['window']))