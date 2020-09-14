let api = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
let info;
let db;
let ul = document.querySelector('ul');
let startDate = '';
let endDate = '';
let information = document.getElementById('list');



var save = document.createElement('button');
save.classList.add('save');
save.textContent = "save to collection";
var remove = document.createElement('button');
remove.classList.add('remove');
remove.textContent = "remove from collection";
var item = document.createElement('p');
item.textContent = "loading";
var detailInput = document.createElement('button');
detailInput.classList.add("details");
detailInput.textContent = "more details";



let displayAsteroids = data =>{
    let fragment = new DocumentFragment();
    console.log(data);
    let loading = item.cloneNode(true);
    fragment.appendChild(loading);
    observer.observe(loading);
    
    for(date in data){
        
        let newDate = document.createElement('h3');
        newDate.textContent = date;
        fragment.appendChild(newDate);
        let asteroidNumber = document.createElement('h4');
        asteroidNumber.textContent = `${data[date].length} Asteroids Passing Today`;
        fragment.appendChild(asteroidNumber);
        
        let array = data[date];

        array.forEach(e => {
            let content = document.createElement('li');
            content.classList.add(date);
            let header = document.createElement('h3');
            header.textContent = e.name;
            header.classList.add('name');
            content.appendChild(header);

            let details = document.createElement('div');
            details.classList.add("information");
            details.setAttribute('id', e.id);
            
            
            let info = document.createElement('p');
            info.textContent = e.absolute_magnitude_h;
            info.setAttribute('data-size',e.absolute_magnitude_h);
            info.classList.add('size');
            details.appendChild(info);

            let approachDate = e.close_approach_data[0].close_approach_date_full;
            let closeAppoachDate = document.createElement('p');
            closeAppoachDate.textContent = approachDate;
            closeAppoachDate.setAttribute('data-type', approachDate);
            closeAppoachDate.classList.add('approachDate');
            details.appendChild(closeAppoachDate)
            
            let speed = document.createElement('p');
            speed.textContent = `Speed: ${e.close_approach_data[0].relative_velocity.miles_per_hour}mph`;
            speed.setAttribute('data-speed', e.close_approach_data[0].relative_velocity.miles_per_hour );
            speed.classList.add('speed');
            details.appendChild(speed);

            let diameter = document.createElement('p');
            diameter.textContent = `Estimated diameter in meters: Min:${e.estimated_diameter.meters.estimated_diameter_min} Max:${e.estimated_diameter.meters.estimated_diameter_max} `
            diameter.setAttribute('data-min',e.estimated_diameter.meters.estimated_diameter_min);
            diameter.setAttribute('data-max', e.estimated_diameter.meters.estimated_diameter_max);
            diameter.classList.add('diameter');
            details.appendChild(diameter);

            let url = document.createElement('a');
            url.classList.add('url');
            url.href= `${e.nasa_jpl_url}`;
            url.textContent= "More Details...";
            url.target = "_blank";
            details.appendChild(url);


            let saveItem = save.cloneNode(true);
            let removeItem = remove.cloneNode(true);
            let moreDetails = detailInput.cloneNode(true);
            moreDetails.setAttribute('id', e.id);

            content.appendChild(details);
            content.appendChild(moreDetails);
            content.appendChild(saveItem);
            content.appendChild(removeItem);
            fragment.appendChild(content);
        });

    }
    ul.appendChild(fragment);
};

function finishedIndexedDB(){
    var saveAsteroid = element => {
        let date = document.querySelector('#photoDate')
        let transaction = db.transaction(`asteroidsSaved`,'readwrite');
        let items = transaction.objectStore(`asteroidsSaved`);
        let item = {
            title: element.childNodes[0].textContent,
            id:element.childNodes[1].attributes['id'].value,
            date: element.className,
            diameterMin: element.childNodes[1].childNodes[3].attributes[0].value,
            diameterMax: element.childNodes[1].childNodes[3].attributes[1].value,
            absolute_magnitude_h:element.childNodes[1].childNodes[0].attributes[0].nodeValue,
            close_approach_data:element.childNodes[1].childNodes[1].attributes[0].value,
            speed:element.childNodes[1].childNodes[2].attributes[0].value,
            url:element.childNodes[1].childNodes[4].href,
        }
        let request = items.add(item, element.childNodes[0].textContent);

        request.onsuccess = () => {
            console.log('item added to the store', request.result)
        }
        request.onerror = () => {
            console.log('item could not be added to the store', request.error)
        }
    };
    var removeAsteroid = key =>{
        console.log(key);
        let transaction = db.transaction(`asteroidsSaved`, 'readwrite');
        let items = transaction.objectStore('asteroidsSaved');
        let request = items.delete(key);
        request.onsuccess = () =>{
            console.log('Item has been deleted from your collection');
        }
        request.onerror = () =>{
            console.log('Error, item has not deleted: ' + request.error)
        }

    }
    
    information.addEventListener('click', element => {
        if(element.target.className =="details"){
            console.log('more details')
            let div = element.target.parentElement.childNodes[1];
            let style = div.style.display;
            if(style == "" || style == "none"){
                div.style.display = "block";
                element.target.textContent = "Less Details";
            }else{
                div.style.display = "none";
                element.target.textContent = "More Details"
            }
            
        } else if(element.target.className =="save"){
            saveAsteroid(element.target.parentElement);
        } else if (element.target.className =="remove"){
            removeAsteroid(element.target.parentElement.childNodes[0].textContent);
        }
    })
}



function getDate(i){
    let date = new Date();
    date.setDate(date.getDate()-i)
    startDate = date.toISOString().split('T')[0];
    let endingDate = new Date();
    endingDate.setDate(endingDate.getDate() -i + 1);
    endDate = endingDate.toISOString().split('T')[0];
}

let fetchAsteroids = async(start,end) =>{
    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${api}`;
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            displayAsteroids(data.near_earth_objects);
        })
        .catch(e => console.log(e.error))
}

let i = 0;
getDate(i);
fetchAsteroids(startDate, endDate);

let observer = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0) {
        console.log(entries);
        observer.unobserve(entries[0].target);
        i+=2;
        getDate(i);
        fetchAsteroids(startDate, endDate);
        entries[0].target.style.display = "none";
    }
},{});
    
