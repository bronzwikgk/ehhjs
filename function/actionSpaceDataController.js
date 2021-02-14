class ActionSpaceDataController extends actionEventController {

    constructor(context, view, model) {
        super(context);
        this.view = view;
        this.model = model;

        this.on('updateEditor', this.view.updateDomContent)

        this.on('richTextWrap', this.view.wrapContent)
        this.on('richTextStyle', this.view.applyStyle)
        this.on('insertTag', this.view.insertTag)
        this.on('save', this.model.saveToLocalStorage)
        this.on('autoComplete', this.view.autoComplete)
    }




}
