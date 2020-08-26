
let navMorph = document.querySelector('.navBackground');
let navButton = document.querySelector('.container');
let menu = document.querySelector('#menu')
let apiKey = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2"
let changeBegan, changeCompleted = 0;
let nav = document.querySelector('#nav');
let title = document.querySelector('#header');
let timeForm = document.querySelector('form');
let imageTitle ='';
let imageDetails = '';
let imageUrl='';
let imageHdUrl='';
let photoDetails = document.getElementById('photoDetails');
let displayDetails = document.getElementById('displayDetails')
let photoDiv = document.querySelector('.daily-image')
let changeImageQuality =document.querySelector('#changeQuality');
let type ="";
let deleteImage = document.querySelector('#deleteImage');
let image = document.querySelector('#image');

let changeNav = (x) =>{
    x.classList.toggle('change');
    
}
let morphing = anime({
    targets: navMorph,
    d:[
        {value: "M795 525V472H729V495.67V525H760.807H795Z"},
        {value: "M1498.5 999V1H0V423V999H744.5H1498.5Z"},
    ],
    easing: 'easeInOutQuad',
    duration: 500,
    autoplay: false,
    loop: 1, 

    changeBegin: function(){
        changeBegan++;
        console.log('animation began');
        if(!(changeBegan%2)){
            menu.classList.remove('showing');
            console.log('removed')
        }
        nav.style.display = 'inline';
    },

    changeComplete: function() {
        changeCompleted++;
        console.log('completed')
          if(changeCompleted%2){
            menu.classList.add('showing');
            console.log('added');
        } else{
            nav.style.display = 'none';
            console.log('none');
        }
    },
    loopComplete: function(){
        morphing.reverse();
        console.log('loopComplete ran');
    }
});   

navButton.addEventListener('click', ()=>{
    console.log('clicked');
    morphing.play();
})

//Get current day to set date.max and start fetching current date image
let nasaPhotoDate = (() =>{
    let date = new Date().toISOString().split('T')[0]
    let photoDate = document.querySelector('#nasaPhotoDate');
    let inputDate = document.getElementById('inputDate');
    photoDate.textContent = `Nasa's Picture of ${date}`;
    inputDate.setAttribute('max', date )
    return date;
})();

let fetchRequest = async (date, hdBool)=>{
    let photo = document.querySelector('#image');
    let details = document.querySelector('#details');
    let iframe = document.querySelector('#iframe');
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}&hd=${hdBool}`;
    let response = await fetch(url, {
    });
    let parsed = await response.json();
        details.textContent = parsed.explanation;
    if(parsed.media_type =="image"){
        photo.style.display = "block";
        iframe.parentElement.style.display= "none";
        iframe.src=""; // stops video playing
        photo.setAttribute('src', parsed.url);
        photo.setAttribute('alt', `${parsed.title}`);  
        imageHdUrl = parsed.hdurl;
        type = "image";
        title.textContent = imageTitle;
    }else if (parsed.media_type =="video"){
        console.log(parsed.innerHTML);
        photo.style.display = "none";
        iframe.parentElement.style.display = "block";
        iframe.src = parsed.url;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.title = parsed.title;
        imageHdUrl = parsed.url;
        type ="video"
    }  
    imageTitle = parsed.title;
    imageUrl = parsed.url;
    imageDetails = parsed.explanation;
    imageDate=date;
}


function qualityChange(){
    if(!changeImageQuality.classList.contains('hd')){
        changeImageQuality.textContent = "SD version";
        image.src = imageHdUrl;
    }else{
        image.src = imageUrl;
        changeImageQuality.textContent = "HD version";
    }
    changeImageQuality.classList.toggle('hd');
}


fetchRequest(nasaPhotoDate, true);
timeForm.addEventListener('submit', e =>{
    e.preventDefault();
    fetchRequest(e.target[0].value, false);
    changeImageQuality.classList.add('hd');
    qualityChange();
});


displayDetails.addEventListener('click', e =>{
    e.target.classList.toggle('show');
    if(e.target.className.includes('show')){
        photoDetails.style.display='block';
        e.target.textContent = 'Hide details';
        height = document.documentElement.scrollHeight
        window.scroll({
            top: height,
            left:0,
            behavior: 'smooth',
        })
    } else{
        photoDetails.style.display = 'none';
        e.target.textContent = 'Photo details';
    }
})

changeImageQuality.addEventListener('click', ()=> qualityChange())



let store = () => {
    console.log(image.alt);
    let objectStore = (type =="image")? "imageSaved": "videoSaved";
    if(!(image.alt =='placeholder image') || type =="video"){
        let transaction = db.transaction(`${objectStore}`,'readwrite');
        let items = transaction.objectStore(`${objectStore}`);
        let item = {
            title: imageTitle,
            date:imageDate,
            explanation: imageDetails,
            url: imageUrl,
            hdurl: imageHdUrl,
        };
        let request = items.add(item, imageTitle);

        request.onsuccess = () => {
            console.log('item added to the store', request.result);
        }
        request.onerror = () => {
            console.log('item could not be added to the store', request.error);
        }
    }else{
        console.log('No image');
    }
    
}


deleteImage.addEventListener('click', (e) => {
    let objectStore = (type == "image")? "imageSaved": "videoSaved";
    let transaction = db.transaction(objectStore, 'readwrite');
    let items = transaction.objectStore(objectStore);
    let request = items.delete(imageTitle);
    request.onsuccess = () => console.log(`${type} removed from your collection`);
    request.onerror = () => console.log(`${type} could not be removed from the store ${request.error}`);
})


function callback(){
    let saved = document.querySelector('#saveImage');
    saved.addEventListener('click', () => {
        store(); 
    });
}