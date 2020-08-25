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
let remove = document.querySelector('#remove')
let modalRemoveButton = document.getElementById("delete");

let createImages = (photoCollection) =>{
    if(photoCollection.length == 0){
        collection.innerHTML = '<p>You have no images in your collection</p>';
    } else{
        photoCollection.forEach(element => {
            let image = document.createElement('img');
            image.src = element.url;
            image.alt = element.title;
            image.loading = 'lazy';
            image.classList.add('searchResult')
            let li = document.createElement('li');
            li.appendChild(image);
            collection.appendChild(li)
        });
    }   
} 

let searchImages = () =>{
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
    db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
}

openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
  
    let grabImage = (() =>{
    let transaction = db.transaction('imageSaved', 'readonly');
    let objectStore = transaction.objectStore('imageSaved');
    let request = objectStore.getAll()
    request.onsuccess = () => {
        console.log('items viewed', request.result);
        createImages(request.result);
        searchImages();
        deleteImage();
    }
    request.onerror = () =>{
        console.log('items could not be viewed', request.error);
        }
    })();

     
};

function deleteImage(e){
    collection.addEventListener('click', e=>{
        if(e.target.classList.contains('remove') && e.target.localName == "img"){
            let key = e.target.alt;
            console.log(e);
            let transaction = db.transaction('imageSaved', 'readwrite');
            let items = transaction.objectStore('imageSaved');
            console.log(key);
            let request = items.delete(key);
            request.onsuccess = () => {
                console.log('item removed from the store')
                e.target.parentElement.remove();
            };
            request.onerror = () => console.log('item could not be removed from the store', request.error);
        }
    });
};

let imageClick = allImage.addEventListener('click', e => {
    console.log(e.target.classList.contains('remove'))
    if(!e.target.classList.contains('remove') &&e.target.localName == "img"){
    
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
        removePhotos.forEach(e =>{  
            e.classList.remove("remove");
        })
    });    
    }
    
   
})

modalRemoveButton.addEventListener('click',()=>{
    deleteImage(e);
})



let tabs = document.querySelector('#tabs');
tabs.addEventListener('click', (e)=>{
    console.log(e.target);
})


//Asteroid Gallery section
let displayAsteroids = data =>{
        let ol = document.querySelector('ol');
        data.forEach( e => {
            let content = document.createElement('li');

            let detailInput = document.createElement('button');
            detailInput.classList.add("details");
            detailInput.textContent = "more details";
            detailInput.id = e.id;

            let save = document.createElement('button');
            save.classList.add('save');
            save.textContent = "save to collection";

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
            content.appendChild(save);
            content.appendChild(remove);
            ol.appendChild(content);
        });

    
};

let asteroid = document.querySelector('#list');
let getAsteroids = () => {
    let transaction = db.transaction('asteroidsSaved','readonly');
    let items = transaction.objectStore('asteroidsSaved');
    let request = items.getAll();
    request.onsuccess = () =>{
        console.log(request.result);
        displayAsteroids(request.result);
    }
    request.onerror = ()=>{
        console.log(request.error);
    }
}

let removeIndexedAsteroid = (asteroidName, itemRemoving) => {
    let transaction = db.transaction('asteroidsSaved','readwrite');
    let items = transaction.objectStore('asteroidsSaved');
    let request = items.delete(asteroidName);
    request.onsuccess = () =>{
        console.log('Successfully removed');
        itemRemoving.remove();

    }
    request.onerror = ()=>{
        console.log(request.error);
    }
}

asteroid.addEventListener('click', (e)=>{
    if(e.target.classList.contains('removeAsteroid')){
        removeIndexedAsteroid(e.target.parentElement.childNodes[0].textContent, e.target.parentElement);
    }

})


//Preset collection




//Video Collection

