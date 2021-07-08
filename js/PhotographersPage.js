//récuperation de l'id du photograph
let paramSearch = window.location.search
let id = paramSearch.replace("?id=", "")

class CreateCardHeader {
    constructor (data) {
        console.log(data)
        this.dataPhotograph = data
        this.firstName = document.querySelector('.photographerHeader-text_name')
        this.city = document.querySelector('.photographerHeader-text_city')
        this.slogan = document.querySelector('.photographerHeader-text_slogan')
        this.tags = document.querySelector('.photographerHeader-text_tags')
        this.image = document.querySelector('.photographerHeader-img img')
        this.infosPhotograph()
        this.tagsPhotograph()
        this.portraitPhotograph()
    }

    infosPhotograph() {
        this.firstName.innerHTML = this.dataPhotograph.name
        this.city.innerHTML = this.dataPhotograph.city + ", " + this.dataPhotograph.country
        this.slogan.innerHTML = this.dataPhotograph.tagline
    }

    tagsPhotograph() {
        this.dataPhotograph.tags.forEach(tag => {
            let liSpan = document.createElement("li")
            let span = document.createElement("span")
            span.setAttribute("aria-label", tag)
            span.classList.add("btnTags")
            span.innerHTML = "#" + tag
            this.tags.appendChild(liSpan)
            liSpan.appendChild(span)
        });
    }

    portraitPhotograph () {
        this.image.setAttribute("src" , "../img/PhotographIDPhoto/"+ this.dataPhotograph.portrait)
    } 
}

class CreateMediaCard {
    constructor(data, namePhotographe){
        this.dataMedia = data
        console.log(this.dataMedia)

        this.namePhotographe = namePhotographe
        this.main = document.querySelector("#mediasList")
        this.media = document.createElement('article')
        this.mediaHeader = document.createElement('header')
        this.mediaHeaderLinkImage = document.createElement('a')
        if(this.dataMedia.image){
            console.log("image")
            this.mediaHeaderImage = document.createElement('img')
            this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.image)
            this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)

        }else if (this.dataMedia.video){
            console.log("video")
            this.mediaHeaderVideo = document.createElement('video')
            this.mediaHeaderVideoSrc = document.createElement('source')

            this.mediaHeaderVideo.setAttribute("controls", "")
            this.mediaHeaderVideo.setAttribute("poster", "../img/EllieRose/Sport_Jump.jpg")

            this.mediaHeaderVideo.classList.add("media-header_video")
            this.mediaHeaderLinkImage.appendChild(this.mediaHeaderVideo)
            this.mediaHeaderVideo.appendChild(this.mediaHeaderVideoSrc)
            this.mediaHeaderVideo.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.video)


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
        // this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.image)
        // this.mediaHeaderVideo.setAttribute("controls", "")
    }

    integrationTextElement(){
        this.mediaName.innerHTML = this.dataMedia.title
        this.mediaNumberLike.innerHTML = this.dataMedia.likes
    }

    rattachElementDOM(){
        this.main.appendChild(this.media)
        this.media.appendChild(this.mediaHeader)
        this.media.appendChild(this.mediaFooter)
        this.mediaHeader.appendChild(this.mediaHeaderLinkImage)
        // this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)
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
    let namePhotographe 
    //recup infos photograph
    for(let data of datas.photographers){
        if(data.id == parseInt(id)) {
            new CreateCardHeader(data)
            namePhotographe = data.name
        }
    }
    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            
            // namePhotographe =  namePhotographe.split("-")[0].split(" ")[0]
                namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
   
            console.log(namePhotographe)
            new CreateMediaCard(data, namePhotographe)
            // console.log(namePhotographe.split("-")[0].split(" ")[0])
            // mediaPhotograph.push(data)
        }
    }
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