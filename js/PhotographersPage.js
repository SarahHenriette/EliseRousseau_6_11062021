//récuperation de l'id du photograph
let paramSearch = window.location.search
let id = paramSearch.replace("?id=", "")
let namePhotographe 
let listMedias = []
let likes = 0
//recup des donnes json
fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }
}).then(datas => {
    //recup infos photograph
    for(let data of datas.photographers){
        if(data.id == parseInt(id)) {
            // console.log(data)
            new CreateCardHeader(data)
            namePhotographe = data.name
            new Formulaire(data.name)
            document.querySelector('.pricePhotograph').innerHTML = data.price
        }
    }

    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
            listMedias.push(data)
            likes = data.likes
        }
    }

    //créer les medias cards
    for(let media of listMedias.sort((a, b)=>{
        return a.likes - b.likes; //trie le tableau selon la popumarité
    }).reverse()) {
        new CreateMediaCard(media, namePhotographe) 
    }

    //permet de trier les media cards selon la popularité, la date ou le titre
    new sortBy( listMedias, namePhotographe)
    
    //Gére l'indentation des likes
    new IncrementeLikes(likes)

    //lightbox
     new Lightbox(namePhotographe, listMedias)
}).catch((err) => {
    console.log(err)
})

