class Lightbox {
    constructor(namePhotographe, listMedias){
        this.namePhotographe = namePhotographe
        this.listMedias = listMedias
        this.lightbox = document.getElementById("lightboxModal")
        this.lightboxBtnClose = document.querySelector("#lightboxModal .lightbox-close")
        this.lightboxBtnLeft = document.querySelector("#lightboxModal .lightbox-arrow_left")
        this.lightboxBtnRight = document.querySelector("#lightboxModal .lightbox-arrow_right")
        this.listMediasDOM = document.querySelectorAll(".media-src")
        this.emplacementImageLightbox = document.querySelector('.lightbox-media_image')
        this.emplacementNameImageLightbox = document.querySelector('.lightbox-media_name')
        this.main = document.getElementById("photographer")
        this.index = 0
        this.media = ""
        this.displayLightbox()
        this.arrowNext() 
        this.arrowPrevious()
        this.keyup(this.media)
        this.closeLightbox()

    }
    //Gère les touches du clavier (echappe, fleche gauche et droite)
    keyup() {
        document.addEventListener("keyup", (e)=> {
            if(e.key === "ArrowRight") {
                this.changeDisplay(this.index + 1)
            }
            if(e.key === "ArrowLeft") {
                this.changeDisplay(this.index - 1)            
            }
            if(e.key == "Escape") {
                if(this.media !== ""){
                    document.querySelector("#lightboxModal .lightbox").blur()
                    this.lightbox.style.display= "none"
                    this.main.setAttribute("aria-hidden", "false")
                    this.lightbox.setAttribute("aria-hidden", "true")
                    // this.media.focus()
                }
            }
        })
    }

    //ferme le carrousel/lightbox 
    closeLightbox(){
        this.lightboxBtnClose.addEventListener("click", ()=>{
            this.lightbox.style.display= "none"
            this.main.setAttribute("aria-hidden", "false")
            this.lightbox.setAttribute("aria-hidden", "true")
        })
    }

    //Gére le bouton droite/suivant de la lightbox
    arrowNext() {
        this.lightboxBtnRight.addEventListener("click", ()=> {
        this.changeDisplay(this.index + 1)
        })
    }

    //Gére le bouton gauche/précédent de la lightbox
    arrowPrevious() {
        this.lightboxBtnLeft.addEventListener("click", ()=> {
            this.changeDisplay(this.index - 1)
        })
    }

    //permet de changer le contenu de la lightbox
    changeDisplay(addition){
        if(this.media !== "") {
            this.index = addition
            if(this.index == this.listMedias.length){
                this.index = 0
            }
            if(this.index == -1){
                this.index = this.listMedias.length-1
            }
            this.emplacementNameImageLightbox.innerHTML = this.listMedias[this.index].title
            this.mediaImageOrVideo(this.listMedias[this.index])
        }
    }

    //permet d'afficher la lightbox
    displayLightbox(){
        this.listMediasDOM.forEach(media => {
            let btn = media.parentElement
            btn.addEventListener("click", ()=>{
                btn.blur()//enleve le focus du media
                this.lightbox.style.display= "block"
                document.querySelector("#lightboxModal .lightbox").focus()//met le focus sur la lightbox
                this.main.setAttribute("aria-hidden", "true")
                this.lightbox.setAttribute("aria-hidden", "false")
                this.media = btn
                this.displayMedia(media.id)//affiche l'image ou la video 
            })
        });
    }

    //Grâce au ID je récupére le bon media parmis la liste medias et l'affiche dans la lightbox 
    displayMedia(id) {
        for (let index = 0; index < this.listMedias.length; index++) {
            const element = this.listMedias[index];
            if(element.id == id) {
                this.index= index
                this.mediaImageOrVideo(element)
                this.emplacementNameImageLightbox.innerHTML = element.title
            }
        }
    }
    
    //affiche soit une image soit une video
    mediaImageOrVideo(media){
        if(media.image) {
            let baliseImg = document.createElement("img")
            baliseImg.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ media.image)
            baliseImg.setAttribute("id", media.id)
            baliseImg.setAttribute("tabindex", "0")
            this.emplacementImageLightbox.replaceChild(baliseImg, this.emplacementImageLightbox.firstElementChild)
        }else if (media.video){  
            let baliseVideo = document.createElement("video")
            let baliseVideoSrc = document.createElement("source")
            baliseVideo.setAttribute("controls", "")
            baliseVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ media.video)
            this.emplacementImageLightbox.replaceChild(baliseVideo, this.emplacementImageLightbox.firstElementChild)
            baliseVideo.appendChild(baliseVideoSrc)
        }
    }
}