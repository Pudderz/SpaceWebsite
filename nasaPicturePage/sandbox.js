
let navMorph = document.querySelector('.navBackground');
let navButton = document.querySelector('.container');
let menu = document.querySelector('#menu')
let nasaLink = document.getElementById('nasaLink')
let title = document.querySelector('#header');
let changeDate = document.querySelector('#inputDate');
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
let previousDay = document.querySelector('#previousDay');
let nextDay = document.querySelector('#nextDay');


//Get current day to set date.max and start fetching current date image
let nasaPhotoDate = (() =>{
    let date = new Date().toISOString().split('T')[0]
    let photoDate = document.querySelector('#nasaPhotoDate');
    let inputDate = document.getElementById('inputDate');
    photoDate.textContent = `Nasa's Picture of ${date}`;
    inputDate.setAttribute('max', date );
    inputDate.setAttribute('value', date);
    checkDateButtons(date, false);
    return date;
})();

let fetchRequest = async (date, hdBool)=>{
    let apiKey = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
    let photo = document.querySelector('#image');
    let details = document.querySelector('#details');
    let iframe = document.querySelector('#iframe');
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}&hd=${hdBool}`;
    let response = await fetch(url, {
    });
    let parsed = await response.json();
        details.textContent = parsed.explanation;
        console.log(parsed);
    imageTitle = parsed.title;
    imageUrl = parsed.url;
    imageDetails = parsed.explanation;
    imageDate= date;    
    if(parsed.media_type =="image"){
        photo.style.display = "block";
        changeImageQuality.style.display = "block";
        iframe.parentElement.style.display= "none";
        iframe.src=""; // stops video playing
        photo.setAttribute('src', parsed.url);
        photo.setAttribute('alt', `${parsed.title}`);  
        imageHdUrl = parsed.hdurl;
        type = "image";
        title.textContent = imageTitle;
    }else if (parsed.media_type =="video"){
        console.log(parsed);
        photo.style.display = "none";
        changeImageQuality.style.display = "none";
        iframe.parentElement.style.display = "block";
        iframe.src = parsed.url;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.title = parsed.title;
        imageHdUrl = parsed.url;
        type ="video"
    }  
    
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
};
changeImageQuality.addEventListener('click', ()=> qualityChange());






//Changing Date input field on the page 

function checkDateButtons(date ,testlower){
    let currentDate = new Date;
    let testDate = new Date(date);
    nextDay.style.display = 
        (testDate.setDate(testDate.getDate() + 1) > currentDate)?
        "none": "block";
    if(testlower){
        const lowerBound = new Date('1995-06-16');  
        previousDay.style.display = 
            (testDate.setDate(testDate.getDate() - 2) < lowerBound)?
            "none": "block";
    }
}

function changeNasaLink(date){
    let linkDate = new Date(date)
    let month = linkDate.getMonth()+1;
    if(month.toString().length==1){month = `0${month}`}
    const day = linkDate.getDate();
    //year is in a two digit format
    const regex = /\d\d$/i;
    let year = linkDate.getFullYear();
    year = year.toString().match(regex);
    console.log('the year is '+year)
    //https://apod.nasa.gov/apod/ap200912.html
    nasaLink.href = `https://apod.nasa.gov/apod/ap${year}${month}${day}.html`;
}

changeDate.addEventListener('change', e =>{
    fetchRequest(e.target.value, false);
    checkDateButtons(changeDate.value, true);
    //This is to reset the quality button
    changeImageQuality.classList.add('hd');
    qualityChange();
    changeNasaLink(e.target.value);
});
previousDay.addEventListener('click', ()=>{
    choosenDay = new Date(changeDate.value);
    choosenDay.setDate(choosenDay.getDate() - 1);
    changeDate.value = choosenDay.toISOString().split('T')[0]; 
    let createChangeEvent = new Event('change');
    changeDate.dispatchEvent(createChangeEvent);
});
nextDay.addEventListener('click', e=>{
    choosenDay = new Date(changeDate.value);
    choosenDay.setDate(choosenDay.getDate() + 1);
    changeDate.value = choosenDay.toISOString().split('T')[0];
    //creates change event
    let createChangeEvent = new Event('change');
    changeDate.dispatchEvent(createChangeEvent);
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



let store = () => {
    console.log(`Storing item ${image.alt}`);
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

fetchRequest(nasaPhotoDate, true);

function finishedIndexedDB(){
    let saved = document.querySelector('#saveImage');
    saved.addEventListener('click', () => {
        store(); 
    });
};