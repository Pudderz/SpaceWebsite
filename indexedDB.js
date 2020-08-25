let image = document.querySelector('#image');
let deleteImage = document.querySelector('#deleteImage');

let db;

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
    removeImage();
    let store = () => {
        console.log(image.alt);
        let objectStore = (type =="image")? "imageSaved": "videoSaved";
        if(!(image.alt =='placeholder image') || type =="video"){
            let transaction = db.transaction(`${objectStore}`,'readwrite');
            let items = transaction.objectStore(`${objectStore}`);
            let item = {
                title: imageTitle,
                date:imageDate,
                explanation: imageDetails,
                url: imageUrl,
                hdurl: imageHdUrl,
            }
            let request = items.add(item, imageTitle);

            request.onsuccess = () => {
                console.log('item added to the store', request.result)
            }
            request.onerror = () => {
                console.log('item could not be added to the store', request.error)
            }
        }else{
            console.log('No image')
        }
        
    }
    let saved = document.querySelector('#saveImage');
        saved.addEventListener('click', () => {
        store(); 
    });


};
let removeImage = () => {
    deleteImage.addEventListener('click', (e) => {
        let objectStore = (type == "image")? "imageSaved": "videoSaved";
        let transaction = db.transaction(objectStore, 'readwrite');
        let items = transaction.objectStore(objectStore);
        let request = items.delete(imageTitle);
        request.onsuccess = () => console.log(`${type} removed from your collection`);
        request.onerror = () => console.log(`${type} could not be removed from the store ${request.error}`);
    })

}

