let collection = document.querySelector('.collection');
console.log(collection);

let createImages = (photoCollection) =>{
    photoCollection.forEach(element => {
        let image = document.createElement('img');
        image.src = element.url;
        image.alt = element.title;
        collection.appendChild(image);
    });
} 




    let grabImage = () =>{
        console.log('db:'+ db)
        let transaction = db.transaction('imageSaved', 'readonly');
        let objectStore = transaction.objectStore('imageSaved');
        let request = objectStore.getAll()
        request.onsuccess = () => {
            console.log('items viewed', request.result);
            let photoCollection = request.result;
            createImages(photoCollection)
        }
        request.onerror = () =>{
            console.log('items could not be viewed', request.error);
        }
    }






