class ActionSpaceEntityModel{
    constructor() {
    }

    updateJson(data){
        actionSpaceConfig.actionSpace.actionEditorBlock.divBlock[0].innerText=data

    }
    saveToLocalStorage({key, value}){
        console.log(key+value)
        StorageHelper.saveToStorage(key,value)

    }
}
