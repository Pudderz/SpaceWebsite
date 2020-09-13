let root = document.documentElement;
let modal = document.querySelector('#modalDiv');
let modalImg = document.querySelector('#modalImg');
let modalDetails = document.querySelector('#information');
let modalQualityChange = document.getElementById('qualityChange');
let modalFullscreen = document.querySelector('#fullscreen');
let modalClose = document.querySelector('.close');
let modalRotate = document.querySelector('#rotateImage')
let date = document.getElementById('imageDate');
let modalRemoveButton = document.getElementById("delete");

let collection = document.querySelector('.collection');
let presetCollection = document.querySelector('.presetCollection') 
let title = document.getElementById('imageTitle');
let imageSearch = document.querySelector('#search-bar');
let asteroidSearch = document.querySelector('#searchAsteroid')
let remove = document.querySelector('#remove')

let imageCollection = document.querySelector('#imageCollection');
let videoCollection = document.querySelector('#videoCollection');
let asteroidCollection = document.querySelector('#asteroidCollection');
let presetImages = document.querySelector('#imagePreset');

let db;
console.log(modalQualityChange.textContent);

let createImages = (photoCollection, location) =>{
    if(photoCollection.length == 0){
        location.innerHTML = '<p>You have no images in your collection</p>';
    } else{
        photoCollection.forEach(element => {
            let image = document.createElement('img');
            let li = document.createElement('li');
            image.src = element.url;
            image.alt = element.title;
            image.loading = 'lazy';
            image.classList.add('searchResult');
            li.appendChild(image);
            location.appendChild(li);
        });
    }   
} 

function getCollection(storeName, callback){
    let transaction = db.transaction(storeName, 'readonly');
    let objectStore = transaction.objectStore(storeName);
    let request = objectStore.getAll()
    request.onsuccess = () => {
        callback(request.result)
    }
    request.onerror = () =>{
        console.log('items could not be viewed', request.error);
    }
};

let searchImages = () =>{
    let imageList = document.querySelectorAll('.searchResult');
        imageSearch.addEventListener('keydown', (element) =>{
            imageList.forEach(image => {
                if(!(image.alt.toLowerCase().includes(element.target.value.toLowerCase()))){
                    image.parentElement.style.display="none"
                }else{
                    image.parentElement.style.display="flex";
                }
            })
        });

};

let tabs = document.querySelector('#tabs');
tabs.addEventListener('click', e=>{
    let selectedCollection = document.querySelector('.selected')
    selectedCollection.classList.remove('selected');
    e.target.classList.add('selected');
    presetImages.style.display = "none";
    imageCollection.style.display = "none";
    asteroidCollection.style.display = "none";
    videoCollection.style.display = "none";
    switch(e.target.id){
        case "imageCollectionTitle":
            imageCollection.style.display = "block";
            break;
        case "asteroidCollectionTitle":
            asteroidCollection.style.display = "block";
            break;
        case "presetCollectionTitle":
            presetImages.style.display = "block";
            break;
        case "videoCollectionTitle":
            videoCollection.style.display = "block";
    }
});

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

let getItem = (storeName, itemName, callback) =>{
    let transaction = db.transaction(storeName, 'readonly');
        let objectStore = transaction.objectStore(storeName);
        let request = objectStore.get(itemName);
        request.onsuccess = () => {
            callback(request.result);
        }
        request.onerror = () =>{
            console.log('item could not be viewed', request.error);
        }
}

