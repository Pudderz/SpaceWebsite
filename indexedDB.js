let image = document.querySelector('#image');
let db;



let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = (e)=> {
    db = openRequest.result;
    db.createObjectStore('imageSaved', {autoIncrement: true});
    db.createObjectStore('asteroidsSaved');
}
openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log('db successful');

};

// store the details in a personal collection, only will works for images atm
let store = objectStore => {
    let transaction = db.transaction(`${objectStore}`,'readwrite');
    let items = transaction.objectStore(`${objectStore}`);
    let item = {
        id: 1,
        title: imageTitle,
        explanation: imageDetails,
        blob: imageUrl,
    }
    let request = items.add(item);

    request.onsuccess = () => {
        console.log('item added to the store', request.result)
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