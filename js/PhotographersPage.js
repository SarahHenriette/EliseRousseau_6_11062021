console.log(window.location.search)
let paramSearch = window.location.search
let id = paramSearch.replace("?id=", "")
let dataPhotograph 
let mediaPhotograph = []

let firstName = document.querySelector('.photographerHeader-text_name')
let city = document.querySelector('.photographerHeader-text_city')
let slogan = document.querySelector('.photographerHeader-text_slogan')
let tags = document.querySelector('.photographerHeader-text_tags')
let image = document.querySelector('.photographerHeader-img img')



//recup des donnes json
fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }
}).then(datas => {
    //recup infos photograph
    for(let data of datas.photographers){
        if(data.id == parseInt(id)) {
            dataPhotograph = data
        }
    }
    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            mediaPhotograph.push(data)
        }
    }
    firstName.innerHTML = dataPhotograph.name
    city.innerHTML = dataPhotograph.city + ", " + dataPhotograph.country
    slogan.innerHTML = dataPhotograph.tagline
    dataPhotograph.tags.forEach(tag => {
        let liSpan = document.createElement("li")
        let span = document.createElement("span")
        span.setAttribute("aria-label", tag)
        span.classList.add("btnTags")
        span.innerHTML = "#" + tag
        tags.appendChild(liSpan)
        liSpan.appendChild(span)
    });
    image.setAttribute("src" , "../img/PhotographIDPhoto/"+ dataPhotograph.portrait)
}).catch((err) => {
    console.log(err)
})

//Gére la redirection lorsque je clique sur l'un tags
setTimeout(() => {
    console.log(dataPhotograph)
    let tagsAll = document.querySelectorAll(".btnTags")
    for (let index = 0; index < tagsAll.length; index++) {
        let tag = tagsAll[index];
        tag.addEventListener("click", (e)=> {
         document.location.href = "../index.html?tag="+ e.target.ariaLabel 
        })
    }
}, 500);