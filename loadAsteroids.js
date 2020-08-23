let api = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
let info;
let ul = document.querySelector('ul');
let displayAsteroids = (data) =>{
    console.log(data);
    
    for(date in data){
        let array = data[date];
        array.forEach(e=>{
            let detailInput = document.createElement('input');
            detailInput.type ="button";
            detailInput.classList.add ="details";
            detailInput.value = "more details";
            let save = document.createElement('input');
            save.type ="button";
            save.value = "save to collection";
            let content = document.createElement('li');
            content.innerHTML = `name: ${e.name} id: ${e.id} size:${e.absolute_magnitude_h} 
            ${e.close_approach_data[0].close_approach_date_full}`;
            detailInput.id = e.id;
            console.log(content);
            ul.appendChild(content);
            ul.appendChild(detailInput);
            ul.appendChild(save);
        })
    }
    
}


let fetchAsteroids = async() =>{
    console.log('running');
    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${api}`
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data.near_earth_objects);
            info = data.near_earth_objects;
            displayAsteroids(info)
        })
        .catch(e => console.log(e.error))
}

fetchAsteroids();