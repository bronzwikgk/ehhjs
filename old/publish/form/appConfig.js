var activeListerners = {
    ObjectModel: 'window',
    events: [
        {
            event: 'hashchange',
            callback: `this.emit('handleEvent', e)`,
        },
        {
            event: 'load',
            callback: `this.emit('handleEvent', e)`,
        },
    ]
}
console.log("iam", activeListerners)