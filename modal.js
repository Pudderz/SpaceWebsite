let modalInput = document.querySelectorAll('img');
let usersCollection = document.querySelector('.collection');
let modal = document.querySelector('#modalDiv');
let modalImg = document.querySelector('#modalImg');
let modalDetails = document.querySelector('#information');
let modalQualityChange = document.getElementById('qualityChange');
let modalFullscreen = document.querySelector('#fullscreen');
let modalClose = document.querySelector('.close');
let modalRotate = document.querySelector('#rotateImage')
let date = document.getElementById('imageDate');
let modalRemoveButton = document.getElementById("delete");


const createModal =  (e, ObjectStoreName) => {
    if(!e.target.classList.contains('remove') && e.target.localName == "img"){
        modal.style.display = "block";
        getItem(ObjectStoreName, e.target.alt, photoDetails => {
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
        removeObjectStoreItem(e.target.alt, e.target.parentElement, ObjectStoreName);
    }
    
};

presetCollection.addEventListener('click', e=>createModal(e, 'presetImages'))
usersCollection.addEventListener('click', e=>createModal(e, 'imageSaved'));


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
    if(imageCollection.style.display == "none"&& presetImages.style.display == "block"){
        let imageRemoving = document.querySelector(`#presetCollection [alt="${modalImg.alt}"]`);
        console.log('current')
        modal.style.display= "none";
        removeObjectStoreItem(imageRemoving.alt, imageRemoving.parentElement, 'presetImages');
    }else{
        console.log('else');
        let imageRemoving = document.querySelector(`.collection [alt="${modalImg.alt}"]`);
        removeObjectStoreItem(imageRemoving.alt, imageRemoving.parentElement, 'imageSaved');
        modal.style.display= "none";
    }
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
        modalImg.classList.add('stretchFullscreen');
    }else{
        modalImg.classList.remove('stretchFullscreen');
        // modalImg.style['max-width'] = "100%";
        // modalImg.style['max-height']= "100%";
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
        modalImg.classList.remove('stretchFullscreen')

    };
});