let api = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
let info;
let db;
let ul = document.querySelector('ul');
let startDate = '';
let endDate = '';
let information = document.getElementById('list');

let displayAsteroids = data =>{
    console.log(data);
    
    for(date in data){
        
        let newDate = document.createElement('h3');
        newDate.textContent = date;
        ul.appendChild(newDate);

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

function callback(){
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
i+=2;
getDate(i);
fetchAsteroids(startDate, endDate);

