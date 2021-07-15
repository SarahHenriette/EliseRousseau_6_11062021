class Lightbox {
    constructor(namePhotographe, listMedias){
        this.namePhotographe = namePhotographe
        this.listMedias = listMedias
        this.lightbox = document.getElementById("lightboxModal")
        this.lightboxBtnClose = document.querySelector("#lightboxModal .lightbox-close")
        this.lightboxBtnLeft = document.querySelector("#lightboxModal .lightbox-arrow_left")
        this.lightboxBtnRight = document.querySelector("#lightboxModal .lightbox-arrow_right")
        this.mediasDisplay = document.querySelectorAll(".media-src")
        this.mediasLink = document.querySelectorAll(".media-header_img")
        this.emplacementImageLightbox = document.querySelector('.lightbox-media_image')
        this.emplacementNameImageLightbox = document.querySelector('.lightbox-media_name')
        this.main = document.getElementById("photographer")
        this.index = 0
        this.displayLightbox()
        this.clickCloseLightbox()
        this.arrowNext() 
        this.arrowPrevious()
        console.log(this.mediasDisplay)
    }

    keyup(media) {
        document.addEventListener("keyup", (e)=> {
            if(e.key == "ArrowRight") {
                this.changeDisplay(this.index + 1, this.listMedias[this.listMedias.length-1], -1)
            }
            if(e.key == "ArrowLeft") {
                this.changeDisplay(this.index - 1, this.listMedias[0], this.listMedias.length)
            }
            if(e.key == "Escape") {
                // this.closeLightbox()
                document.querySelector("#lightboxModal .lightbox").blur()
                this.closeLightbox()
                media.focus()
                console.log( media)
            }
        })
    }
    clickCloseLightbox(){
        this.lightboxBtnClose.addEventListener("click", ()=>{
            this.closeLightbox()
        })
    }
    closeLightbox(){
            this.lightbox.style.display= "none"
            this.main.setAttribute("aria-hidden", "false")
            this.lightbox.setAttribute("aria-hidden", "true")
    } 

    arrowNext() {
        this.lightboxBtnRight.addEventListener("click", ()=> {
            // console.log("next")
        this.changeDisplay(this.index + 1, this.listMedias[this.listMedias.length-1], -1)
        })
    }

    arrowPrevious() {
        this.lightboxBtnLeft.addEventListener("click", ()=> {
            // console.log("previous")
            this.changeDisplay(this.index - 1, this.listMedias[0], this.listMedias.length)
        })
    }

    changeDisplay(addition, endList , newValueIndex){
        // console.log(this.index)
        this.index = addition
        if(this.listMedias[this.index] == this.listMedias[this.listMedias.length]){
            this.index = 1
            // console.log(this.index)
        }
        this.emplacementNameImageLightbox.innerHTML = this.listMedias[this.index].title
        this.mediaImageOrVideo(this.listMedias[this.index])
        if(this.listMedias[this.index] == endList){
            this.index = newValueIndex
            // console.log(this.index)
        }
    }

    displayLightbox(){
        this.mediasDisplay.forEach(media => {
            media.addEventListener("click", (e)=>{
                this.lightbox.style.display= "block"
                this.main.setAttribute("aria-hidden", "true")
                this.lightbox.setAttribute("aria-hidden", "false")
                this.displayMedia(e.target.id)
                this.keyup(media)
            })
       
        });
        this.mediasLink.forEach(media => {
            media.addEventListener("keyup", (eventKey)=> {
                console.log(media)
                this.main.setAttribute("aria-hidden", "true")
                this.lightbox.setAttribute("aria-hidden", "false")
                if(eventKey.key == "Enter") {
                    media.blur()
                    this.lightbox.style.display= "flex"
                    document.querySelector("#lightboxModal .lightbox").focus()
                    this.lightbox.setAttribute("tabindex", "1")
                    this.displayMedia(media.querySelector(".media-src").id)
                    this.keyup(media)
                }
            })
        })
    }

    displayMedia(id) {
        for (let index = 0; index < this.listMedias.length; index++) {
            const element = this.listMedias[index];
            if(element.id == id) {
                this.index= index
                console.log(this.index)
                let createBaliseImg = document.createElement('img')
                createBaliseImg.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ element.image)
                this.emplacementImageLightbox.appendChild(createBaliseImg)
                this.emplacementNameImageLightbox.innerHTML = element.title
                this.mediaImageOrVideo(element)
            }
        }
    }
    mediaImageOrVideo(media){
        if(media.image) {
            // console.log("image")
            let baliseImg = document.createElement("img")
            baliseImg.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ media.image)
            baliseImg.setAttribute("id", media.id)
            baliseImg.setAttribute("tabindex", "0")
            this.emplacementImageLightbox.replaceChild(baliseImg, this.emplacementImageLightbox.firstElementChild)
        }else if (media.video){  
            console.log("video")
            let baliseVideo = document.createElement("video")
            let baliseVideoSrc = document.createElement("source")
            baliseVideo.setAttribute("controls", "")
            baliseVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ media.video)
            this.emplacementImageLightbox.replaceChild(baliseVideo, this.emplacementImageLightbox.firstElementChild)
            baliseVideo.appendChild(baliseVideoSrc)
        }
    }
}