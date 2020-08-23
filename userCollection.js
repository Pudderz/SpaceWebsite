let collection = document.querySelector('.collection');

let db;
let allImage = document.querySelector('ul'); 
let modal = document.querySelector('#modalDiv');
let modalImg = document.querySelector('#modalImg');
let details = document.querySelector('#information');
let title = document.getElementById('imageTitle');
let date = document.getElementById('imageDate');
let close = document.querySelector('.close');
let search = document.querySelector('#search-bar');


let createImages = (photoCollection) =>{
    if(photoCollection.length == 0){
        collection.innerHTML = '<p>You have no images in your collection</p>';
    } else{
        photoCollection.forEach(element => {
            let image = document.createElement('img');
            image.src = element.url;
            image.alt = element.title;
            image.classList.add('searchResult')
            let li = document.createElement('li');
            li.appendChild(image);
            collection.appendChild(li)
        });
    }   
} 

let searchImage = () =>{
    let imageList = document.querySelectorAll('.searchResult');
        search.addEventListener('keyup', (element) =>{
            imageList.forEach(image => {
                if(!(image.alt.toLowerCase().includes(element.target.value.toLowerCase()))){
                    image.parentElement.style.display="none"
                }else{
                    image.parentElement.style.display="flex";
                }
            })
        });

}

let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = () => {
    let db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
}

openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log('db successful');
    console.log('db:'+ db);

    let grabImage = (() =>{
        console.log('ad')
    console.log('db:'+ db)
    let transaction = db.transaction('imageSaved', 'readonly');
    let objectStore = transaction.objectStore('imageSaved');
    let request = objectStore.getAll()
    request.onsuccess = () => {
        console.log('items viewed', request.result);
        let photoCollection = request.result;
        createImages(photoCollection);
        searchImage();
    }
    request.onerror = () =>{
        console.log('items could not be viewed', request.error);
        }
    })();

     
};




let imageClick = allImage.addEventListener('click', e => {
    if(e.target.localName == "img"){
        modal.style.display = "block";
        console.log(e);
        let transaction = db.transaction('imageSaved', 'readonly');
        let objectStore = transaction.objectStore('imageSaved');
        let request = objectStore.get(e.target.alt);
        request.onsuccess = () => {
            console.log('item viewed', request.result);
            let photoDetails = request.result;
            console.log(photoDetails)
            modalImg.src = photoDetails.url;
            modalImg.alt = photoDetails.title;
            date.textContent = photoDetails.date;
            title.textContent = photoDetails.title;
            details.textContent = request.result.explanation;
        }
        request.onerror = () =>{
            console.log('item could not be viewed', request.error);
        }
    }
});

close.addEventListener('click',() =>{
    modal.style.display = 'none';
    
});

