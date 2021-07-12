//créer la card media de la page photographe
class CreateMediaCard {
    constructor(data, namePhotographe){
        this.dataMedia = data
        this.namePhotographe = namePhotographe
        this.main = document.querySelector("#mediasList")
        this.media = document.createElement('article')
        this.mediaHeader = document.createElement('header')
        this.mediaHeaderLinkImage = document.createElement('a')
        //si le media contient une image alors je créer la balise img
        //sinon le media contion une video je créer la balise video 
        if(this.dataMedia.image){
            this.mediaHeaderImage = document.createElement('img')
            this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.image)
            this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)
            this.mediaHeaderImage.classList.add("media-src")


        }else if (this.dataMedia.video){
            this.mediaHeaderVideo = document.createElement('video')
            this.mediaHeaderVideoSrc = document.createElement('source')
            this.mediaHeaderVideo.classList.add("media-header_video")
            this.mediaHeaderLinkImage.appendChild(this.mediaHeaderVideo)
            this.mediaHeaderVideo.appendChild(this.mediaHeaderVideoSrc)
            this.mediaHeaderVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.video)
            this.mediaHeaderVideo.classList.add("media-src")

        }
        this.mediaFooter = document.createElement('footer')
        this.mediaName = document.createElement('p')
        this.mediaNumberLike = document.createElement('p')
        this.mediaButtonLike = document.createElement('div')
        this.attributionClass()
        this.attributionAttribute()
        this.integrationTextElement()
        this.rattachElementDOM()
      
    }

    //Attribution des class aux éléments créer
    attributionClass(){
        this.media.classList.add("media")
        this.mediaHeader.classList.add("media-header")
        this.mediaHeaderLinkImage.classList.add("media-header_img")
        this.mediaFooter.classList.add("media-footer")   
        this.mediaName.classList.add("media-footer_name")
        this.mediaNumberLike.classList.add("media-footer_numberLike")
        this.mediaButtonLike.classList.add("media-footer_buttonLike")
    }

    //Attribution des attributs aux éléments créer
    attributionAttribute(){
        this.mediaHeaderLinkImage.setAttribute("href", "#")
    }

    //Integration des text dans les elements
    integrationTextElement(){
        this.mediaName.innerHTML = this.dataMedia.title
        this.mediaNumberLike.innerHTML = this.dataMedia.likes
    }

    //Rattachement des elements dans le DOM
    rattachElementDOM(){
        this.main.appendChild(this.media)
        this.media.appendChild(this.mediaHeader)
        this.media.appendChild(this.mediaFooter)
        this.mediaHeader.appendChild(this.mediaHeaderLinkImage)
        this.mediaFooter.appendChild(this.mediaName)
        this.mediaFooter.appendChild(this.mediaNumberLike)
        this.mediaFooter.appendChild(this.mediaButtonLike)
    }
}
