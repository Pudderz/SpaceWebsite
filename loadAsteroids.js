let api = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
let info;
let db;
let ul = document.querySelector('ul');
let displayAsteroids = data =>{
    console.log(data);
    
    for(date in data){
        let array = data[date];
        array.forEach(e=>{
            let content = document.createElement('li');

            let detailInput = document.createElement('button');
            detailInput.classList.add("details");
            detailInput.textContent = "more details";
            detailInput.id = e.id;

            let save = document.createElement('button');
            save.classList.add('save');
            save.textContent = "save to collection";

            let remove = document.createElement('button');
            remove.classList.add('remove');
            remove.textContent = "remove from collection";

            let details = document.createElement('div');
            details.classList.add("information");
            details.setAttribute('id', e.id);
            let approachDate = e.close_approach_data[0].close_approach_date_full;
            details.innerHTML = `<p class="size" data-size="${e.absolute_magnitude_h}">Size:${e.absolute_magnitude_h}</p>
            <p class="approachDate" data-type="${approachDate}">Close approach date: ${approachDate}</p>`;
            
            content.innerHTML = `<h4 class="name">${e.name}</h4>`;

            let diameter = document.createElement('p');
            diameter.textContent = `Estimated diameter in meters: Min:${e.estimated_diameter.meters.estimated_diameter_min} Max:${e.estimated_diameter.meters.estimated_diameter_max} `
            diameter.setAttribute('data-min',e.estimated_diameter.meters.estimated_diameter_min);
            diameter.setAttribute('data-max', e.estimated_diameter.meters.estimated_diameter_max);
            diameter.classList.add('diameter');

            let url = document.createElement('a');
            url.classList.add('url');
            url.href= `${e.nasa_jpl_url}`;
            url.textContent= "More Details...";
            url.target = "_blank";

            let speed = document.createElement('p');
            speed.textContent = `Speed: ${e.close_approach_data[0].relative_velocity.miles_per_hour}mph`;
            speed.setAttribute('data-speed', e.close_approach_data[0].relative_velocity.miles_per_hour );
            speed.classList.add('speed');

            details.appendChild(speed)
            details.appendChild(diameter);
            details.appendChild(url);
            content.appendChild(details);
            content.appendChild(detailInput);
            content.appendChild(save);
            content.appendChild(remove);
            ul.appendChild(content);
        });
    }
    
};



let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = (e)=> {
    db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
}
openRequest.onerror = () => {
    console.log(openRequest.error);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log('db running')
    
    
}

let saveAsteroid = element => {
    console.log(element.childNodes);
            let date = document.querySelector('#photoDate')
            let transaction = db.transaction(`asteroidsSaved`,'readwrite');
            let items = transaction.objectStore(`asteroidsSaved`);
            let item = {
                title: element.childNodes[0].textContent,
                id:element.childNodes[1].attributes['id'].value,
                date: date.textContent,
                diameterMin: element.childNodes[1].childNodes[4].attributes[0].value,
                diameterMax: element.childNodes[1].childNodes[4].attributes[2].value,
                absolute_magnitude_h:element.childNodes[1].childNodes[0].attributes[1].value,
                close_approach_data:element.childNodes[1].childNodes[2].attributes[1].value,
                speed:element.childNodes[1].childNodes[3].attributes[0].value,
                url:element.childNodes[1].childNodes[5].href,
            }
            let request = items.add(item, element.childNodes[0].textContent);

            request.onsuccess = () => {
                console.log('item added to the store', request.result)
            }
            request.onerror = () => {
                console.log('item could not be added to the store', request.error)
            }
};

let removeAsteroid = key =>{
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

let moreDetails = ()=>{
    let information = document.getElementById('list');
    information.addEventListener('click', (e)=>{
        if(e.target.className =="details"){
            let div = e.target.parentElement.childNodes[1];
            if(div.style.display == "" || div.style.display == "none"){
                div.style.display = 'block';    
            } else{
                div.style.display = "none";
            }
        } else if(e.target.className =="save"){
            saveAsteroid(e.target.parentElement);
        } else if (e.target.className =="remove"){
            removeAsteroid(e.target.parentElement.childNodes[0].textContent);
        }
    })
};



function getDate(){
    let date = new Date();
    console.log(date)
    let day = date.getDate();
    let year = date.getFullYear();
    let month = `${date.getMonth()+1}`;
    if(month.length==1)month = `0${month}`;
    let photoDate = document.querySelector('#photoDate');
    photoDate.textContent = `${day}/${month}/${year}`;
    return `${year}-${month}-${day}`,`${year}-${month}-${day}`;
}

let fetchAsteroids = async(startdate,enddate) =>{
    console.log('running');
    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startdate}&end_date=2020-08-25&api_key=${api}`
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data.near_earth_objects);
            info = data.near_earth_objects;
            displayAsteroids(info);
            moreDetails();
        })
        .catch(e => console.log(e.error))
}


fetchAsteroids(getDate());