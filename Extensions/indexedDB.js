class IndexedDB {
  constructor(database, objectStores) {
    this.db;
    this.objectStores = objectStores;
    this.openConnection(database);
    this.setObjectStore();
  }

  openConnection(database) {
    this.connection = indexedDB.open(database, 1);
    this.connection.onsuccess = (e) => {
      this.db = this.connection.result;
    };
    this.connection.onerror = (e) => {};
  }

  setObjectStore() {
    this.connection.onupgradeneeded = (e) => {
      this.db = e.target.result;
      for (let i = 0; i < this.objectStores.length; i++) {
        const store = this.objectStores[i];
        if (!this.db.objectStoreNames.contains(store)) {
          this.db.createObjectStore(store, { autoIncrement: true });
        }
      }
    };
  }

  set(storeName, formData) {
    return new Promise((resolve, reject) => {
      let result;
      const tx = this.db.transaction(storeName, "readwrite");
      tx.oncomplete = (_) => resolve(result);
      tx.onerror = (event) => reject(event.target.error);
      const store = tx.objectStore(storeName);
      const request = store.put(JSON.parse(formData));
      request.onsuccess = (_) => (result = request.result);
    });
  }

  getAll(storeName) {
    return new Promise((resolve, reject) => {
      let result;
      const tx = this.db.transaction(storeName, "readonly");
      tx.oncomplete = (_) => resolve(result);
      tx.onerror = (event) => reject(event.target.error);
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = (_) => (result = request.result);
    });
  }
}

export { IndexedDB };
