let collection = document.getElementsByClassName('collection');
console.log(collection);


let grabImage = () =>{
    let transaction = db.transaction('imageSaved', 'readonly');
    let images = transaction.objectStore('imageSaved');
    let request = images.getAll()
    request.onsuccess = () => {
        console.log('items viewed', request);
    }
    request.onerror = () =>{
        console.log('items could not be viewed', request.error);
    }
}