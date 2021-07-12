//récuperation de l'id du photograph
let paramSearch = window.location.search
let id = paramSearch.replace("?id=", "")
let namePhotographe 

//recup des donnes json
fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }
}).then(datas => {
    //recup infos photograph
    for(let data of datas.photographers){
        if(data.id == parseInt(id)) {
            console.log(data)
            new CreateCardHeader(data)
            namePhotographe = data.name
            new Formulaire(data.name)
            document.querySelector('.pricePhotograph').innerHTML = data.price
        }
    }
    let listMedias = []
    let likes = 0
    // let btnLike = document.querySelectorAll('.media footer .media-footer_buttonLike')
  
    function compareNombres(a, b) {
        return a.likes - b.likes;
    }
    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
            listMedias.push(data)
            likes = likes + data.likes
        }
    }
    document.querySelector('.totalLikes').innerHTML = likes

    //créer les medias cards
    for(let media of listMedias.sort(compareNombres).reverse()) {
        new CreateMediaCard(media, namePhotographe) 
    }
    //permet de trier les media cards selon la popularité, la date ou le titre
    new sortBy( listMedias, namePhotographe)

    //Gére l'indentation des likes
    let btnLike = document.querySelectorAll('.media footer .media-footer_buttonLike')
    //au click du btn like j'incrémente le nbr de like de un 
    btnLike.forEach(element => {
        element.addEventListener("click", ()=> {
            likes = likes + 1
            //ajoute 1 à la baniere rose
            document.querySelector('.totalLikes').innerHTML = likes
            //ajoute 1 à la photo
            element.parentElement.querySelector(".media-footer_numberLike").innerHTML = parseInt(element.parentElement.querySelector(".media-footer_numberLike").innerHTML)+1
        })
    });


    



}).catch((err) => {
    console.log(err)
})

//Gére la redirection lorsque je clique sur l'un tags
setTimeout(() => {
    let tagsAll = document.querySelectorAll(".btnTags")
    for (let index = 0; index < tagsAll.length; index++) {
        let tag = tagsAll[index];
        tag.addEventListener("click", (e)=> {
         document.location.href = "../index.html?tag=" + e.target.attributes["aria-label"].value
        })
    }
}, 500);


