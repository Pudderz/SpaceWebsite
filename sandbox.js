
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
    rotate: anime.stagger([-360, 360]),
    autoplay: false,
    loop: 1, 

    update: function(anim){
        console.log('progress : '+Math.round(anim.progress)+'%');
    },
    changeBegin: function(){
        changeBegan++;
        console.log('animation began');
        if(!(changeBegan%2)){
            menu.classList.remove('showing');
            console.log('removed')
        }
        nav.style.display = 'inline';
        console.log('inline');
        
        
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
        console.log('loopComplete ran')
    }
});   

navButton.addEventListener('click', ()=>{
    console.log('clicked')
    morphing.play();
})

let nasaPhotoDate = (() =>{
    let date = new Date();
    console.log(date);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let photoDate = document.querySelector('#nasaPhotoDate');
    console.log(photoDate.innerHTML)
    console.log(photoDate.textContent)
    photoDate.textContent = `Nasa's Picture of ${day}/${month}/${year}`;
    console.log(photoDate.innerHtML);
    console.log(photoDate.textContent);
    if(month.length==1){
        month = `0${month}`;
    }
    
    return `${year}-${month}-${day}`
})();

let fetchRequest = async (date, hdBool)=>{
    let photo = document.querySelector('#image');
    let details = document.querySelector('#details');
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}&hd=${hdBool}`;
    let response = await fetch(url, {
    });
    let parsed = await response.json();
    console.log(parsed);
    details.textContent = parsed.explanation;
    photo.setAttribute('src', parsed.url);
    photo.setAttribute('alt', `${parsed.title}`);  
    imageTitle = parsed.title;
    imageUrl = parsed.url;
    imageDetails = parsed.explanation;
    title.textContent = imageTitle;  
}


fetchRequest(nasaPhotoDate, true);

timeForm.addEventListener('submit', e =>{
    e.preventDefault();
    console.log(e.target[0].value);
    fetchRequest(e.target[0].value, false)
});


