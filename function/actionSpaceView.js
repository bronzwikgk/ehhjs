class ActionView {
     constructor(model) {
        this.model = model
    }

    updateDomContent=(data)=> {
        this.model.updateJson(data)
        document.getElementById('actionOutput-block').innerHTML=data
    }

}
