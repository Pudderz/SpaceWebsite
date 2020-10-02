let root = document.documentElement;
let search = document.querySelector('#imageSearch');
let collection = document.querySelector('.collection');
let presetCollection = document.querySelector('#presetCollection') 
let imageSearch = document.querySelector('#search-bar');
let asteroidSearch = document.querySelector('#searchAsteroid')
let remove = document.querySelector('#remove')
let tabs = document.querySelector('#tabs');
let imageCollection = document.querySelector('#imageCollection');
let videoCollection = document.querySelector('#videoCollection');
let asteroidCollection = document.querySelector('#asteroidCollection');
let presetImages = document.querySelector('#imagePreset');
let asteroidsLoaded = false;
let presetLoaded = false;
let videosLoaded = false;
let db;


let createImages = (photoCollection, location) =>{
    let fragment = document.createDocumentFragment();
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
            fragment.appendChild(li);
        }); 
        //placeholder at the end of the list to stop the last image 
        //from stretching to fill the entire space
            let li = document.createElement('li');
            li.classList.add('placeholderLine');
        fragment.appendChild(li);
        location.appendChild(fragment);
        
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


const removeObjectStoreItem = (itemName, itemLocation, storeName) => {
    const transaction = db.transaction(storeName,'readwrite');
    const items = transaction.objectStore(storeName);
    const request = items.delete(itemName);
    request.onsuccess = () =>{
        console.log('Successfully removed');
        itemLocation.remove();

    }
    request.onerror = ()=>{
        console.log(request.error);
    }
}

const getItem = (storeName, itemName, callback) =>{
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(itemName);
    request.onsuccess = () => {
        callback(request.result);
    }
    request.onerror = () =>{
        console.log('item could not be viewed', request.error);
    }
}

let ol = document.querySelector('ol');
//Asteroid Gallery section
const checkIfEmpty=()=>{
    console.log(ol.childNodes.length)
    let emptyAsteroid = document.querySelector('#emptyAsteroidCollection');
    if(ol.childNodes.length===0){
        emptyAsteroid.style.display = "block";
    }else{
        emptyAsteroid.style.display = "none";
    }
}



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


let displayAsteroids = data =>{
        
        data.forEach( e => {
            let content = document.createElement('li');
            content.setAttribute('id', e.title);
            content.classList.add('asteroidSearchResult');
            let detailInput = document.createElement('button');
            detailInput.classList.add("details");
            detailInput.textContent = "More details";
            detailInput.id = e.id;

            let remove = document.createElement('button');
            remove.classList.add('removeAsteroid');
            remove.textContent = "Remove from collection";

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
            content.appendChild(detailInput);
            content.appendChild(remove);
            details.appendChild(speed)
            details.appendChild(diameter);
            details.appendChild(url);
            content.appendChild(details);
            ol.appendChild(content);
        });

    searchAsteroids();
    checkIfEmpty(data);
};

ol.addEventListener('click', e  => {
    if(e.target.classList.contains('removeAsteroid')){
        removeObjectStoreItem(e.target.parentElement.childNodes[0].textContent, e.target.parentElement, 'asteroidsSaved');
        
    } else if(e.target.classList.contains('details')){
        e.target.parentElement.childNodes[3].classList.toggle('showing')
        if(e.target.parentElement.childNodes[3].classList.contains('showing')){
            e.target.parentElement.childNodes[3].style.display="block";
            e.target.textContent = "Hide Details"
        } else{
            e.target.parentElement.childNodes[3].style.display="none";
            e.target.textContent = "Show Details";
        }
        
    }

})




//Preset collection




//Video Collection
function displayVideo(content){
    let fragment = new DocumentFragment();
    let videoList = document.querySelector('#videoList')
    if(content.length == 0){
        let emptyVideo = document.querySelector('#emptyVideoCollection');
        emptyVideo.style.display = "block";
    }
    content.forEach(e=>{
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
        iframe.allow="fullscreen"

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
function finishedIndexedDB(){
    getCollection('imageSaved', (result)=>{
        createImages(result, collection);
        searchImages();
    });

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
            search.style.display = "block";
            break;
        case "asteroidCollectionTitle":
            asteroidCollection.style.display = "block";
            search.style.display = "none";
            //loads object store if not loaded already
            if(!asteroidsLoaded){
                getCollection('asteroidsSaved', (result)=>{
                    console.log('asteroids loaded');
                    displayAsteroids(result);
                })
                asteroidsLoaded = true;
            }
            
            break;
        case "presetCollectionTitle":
            presetImages.style.display = "block";
            search.style.display = "block";
            if(!presetLoaded){
                getCollection('presetImages', (result)=>{
                    createImages(result, presetCollection);
                    searchImages();
                });
               presetLoaded = true;
            }
            break;
        case "videoCollectionTitle":
            videoCollection.style.display = "block";
            search.style.display = "none";
            if(!videosLoaded){
                getCollection('videoSaved', (result)=>{
                console.log('videos loaded');
                displayVideo(result);
            });
                videosLoaded = true;
            }
            
        }
    });

}



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


