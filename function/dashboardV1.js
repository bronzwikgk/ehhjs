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