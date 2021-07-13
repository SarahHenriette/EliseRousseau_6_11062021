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
    // let lightbox = document.getElementById("lightboxModal")
    // let lightboxBtnClose = document.querySelector("#lightboxModal .lightbox-close")
    // lightboxBtnClose.addEventListener("click", ()=>{
    //     lightbox.style.display= "none"

    // })

    // let medias = document.querySelectorAll(".media-src")
    // let imageLightbox = document.querySelector('.lightbox-media_image')
    // function mediaImageOrVideo(media){
    //     if(media.image) {
    //         console.log("image")
    //         let baliseImg = document.createElement("img")
    //         baliseImg.setAttribute("src", "../img/"+ namePhotographe +"/"+ media.image)
           
    //         imageLightbox.replaceChild(baliseImg, imageLightbox.firstElementChild)
    //     }else if (media.video){
    //         console.log("video")
    //         let baliseVideo = document.createElement("video")
    //         let baliseVideoSrc = document.createElement("source")
    //         baliseVideo.setAttribute("controls", "")
    //         baliseVideoSrc.setAttribute("src", "../img/"+ namePhotographe +"/"+ media.video)
           
    //         // imageLightbox.appendChild(baliseVideo)
    //         imageLightbox.replaceChild(baliseVideo, imageLightbox.firstElementChild)

    //         baliseVideo.appendChild(baliseVideoSrc)
    //     }
    // }
    // medias.forEach(media => {
    //     media.addEventListener("click", (e)=>{
    //         lightbox.style.display= "block"
    //         for (let index = 0; index < listMedias.length; index++) {
    //             const element = listMedias[index];
    //             // console.log(element)
    //             if(element.id == e.target.id) {
    //                 // console.log(element)
    //                 mediail(element)
    //             }
    //         }
    //     })
    // });
}).catch((err) => {
    console.log(err)
})

