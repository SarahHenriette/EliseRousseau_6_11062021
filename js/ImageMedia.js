
class ImageMedia {
    constructor(namePhotographe , data){
            this.data = data
            this.namePhotographe = namePhotographe
            this.main = document.querySelector("#mediasList")
            this.createElementImage()
            this.attributionClass()
            this.attributionAttribute()
            this.integrationTextElement()
            this.rattachElementDOM()
    }

    createElementImage() {
        this.media = document.createElement('article')
        this.mediaHeader = document.createElement('header')
        this.mediaHeaderLinkMedia = document.createElement('a')
        this.mediaFooter = document.createElement('footer')
        this.mediaName = document.createElement('p')
        this.mediaNumberLike = document.createElement('p')
        this.mediaButtonLike = document.createElement('div')
        this.mediaHeaderImage = document.createElement('img')
    }

    //Attribution des class aux éléments créer
    attributionClass(){
        this.media.classList.add("media")
        this.mediaHeader.classList.add("media-header")
        this.mediaHeaderLinkMedia.classList.add("media-header_img")
        this.mediaFooter.classList.add("media-footer")   
        this.mediaName.classList.add("media-footer_name")
        this.mediaNumberLike.classList.add("media-footer_numberLike")
        this.mediaButtonLike.classList.add("media-footer_buttonLike")
        this.mediaHeaderImage.classList.add("media-src")
    }

    //Attribution des attributs aux éléments créer
    attributionAttribute(){
        this.mediaHeaderLinkMedia.setAttribute("href", "#")
        this.mediaHeaderLinkMedia.setAttribute("aria-hidden", "true")

        this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.data.image)
        // this.mediaHeaderImage.setAttribute("tabindex", "0")
        this.mediaHeaderImage.setAttribute("alt", this.data.alt)
        this.mediaHeaderImage.setAttribute("id", this.data.id)
        // this.mediaName.setAttribute("tabindex", "0")
        // this.mediaNumberLike.setAttribute("tabindex", "0")
        // this.mediaButtonLike.setAttribute("tabindex", "0")
        this.mediaButtonLike .setAttribute("aria-label", "likes")
    }

    //Integration des text dans les elements
    integrationTextElement(){
        this.mediaName.innerHTML = this.data.title
        this.mediaNumberLike.innerHTML = this.data.likes
    }

    //Rattachement des elements dans le DOM
    rattachElementDOM(){
        this.main.appendChild(this.media)
        this.media.appendChild(this.mediaHeader)
        this.media.appendChild(this.mediaFooter)
        this.mediaHeader.appendChild(this.mediaHeaderLinkMedia)
        this.mediaHeaderLinkMedia.appendChild(this.mediaHeaderImage)
        this.mediaFooter.appendChild(this.mediaName)
        this.mediaFooter.appendChild(this.mediaNumberLike)
        this.mediaFooter.appendChild(this.mediaButtonLike)
    }
}
