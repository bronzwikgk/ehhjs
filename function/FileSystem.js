var fileHandle,defaultGetStoreFunc;;
const pickerOpts = {
    types: [
      {
        description: '.txt,.html,.js,.json,.csv,.xml,.xlsx,.jpg,.jpeg,.png,.mp4',
        accept: {
          'text/*':['.txt','.html','.json','.js','.xml','.csv'],
          'image/*':['.jpg','.jpeg','.png'],
          'video/*':['.mp4'],
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};
class processFS{
    static async NewFile(event){
        event.preventDefault();
        if(!fileHandle){
              ActionView.addInnerHTML(sampleIntroStory,document.getElementById('inlineContent')); 
        }else{
            if(confirm('You want to erase the content ?')){
                ActionView.addInnerHTML(sampleIntroStory,document.getElementById('inlineContent')); 
            }
        }
    }
    static async saveFile(event){
        event.preventDefault();
        console.log('File Handle ' + fileHandle);
        if(fileHandle === undefined){
            await processFS.saveAsFile(event);
        }else{
            const writable = await fileHandle.createWritable();
            await writable.write(document.getElementById('textBox').innerText);
            await writable.close();
        }
    }
    static async saveAsFile(event){
        event.preventDefault();
        const newHandle = await window.showSaveFilePicker(pickerOpts);
        const writableStream = await newHandle.createWritable();
        await writableStream.write(document.getElementById('textBox').innerText);
        await writableStream.close();
        fileHandle = newHandle;
    }
    static async readFile(event){
        event.preventDefault();
        if(fileHandle){
            if(confirm('Want to erase all the changes made it to the file')){
                await processFS.Open(event);
            }
        }else{
            await processFS.Open(event);
        }
    }
    static async Open(event,handle){
        event.preventDefault();
        try{
            if(!handle){
                [fileHandle] = await window.showOpenFilePicker(pickerOpts);
            }else{
                fileHandle = handle;
            }
            console.log(fileHandle);
            var file = await fileHandle.getFile();var contents;
            if(file['name'].includes('.json') || file['name'].includes('.txt')|| file['name'].includes('.html')|| file['name'].includes('.js')||file['name'].includes('.xml')){
                contents = await file.text();
                // ActionView.updateTitle(file['name']);
                // ActionView.updateInnerText(contents);
                ActionView.addInnerHTML(content,document.getElementById('inlineContent')); 
            }else if(file['name'].includes('.xlx') || file['name'].includes('.xlsx')|| file['name'].includes('.csv')){
                console.log("Work In Progress");
            }else if(file['type'].includes('image') ||file['name'].includes('.JPG') ||file['name'].includes('.JPEG') ||file['name'].includes('.PNG')){
               var reader = new FileReader();
               reader.addEventListener("load", function () {
                var image = new Image();
                image.title = file.name;
                image.width = '460';image.height = '380';
                image.src = reader.result;
                // ActionView.updateTitle(file['name']);
                // ActionView.displayImage(image);
              }, false);
                reader.readAsDataURL(file);
            }else if(file['name'].includes('mp4')){
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                 var html = '<video src="' + reader.result + '" width="460" height="380" controls></video>'
                 ActionView.addInnerHTML(html,document.getElementById('inlineContent')); 
                //  ActionView.updateTitle(file['name']);
                //  ActionView.updateText(html);
               }, false);
               reader.readAsDataURL(file);
            }else{
                console.log("Not supported");
            }
        }catch(err){
            console.log(err);
        }
    }
    static async OpenDirectory(event){
        event.preventDefault();
        try{
            const dirHandle = await window.showDirectoryPicker();
            var dirID = uid();
            indexDB.set(dirID, dirHandle);
            var input = JSON.parse(JSON.stringify(directoryJSON));
            input['li']['span']['innerText'] = dirHandle.name;input['li']['list']['id'] = dirID;
            var json = await processFS.jsonForDirectory(input['li']['list'] ,dirHandle);
            console.log(input);
            console.log(document.getElementById('workspace').innerHTML);
            var data = new Entity(input, document.getElementById('workspace'));
            console.log(document.getElementById('workspace').innerHTML);
          //  await indexDB.set('workspace',document.getElementById('workspace').innerHTML);
        }catch(err){
            console.log(err);
        }
       
    }
    static async jsonForDirectory(obj,parentHandle){
        for await(var entry of parentHandle.values()){
            var id = uid();
            if(entry.kind == 'directory'){
                var directory = JSON.parse(JSON.stringify(directoryJSON));
                directory['li']['span']['innerText'] = entry.name;directory['li']['list']['id'] = id;
                var directoryHandle = await parentHandle.getDirectoryHandle(entry.name);
                await indexDB.set(id,directoryHandle);
                obj[entry.name] = directory;
                console.log(obj[entry.name]['li']['list']);
                await processFS.jsonForDirectory(obj[entry.name]['li']['list'], directoryHandle);
            }else if(entry.kind == 'file' && entry.name.includes('.')){
                var fileData = JSON.parse(JSON.stringify(fileJSON));
                fileData['id'] = id;fileData['innerText'] = entry.name;
                var getfileHandle = await parentHandle.getFileHandle(entry.name);
                await indexDB.set(id,getfileHandle);
                obj[entry.name] = fileData;
            }
        }
        console.log(obj);
        return obj;
    }
}
