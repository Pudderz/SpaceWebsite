let collection = document.querySelector('.collection');
let allImage = document.querySelector('ul'); 
let modal = document.querySelector('#modalDiv');
let modalImg = document.querySelector('#modalImg');
let details = document.querySelector('#information');
let title = document.getElementById('imageTitle');
let date = document.getElementById('imageDate');
let modalClose = document.querySelector('.close');
let modalFullscreen = document.querySelector('#fullscreen');
let search = document.querySelector('#search-bar');
let remove = document.querySelector('#remove')
let modalRemoveButton = document.getElementById("delete");
let db;

let createImages = photoCollection =>{
    if(photoCollection.length == 0){
        collection.innerHTML = '<p>You have no images in your collection</p>';
    } else{
        photoCollection.forEach(element => {
            let image = document.createElement('img');
            let li = document.createElement('li');
            image.src = element.url;
            image.alt = element.title;
            image.loading = 'lazy';
            image.classList.add('searchResult');
            li.appendChild(image);
            collection.appendChild(li);
        });
    }   
} 

let searchImages = () =>{
    let imageList = document.querySelectorAll('.searchResult');
        search.addEventListener('keydown', (element) =>{
            imageList.forEach(image => {
                if(!(image.alt.toLowerCase().includes(element.target.value.toLowerCase()))){
                    image.parentElement.style.display="none"
                }else{
                    image.parentElement.style.display="flex";
                }
            })
        });

}

let removeObjectStoreItem = (itemName, itemLocation, storeName) => {
    let transaction = db.transaction(storeName,'readwrite');
    let items = transaction.objectStore(storeName);
    let request = items.delete(itemName);
    request.onsuccess = () =>{
        console.log('Successfully removed');
        itemLocation.remove();

    }
    request.onerror = ()=>{
        console.log(request.error);
    }
}


collection.addEventListener('click', e => {
    console.log(e.target.classList.contains('remove'))
    if(!e.target.classList.contains('remove') &&e.target.localName == "img"){
        modal.style.display = "block";
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
    } else if(e.target.classList.contains('remove') && e.target.localName == "img"){
        removeObjectStoreItem(e.target.alt, e.target.parentElement, 'imageSaved');
    }
    
});




remove.addEventListener('click',()=> {
    let removePhotos = document.querySelectorAll('.searchResult');
    remove.classList.toggle('removing');
    if(remove.classList.contains('removing')){
        remove.textContent = "Cancel Removing"
        removePhotos.forEach(e=>{
            e.classList.add("remove");
        })    
    }else{
        remove.textContent = "Remove an image"
        removePhotos.forEach(e =>{  
            e.classList.remove("remove");
        });    
    }
});

modalRemoveButton.addEventListener('click',()=>{
    let imageRemoving = document.querySelector(`.collection [alt="${modalImg.alt}"]`);
    removeObjectStoreItem(imageRemoving.alt, imageRemoving.parentElement, 'imageSaved');
    modal.style.display= "none";
})
modalClose.addEventListener('click',() =>{
    modal.style.display = 'none';   
});
modalFullscreen.addEventListener('click', ()=>{
    
})


let tabs = document.querySelector('#tabs');
tabs.addEventListener('click', e=>{
    console.log(e.target);
})

function getCollection(storeType){
    let transaction = db.transaction(storeType, 'readonly');
    let objectStore = transaction.objectStore(storeType);
    let request = objectStore.getAll()
    request.onsuccess = () => {
        if(storeType =="imageSaved"){
            createImages(request.result);
            searchImages();
            } else if(storeType =="asteroidsSaved"){
            displayAsteroids(request.result);
            }
        
        }
    request.onerror = () =>{
        console.log('items could not be viewed', request.error);
    }
};

//Asteroid Gallery section
let ol = document.querySelector('ol');
let displayAsteroids = data =>{
        data.forEach( e => {
            let content = document.createElement('li');

            let detailInput = document.createElement('button');
            detailInput.classList.add("details");
            detailInput.textContent = "more details";
            detailInput.id = e.id;

            let remove = document.createElement('button');
            remove.classList.add('removeAsteroid');
            remove.textContent = "remove from collection";

            let details = document.createElement('div');
            details.classList.add("information");
            details.setAttribute('id', e.id);
            details.innerHTML = `<p class="size"> Size:${e.absolute_magnitude_h}</p>
            <p class="approachDate">Close approach date: ${e.close_approach_Date}</p>`;
            
            content.innerHTML = `<h4 class="name">${e.title}</h4>`;

            let diameter = document.createElement('p');
            diameter.textContent = `Estimated diameter in meters: Min:${e.diameterMin} Max:${e.diameterMax}`;
            diameter.classList.add('diameter');

            let url = document.createElement('a');
            url.classList.add('url');
            url.href= `${e.url}`;
            url.textContent= "More Details...";
            url.target = "_blank";

            let speed = document.createElement('p');
            speed.textContent = `Speed: ${e.speed}mph`;
            speed.classList.add('speed');

            details.appendChild(speed)
            details.appendChild(diameter);
            details.appendChild(url);
            content.appendChild(details);
            content.appendChild(detailInput);
            content.appendChild(remove);
            ol.appendChild(content);
        });

    
};


ol.addEventListener('click', (e)=>{
    if(e.target.classList.contains('removeAsteroid')){
        removeObjectStoreItem(e.target.parentElement.childNodes[0].textContent, e.target.parentElement, 'asteroidsSaved');
    }

})


//Preset collection




//Video Collection

