let collection = document.querySelector('.collection');
let loadButton = document.querySelector('#load-images');
console.log(collection);

let createImages = (photoCollection) =>{
    if(photoCollection.length == 0){
        collection.innerHTML = 'You have no images in your collection';
    } else{
        photoCollection.forEach(element => {
            let image = document.createElement('img');
            image.src = element.url;
            image.alt = element.title;
            collection.appendChild(image);
        });
    }   
} 

let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = (e)=> {
    let db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
}
openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    let db = openRequest.result;
    console.log('db successful');
    console.log('db:'+ db);

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

     loadButton.addEventListener('click', ()=>{
        console.log('clicked');
       grabImage();  
       
       });

};


   