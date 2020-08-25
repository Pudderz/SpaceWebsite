
let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = (e)=> {
    db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
    db.createObjectStore('videoSaved');
    db.createObjectStore('presetImages');
}
openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log('db running');
    getCollection('imageSaved');
};







