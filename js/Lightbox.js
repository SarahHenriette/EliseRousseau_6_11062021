class Lightbox {
    constructor(namePhotographe, listMedias){
        this.namePhotographe = namePhotographe
        this.listMedias = listMedias
        this.lightbox = document.getElementById("lightboxModal")
        this.lightboxBtnClose = document.querySelector("#lightboxModal .lightbox-close")
        this.lightboxBtnLeft = document.querySelector("#lightboxModal .lightbox-arrow_left")
        this.lightboxBtnRight = document.querySelector("#lightboxModal .lightbox-arrow_right")
        this.mediasDisplay = document.querySelectorAll(".media-src")
        this.emplacementImageLightbox = document.querySelector('.lightbox-media_image')
        this.emplacementNameImageLightbox = document.querySelector('.lightbox-media_name')
        this.index = 0
        this.displayLightbox()
        this.closeLightbox()
        this.arrowNext() 
        this.arrowPrevious()
    }

    closeLightbox(){
        this.lightboxBtnClose.addEventListener("click", ()=>{
            this.lightbox.style.display= "none"
    
        })
    } 

    arrowNext() {
        this.lightboxBtnRight.addEventListener("click", ()=> {
            console.log("next")
            this.changeDisplay(this.index + 1, this.listMedias[this.listMedias.length-1], -1)
        })
    }

    arrowPrevious() {
        this.lightboxBtnLeft.addEventListener("click", ()=> {
            console.log("previous")
            this.changeDisplay(this.index - 1, this.listMedias[0], this.listMedias.length)
        })
    }

    changeDisplay(addition, endList , newValueIndex){
        this.index = addition
        this.emplacementNameImageLightbox.innerHTML = this.listMedias[this.index].title
        this.mediaImageOrVideo(this.listMedias[this.index])
        if(this.listMedias[this.index] == endList){
            this.index = newValueIndex
            console.log(this.index)
        }
    }

    displayLightbox(){
        this.mediasDisplay.forEach(media => {
            media.addEventListener("click", (e)=>{
                this.lightbox.style.display= "block"
                for (let index = 0; index < this.listMedias.length; index++) {
                    const element = this.listMedias[index];
                    if(element.id == e.target.id) {
                        this.index= index
                        this.emplacementNameImageLightbox.innerHTML = element.title
                        this.mediaImageOrVideo(element)
                    }
                }
            })
        });
    }

    mediaImageOrVideo(media){
        if(media.image) {
            console.log("image")
            let baliseImg = document.createElement("img")
            baliseImg.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ media.image)
            baliseImg.setAttribute("id", media.id)
            this.emplacementImageLightbox.replaceChild(baliseImg, this.emplacementImageLightbox.firstElementChild, )
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