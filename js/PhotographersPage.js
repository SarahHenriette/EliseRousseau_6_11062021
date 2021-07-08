//récuperation de l'id du photograph
let paramSearch = window.location.search
let id = paramSearch.replace("?id=", "")
let namePhotographe 


//creer la card header de la page photographe
class CreateCardHeader {
    constructor (data) {
        // console.log(data)
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

//créer la card media de la page photographe
class CreateMediaCard {
    constructor(data, namePhotographe){
        this.dataMedia = data
        this.namePhotographe = namePhotographe
        this.main = document.querySelector("#mediasList")
        this.media = document.createElement('article')
        this.mediaHeader = document.createElement('header')
        this.mediaHeaderLinkImage = document.createElement('a')
        if(this.dataMedia.image){
            this.mediaHeaderImage = document.createElement('img')
            this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.image)
            this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)

        }else if (this.dataMedia.video){
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
        this.mediaFooter.appendChild(this.mediaName)
        this.mediaFooter.appendChild(this.mediaNumberLike)
        this.mediaFooter.appendChild(this.mediaButtonLike)
    }
}

class Formulaire {
    constructor (data) {
        this.btnContactMe = document.getElementById("btnContactMe")
        this.formulaire = document.getElementById("formulaire")
        this.formulaireNamePhotograph = document.getElementById("formulaire-namePhotographe")
        this.data = data
        this.firstname= document.querySelector("#prenom")
        this.lastname= document.querySelector("#nom")
        this.email= document.querySelector("#email")
        this.message= document.querySelector("#message")
        this.regexEmail=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.regexMessage = /^.{10,35}$/
        this.regexMin = /^.{2,35}$/
        this.formulaireName()
        this.addEvent(this.firstname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        this.addEvent(this.lastname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        this.addEvent(this.email, this.regexEmail, "Veuillez entrer une adresse mail valide.")
        this.addEvent(this.message, this.regexMessage, "Veuillez entrer 10 caractères ou plus pour le champ du prénom.")
        this.submitForm()
        this.btnClose= document.querySelector(".formulaire-close")
        this.closeForm()
        this.openForm()
    }

    formulaireName() {
        this.formulaireNamePhotograph.innerHTML = this.data
    }

    submitForm(){
        this.formulaire.addEventListener("submit", (e)=> {
            e.preventDefault()
            if( this.regexMin.test(this.firstname.value) &&
                this.regexMin.test(this.lastname.value) &&
                this.regexEmail.test(this.email.value) &&
                this.regexMessage.test(this.message.value)){
                    let data = {
                        "prenom": this.firstname.value,
                        "nom":  this.lastname.value,
                        "email": this.email.value,
                        "message": this.message.value
                    }
                    //affichage des valeurs du form
                    console.log(data)

                    //reset le form
                    e.target.reset()
                    const textControl = document.querySelectorAll(".text-control")
                    textControl.forEach(element => {
                        element.classList.remove("success")
                    });
        
                }
            })
    }

    closeForm() {
        this.btnClose.addEventListener("click", ()=>{
            this.formulaire.style.display= "none"
        })
    }

    openForm() {
        this.btnContactMe.addEventListener("click", ()=>{
            this.formulaire.style.display= "block"
        })
    }

    addEvent(first, regex, textMsgErreur){
        first.addEventListener("keyup", function(){
            let msgErreur = first.parentNode.childNodes[5]
            if(regex.test(first.value)) {
                success(first, msgErreur)
            }else {
                error(first, textMsgErreur, msgErreur )
            }
        })
        function success(element, smallError) {
            element.classList.add("success")
            element.classList.remove("error") 
            smallError.style.display="none" //supprime le msg d'erreur 
        }

        function error(element, messageError, smallError) {
            element.classList.add("error")
            element.classList.remove("success")
            smallError.style.display="block" //affiche le msg d'erreur 
            smallError.innerHTML= messageError
        }
    }

}

//recup des donnes json
fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }
}).then(datas => {
    //recup infos photograph
    for(let data of datas.photographers){
        if(data.id == parseInt(id)) {
            new CreateCardHeader(data)
            namePhotographe = data.name
            new Formulaire(data.name)

        }
    }
    //recup media photograph
    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
            new CreateMediaCard(data, namePhotographe)
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
