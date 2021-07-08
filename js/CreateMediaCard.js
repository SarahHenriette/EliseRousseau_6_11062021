//récuperation de l'id du photograph
let parameterSearch = window.location.search
let idP = parameterSearch.replace("?id=", "")

class CreateMediaCard {
    constructor(){
        // this.dataMedia = data
        this.main = document.querySelector("#mediasList")
        this.media = document.createElement('article')
        this.mediaHeader = document.createElement('header')
        this.mediaHeaderLinkImage = document.createElement('a')
        this.mediaHeaderImage = document.createElement('img')
        this.mediaFooter = document.createElement('footer')
        this.mediaName = document.createElement('p')
        this.mediaNumberLike = document.createElement('p')
        this.mediaButtonLike = document.createElement('div')
        this.attributionClass()
        this.attributionAttribute()
        this.integrationTextElement()
        this.rattachElementDOM()
    }

    attributionClass(){
        this.media.classList.add("media")
        this.mediaHeader.classList.add("media-header")
        this.mediaHeaderLinkImage.classList.add("media-header_img")
        this.mediaFooter.classList.add("media-footer")   
        this.mediaName.classList.add("media-footer_name")
        this.mediaNumberLike.classList.add("media-footer_numberLike")
        this.mediaButtonLike.classList.add("media-footer_buttonLike")
    }

    attributionAttribute(){
        this.mediaHeaderLinkImage.setAttribute("href", "#")
        this.mediaHeaderImage.setAttribute("src", "../img/Mimi/Portrait_Nora.jpg")
    }

    integrationTextElement(){
        this.mediaName.innerHTML = "NAME"
        this.mediaNumberLike.innerHTML = "12" 
    }

    rattachElementDOM(){
        this.main.appendChild(this.media)
        this.media.appendChild(this.mediaHeader)
        this.media.appendChild(this.mediaFooter)
        this.mediaHeader.appendChild(this.mediaHeaderLinkImage)
        this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)
        this.mediaFooter.appendChild(this.mediaName)
        this.mediaFooter.appendChild(this.mediaNumberLike)
        this.mediaFooter.appendChild(this.mediaButtonLike)
    }
}



//recup des donnes json
fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }
}).then(datas => {
    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(idP)) {
            new CreateMediaCard(data)
            // mediaPhotograph.push(data)
        }
    }
}).catch((err) => {
    console.log(err)
})