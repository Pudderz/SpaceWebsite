let image = document.querySelector('#image');



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
    console.log('db su:'+ db);
};

// store the details in a personal collection, only will works for images atm
let store = objectStore => {
    let transaction = db.transaction(`${objectStore}`,'readwrite');
    let items = transaction.objectStore(`${objectStore}`);
    let item = {
        title: imageTitle,
        explanation: imageDetails,
        url: imageUrl,
    }
    let request = items.add(item, imageTitle);

    request.onsuccess = () => {
        console.log('item added to the store', request.result)
    }
    request.onerror = () => {
        console.log('item could not be added to the store', request.error)
    }
}

// let saveImage = () => {
//     let canvas = document.createElement('canvas');
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//     let context = canvas.getContext('2d')
//     context.drawImage(image, 0,0);
//     canvas.toBlob(function(){
//         store('imageSaved', blob)
//     })    
// }


let saved = document.querySelector('#saveImage');
saved.addEventListener('click', ()=>{
  store('imageSaved', ) 
})

