var response2;
//indexDB.set('recentStories', recentStories);
//indexDB.set('userDashboard', userDashboard);
//console.log(userDashboard)

var newStorageInstance = new StorageHelper('userDashboard', userDashboard);
var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer');
var actionSpaceViewInstance = new ActionView(userDashboard, actionSpaceElementInstanceIndom);

//console.log(actionSpaceInstace._actionView.entity)
var actionEventInstance = new ActionEvent('window', activeListerners['window']);
var actionSpaceController = new ActionController(actionSpaceViewInstance, userDashboard, actionEventInstance);
//console.log(actionSpaceController);



var req = HttpService.buildEncodedUri(loadObject2Dom);
//console.log(req);
window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(document.title,'dashboard.js Page load time is ' + loadTime);
}
//this Request is to convert a
var buildJsonReq = {
    objectModel: 'document',
    method: 'querySelectorAll',
    arguments: ['script'],
    response:[],
    callback:'eachKeyReq',
}
var eachKeyReq = {
    
}

function buildJson() {
    var responseOutput=[];
    var element2Convert = document.querySelectorAll('script')
    console.log("converting", element2Convert);

    for (var key in element2Convert) {
        //console.log(element2Convert, element2Convert[key].src, element2Convert[key])
        if (element2Convert[key].src) {
            fetch(element2Convert[key].src)
                .then((response) => response.json())
                .then((source) => {
                    console.log(source);
                    responseOutput.push(source);
                    console.log(responseOutput)
        })
        } 
    }

}
buildJson();