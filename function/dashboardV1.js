var response2;
//indexDB.set('recentStories', recentStories);
//indexDB.set('userDashboard', userDashboard);
//console.log(userDashboard)
var newStorageInstance = new StorageHelper('userDashboard', userDashboard);
//console.log(newStorageInstance);

//console.log(activeListernersInstance);

//var currentSessionHistory = newStorageInstance.set('currentSessionHistory',[window.location]);
//StorageHelper.set('userDashboard', userDashboard);
//var userDashboardFromStorage = StorageHelper.get('userDashboard');
//console.log(newStorageInstance.entity)

var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer');
var actionSpaceViewInstance = new ActionView(userDashboard, actionSpaceElementInstanceIndom);

//console.log(actionSpaceInstace._actionView.entity)
//var actionEventInstance = new ActionEvent('window', activeListerners['window']);
var actionSpaceController = new ActionController(actionSpaceViewInstance, userDashboard, 'window', activeListerners['window']);
console.log(actionSpaceController);




window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Dahsboard.js Page load time is ' + loadTime);
}