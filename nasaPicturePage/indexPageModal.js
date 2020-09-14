let root = document.documentElement;
let modal = document.querySelector('#modalDiv');
let modalImg = document.querySelector('#modalImg');
let modalDetails = document.querySelector('#information');
let modalQualityChange = document.getElementById('qualityChange');
let modalFullscreen = document.querySelector('#fullscreen');
let modalClose = document.querySelector('.close');
let modalRotate = document.querySelector('#rotateImage')
let date = document.querySelector('#imageDate')
let modalTitle = document.getElementById('imageTitle');

const createModal =  (e) => {
    if(!e.target.classList.contains('remove') && e.target.localName == "img"){
        modal.style.display = "block";
            modalImg.src = imageUrl;
            modalImg.alt = imageTitle;
            date.textContent = imageDate;
            modalTitle.textContent = imageTitle;
            modalDetails.textContent = imageDetails;
            modalImg.setAttribute('data-hdSrc', photoDetails.hdurl);
            modalImg.setAttribute('data-stdSrc', photoDetails.url);

    };
}
image.addEventListener('click', e=>createModal(e))
modalImg.addEventListener('click', ()=> modal.style.display = "none")


function ImageQualityChange(reset, element){
    console.log('quality change clicked');
    if(modalImg.classList.contains('hd') || reset == true){
        modalImg.src = imageUrl;
        element.textContent = "HD Version";
        modalImg.classList.remove('hd');
    } else{
        modalImg.src = imageHdUrl;
        element.textContent = "SD Version";
        modalImg.classList.add('hd');
    }
}



let rotationValue = 0;
//rotates image by 90degrees when clicked
modalRotate.addEventListener('click', ()=>{
    rotationValue = (rotationValue+90)%360; 
    root.style.setProperty('--rotation-value', rotationValue + "deg");
    
    //used to stretch image to fill whole page when rotated 90 or 270degrees
    if((rotationValue/90)%2){
        modalImg.classList.add('stretchFullscreen');
    }else{
        modalImg.classList.remove('stretchFullscreen');
    }
})

modalQualityChange.addEventListener('click', e=>{
   ImageQualityChange(false, e.target);
})

modalClose.addEventListener('click',() =>{
    modal.style.display = 'none'; 
    //resets Image Quality button
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
        rotationValue = 0;
        modalImg.classList.remove('stretchFullscreen')

    }
});