collection.addEventListener('click', e => {
    if(!e.target.classList.contains('remove') && e.target.localName == "img"){
        modal.style.display = "block";
        getItem('imageSaved', e.target.alt, photoDetails => {
            console.log(photoDetails);
            modalImg.src = photoDetails.url;
            modalImg.alt = photoDetails.title;
            date.textContent = photoDetails.date;
            title.textContent = photoDetails.title;
            modalDetails.textContent = photoDetails.explanation;
            //For changing the quality in modal
            modalImg.setAttribute('data-hdSrc', photoDetails.hdurl);
            modalImg.setAttribute('data-stdSrc', photoDetails.url);
        })
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

//Modal buttons
modalRemoveButton.addEventListener('click',()=>{
    let imageRemoving = document.querySelector(`.collection [alt="${modalImg.alt}"]`);
    removeObjectStoreItem(imageRemoving.alt, imageRemoving.parentElement, 'imageSaved');
    modal.style.display= "none";
});

function ImageQualityChange(reset, element){
    console.log('quality change clicked');
    let hdImage = modalImg.attributes['data-hdSrc'].value;
    let stdImage = modalImg.attributes['data-stdSrc'].value;
    if(modalImg.classList.contains('hd') || reset == true){
        modalImg.src = stdImage;
        element.textContent = "HD Version";
        modalImg.classList.remove('hd');
    } else{
        modalImg.src = hdImage;
        element.textContent = "SD Version";
        modalImg.classList.add('hd');
    }
}

let rotationValue = 0;
//rotates image by 90degrees when clicked
modalRotate.addEventListener('click', (e)=>{
    rotationValue = (rotationValue+90)%360; 
    root.style.setProperty('--rotation-value', rotationValue + "deg");
    console.log(rotationValue)

    //stretches image to fill whole page when rotated 90 or 180degrees
    if((rotationValue/90)%2){
        modalImg.style['max-width'] = "100vh";
        modalImg.style['max-height']= "100vw";
    }else{
        modalImg.style['max-width'] = "100%";
        modalImg.style['max-height']= "70%";
    }
    
})

modalQualityChange.addEventListener('click', e=>{
   ImageQualityChange(false, e.target);
})

modalClose.addEventListener('click',() =>{
    modal.style.display = 'none'; 
    ImageQualityChange(true, modalQualityChange);  
});




modalFullscreen.addEventListener('click', e => {
    console.log('fullscreen clicked')
    console.log(e.target.parentElement.parentElement.childNodes);
    let text = e.target.parentElement.parentElement.childNodes[5];
    let img = e.target.parentElement.parentElement.childNodes[3];
    text.classList.toggle('hidden');
    if(text.classList.contains('hidden')){
        text.style.display = "none";
        modalRotate.style.display="block";
        img.classList.add('positionCenter');
    }else {
        text.style.display = "block";
        modalRotate.style.display="none";
        img.classList.remove('positionCenter');
        //resets rotation of image
        root.style.setProperty('--rotation-value', 0 + "deg");
        modalImg.style['max-width'] = "100%";
        modalImg.style['max-height']= "70%";

    };
});
console.log(modalQualityChange);

//Asteroid Gallery section

let searchAsteroids = () =>{
    let asteroidList = document.querySelectorAll('.asteroidSearchResult');
    asteroidSearch.addEventListener('keyup', element =>{
        asteroidList.forEach(asteroid => {
            if(!(asteroid.attributes['id'].value.toLowerCase().includes(element.target.value.toLowerCase()))){
                asteroid.style.display="none";
            }else{
                asteroid.style.display="block";
            }
        })
    });
};

let ol = document.querySelector('ol');
let displayAsteroids = data =>{
        data.forEach( e => {
            let content = document.createElement('li');
            content.setAttribute('id', e.title);
            content.classList.add('asteroidSearchResult');
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
            details.innerHTML = `<p class="size"> Absolute magnitude(h):${e.absolute_magnitude_h}</p>
            <p class="approachDate">Close approach date: ${e.close_approach_data}</p>`;
            
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

    searchAsteroids();
};

ol.addEventListener('click', e  => {
    if(e.target.classList.contains('removeAsteroid')){
        removeObjectStoreItem(e.target.parentElement.childNodes[0].textContent, e.target.parentElement, 'asteroidsSaved');
    } else if(e.target.classList.contains('details')){
        e.target.parentElement.childNodes[1].classList.toggle('showing')
        if(e.target.parentElement.childNodes[1].classList.contains('showing')){
            e.target.parentElement.childNodes[1].style.display="block";
            e.target.textContent = "Hide Details"
        } else{
            e.target.parentElement.childNodes[1].style.display="none";
            e.target.textContent = "Show Details";
        }
        
    }

})




//Preset collection




//Video Collection
function displayVideo(content){
    let fragment = new DocumentFragment();
    let videoList = document.querySelector('#videoList')
    content.forEach((e, index)=>{
        let {title: videoTitle, date: videoDate, 
            explanation: videoDetails, url} = e; 
        let iframeTitle = document.createElement('h4');
        iframeTitle.textContent = videoTitle;
        let iframeDate = document.createElement('h5');
        iframeDate.textContent = videoDate;
        let iframeDetails = document.createElement('p');
        iframeDetails.textContent = videoDetails;

        let iframe = document.createElement('iframe');
        iframe.setAttribute('loading', 'lazy');
        iframe.src = url;
        iframe.title = videoTitle;
        iframe.allowfullscreen = true;

        let iframeDiv = document.createElement('div');
        iframeDiv.classList.add('iframeDiv');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteVideo');
        deleteButton.textContent = "Remove Video From Collection";

        let videoDetailsButton = document.createElement('button');
        videoDetailsButton.classList.add('videoDetails');
        videoDetailsButton.textContent = "Details";    
        
        let li = document.createElement('li');
        li.appendChild(iframeTitle);
        li.appendChild(iframeDate);
        iframeDiv.appendChild(iframe)
        li.appendChild(iframeDiv);
        li.appendChild(videoDetailsButton);
        li.appendChild(deleteButton);
        li.appendChild(iframeDetails);
        fragment.appendChild(li);
        

    });
    videoList.appendChild(fragment);
}
//Get Collections

//Runs as soon as indexedDb has finished setting up
function callback(){
    getCollection('imageSaved', (result)=>{
        createImages(result, collection);
        searchImages();
    });
    getCollection('videoSaved', (result)=>{
        console.log('videos loaded');
        displayVideo(result);
    });
    getCollection('asteroidsSaved', (result)=>{
        console.log('asteroids loaded');
        displayAsteroids(result);
    })
    //presetImages
    getCollection('presetImages', (result)=>{
        createImages(result, presetCollection);
    });

    
};

videoCollection.addEventListener('click', e=>{
    if(e.target.classList.contains('deleteVideo')){
        removeObjectStoreItem(e.target.parentElement.childNodes[2].childNodes[0].title, e.target.parentElement, 'videoSaved');
    } else if(e.target.classList.contains('videoDetails')){
        e.target.parentElement.childNodes[5].classList.toggle('show') 
        if(e.target.parentElement.childNodes[5].classList.contains('show')){
            e.target.parentElement.childNodes[5].style.display = "block";
        }else{
            e.target.parentElement.childNodes[5].style.display = "none";
        }
    }
})