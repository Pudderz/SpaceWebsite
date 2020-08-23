let api = "2A1UmguNwvSeRTvmHlZ5rXbsFErb3EH8Nu3YPJI2";
let info;
let div = document.querySelector('div');
let displayAsteroids = (data) =>{
    console.log(data);
    for(date in data){
        let array = data[date];
        array.forEach(e=>{
            let content = document.createElement('p');
            content.textContent = `name: ${e.name} id: ${e.id} size:${e.absolute_magnitude_h}`
            console.log(content);
            div.appendChild(content);

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