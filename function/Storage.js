class StorageHelper{
   static saveToStorage(key,data){
        data=JSON.stringify(data)
        localStorage.setItem(key,data);
    }

    static  getFromStorage(key){
        let data=localStorage.getItem(key)
        return JSON.parse(data);
    }

    static clearStorage(){
        localStorage.clear()
    }
    static export(fileName,json){
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], {
            type: "application/json"
        }));
        a.setAttribute("download", `${fileName}.json`);
        document.body.appendChild(a);
        a.click();
    }
}
