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
            new CreateCardHeader(data)
            namePhotographe = data.name
            new Formulaire(data.name)
        }
    }
    let list = []
    function compareNombres(a, b) {
        return a.likes - b.likes;
    }
    //recup media photograph

    for(let data of datas.media){
        if(data.photographerId == parseInt(id)) {
            namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
            list.push(data)
        }
    }
    // console.log(list)
    for(let te of list.sort(compareNombres).reverse()) {
        new CreateMediaCard(te, namePhotographe) 
    }
    // console.log(namePhotographe)
    new sortBy(list, namePhotographe)

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


// //creer la card header de la page photographe
// class CreateCardHeader {
//     constructor (data) {
//         this.dataPhotograph = data
//         this.firstName = document.querySelector('.photographerHeader-text_name')
//         this.city = document.querySelector('.photographerHeader-text_city')
//         this.slogan = document.querySelector('.photographerHeader-text_slogan')
//         this.tags = document.querySelector('.photographerHeader-text_tags')
//         this.image = document.querySelector('.photographerHeader-img img')
//         this.infosPhotograph()
//         this.tagsPhotograph()
//         this.portraitPhotograph()
//     }

//     //Insere les infos du photographe dans les balises html
//     infosPhotograph() {
//         this.firstName.innerHTML = this.dataPhotograph.name
//         this.city.innerHTML = this.dataPhotograph.city + ", " + this.dataPhotograph.country
//         this.slogan.innerHTML = this.dataPhotograph.tagline
//     }

//     //Insere les tags
//     tagsPhotograph() {
//         this.dataPhotograph.tags.forEach(tag => {
//             let liSpan = document.createElement("li")
//             let span = document.createElement("span")
//             span.setAttribute("aria-label", tag)
//             span.classList.add("btnTags")
//             span.innerHTML = "#" + tag
//             this.tags.appendChild(liSpan)
//             liSpan.appendChild(span)
//         });
//     }

//     //Insere la photo
//     portraitPhotograph () {
//         this.image.setAttribute("src" , "../img/PhotographIDPhoto/"+ this.dataPhotograph.portrait)
//     } 
// }

// //créer la card media de la page photographe
// class CreateMediaCard {
//     constructor(data, namePhotographe){
//         this.dataMedia = data
//         this.namePhotographe = namePhotographe
//         this.main = document.querySelector("#mediasList")
//         this.media = document.createElement('article')
//         this.mediaHeader = document.createElement('header')
//         this.mediaHeaderLinkImage = document.createElement('a')
//         //si le media contient une image alors je créer la balise img
//         //sinon le media contion une video je créer la balise video 
//         if(this.dataMedia.image){
//             this.mediaHeaderImage = document.createElement('img')
//             this.mediaHeaderImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.image)
//             this.mediaHeaderLinkImage.appendChild(this.mediaHeaderImage)
//             this.mediaHeaderImage.classList.add("media-src")


//         }else if (this.dataMedia.video){
//             this.mediaHeaderVideo = document.createElement('video')
//             this.mediaHeaderVideoSrc = document.createElement('source')

//             // this.mediaHeaderVideo.setAttribute("controls", "")
//             // this.mediaHeaderVideo.setAttribute("poster", "../img/EllieRose/Sport_Jump.jpg")

//             this.mediaHeaderVideo.classList.add("media-header_video")
//             this.mediaHeaderLinkImage.appendChild(this.mediaHeaderVideo)
//             this.mediaHeaderVideo.appendChild(this.mediaHeaderVideoSrc)
//             this.mediaHeaderVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ this.dataMedia.video)
//             this.mediaHeaderVideo.classList.add("media-src")

//         }
//         this.mediaFooter = document.createElement('footer')
//         this.mediaName = document.createElement('p')
//         this.mediaNumberLike = document.createElement('p')
//         this.mediaButtonLike = document.createElement('div')
//         this.attributionClass()
//         this.attributionAttribute()
//         this.integrationTextElement()
//         this.rattachElementDOM()
//     }

//     //Attribution des class aux éléments créer
//     attributionClass(){
//         this.media.classList.add("media")
//         this.mediaHeader.classList.add("media-header")
//         this.mediaHeaderLinkImage.classList.add("media-header_img")
//         this.mediaFooter.classList.add("media-footer")   
//         this.mediaName.classList.add("media-footer_name")
//         this.mediaNumberLike.classList.add("media-footer_numberLike")
//         this.mediaButtonLike.classList.add("media-footer_buttonLike")
//     }

//     //Attribution des attributs aux éléments créer
//     attributionAttribute(){
//         this.mediaHeaderLinkImage.setAttribute("href", "#")
//     }

//     //Integration des text dans les elements
//     integrationTextElement(){
//         this.mediaName.innerHTML = this.dataMedia.title
//         this.mediaNumberLike.innerHTML = this.dataMedia.likes
//     }

//     //Rattachement des elements dans le DOM
//     rattachElementDOM(){
//         this.main.appendChild(this.media)
//         this.media.appendChild(this.mediaHeader)
//         this.media.appendChild(this.mediaFooter)
//         this.mediaHeader.appendChild(this.mediaHeaderLinkImage)
//         this.mediaFooter.appendChild(this.mediaName)
//         this.mediaFooter.appendChild(this.mediaNumberLike)
//         this.mediaFooter.appendChild(this.mediaButtonLike)
//     }
// }


// //Traitement du formulaire de contact
// class Formulaire {
//     constructor (data) {
//         this.btnContactMe = document.getElementById("btnContactMe")
//         this.formulaire = document.getElementById("formulaire")
//         this.formulaireNamePhotograph = document.getElementById("formulaire-namePhotographe")
//         this.data = data
//         this.firstname= document.querySelector("#prenom")
//         this.lastname= document.querySelector("#nom")
//         this.email= document.querySelector("#email")
//         this.message= document.querySelector("#message")
//         this.regexEmail=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         this.regexMessage = /^.{10,35}$/
//         this.regexMin = /^.{2,35}$/
//         this.formulaireName()
//         this.addEvent(this.firstname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
//         this.addEvent(this.lastname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
//         this.addEvent(this.email, this.regexEmail, "Veuillez entrer une adresse mail valide.")
//         this.addEvent(this.message, this.regexMessage, "Veuillez entrer 10 caractères ou plus pour le champ du prénom.")
//         this.submitForm()
//         this.btnClose= document.querySelector(".formulaire-close")
//         this.closeForm()
//         this.openForm()
//     }
//     //affiche le nom du photographe dans le formulaire
//     formulaireName() {
//         this.formulaireNamePhotograph.innerHTML = this.data
//     }
//     //Gére l'envoi du form
//     submitForm(){
//         this.formulaire.addEventListener("submit", (e)=> {
//             e.preventDefault()
//             //si tous les champs sont correctements rempli alors j'affiche les valeurs
//             //du formulaire et je reset le formulaire
//             if( this.regexMin.test(this.firstname.value) &&
//                 this.regexMin.test(this.lastname.value) &&
//                 this.regexEmail.test(this.email.value) &&
//                 this.regexMessage.test(this.message.value)){
//                     let data = {
//                         "prenom": this.firstname.value,
//                         "nom":  this.lastname.value,
//                         "email": this.email.value,
//                         "message": this.message.value
//                     }
//                     //affichage des valeurs du form
//                     console.log(data)

//                     //reset le form
//                     e.target.reset()
//                     const textControl = document.querySelectorAll(".text-control")
//                     textControl.forEach(element => {
//                         element.classList.remove("success")
//                     });
        
//                 }
//             })
//     }
//     //Ferme le formulaire
//     closeForm() {
//         this.btnClose.addEventListener("click", ()=>{
//             this.formulaire.style.display= "none"
//         })
//     }

//     //ouvre le formulaire au clic du btn contact me
//     openForm() {
//         this.btnContactMe.addEventListener("click", ()=>{
//             this.formulaire.style.display= "block"
//         })
//     }

//     //verifie les msg d'erreur ou de validation à la saisie du champ 
//     addEvent(first, regex, textMsgErreur){
//         first.addEventListener("keyup", function(){
//             let msgErreur = first.parentNode.childNodes[5]
//             if(regex.test(first.value)) {
//                 success(first, msgErreur)
//             }else {
//                 error(first, textMsgErreur, msgErreur )
//             }
//         })
//         function success(element, smallError) {
//             element.classList.add("success")
//             element.classList.remove("error") 
//             smallError.style.display="none" //supprime le msg d'erreur 
//         }

//         function error(element, messageError, smallError) {
//             element.classList.add("error")
//             element.classList.remove("success")
//             smallError.style.display="block" //affiche le msg d'erreur 
//             smallError.innerHTML= messageError
//         }
//     }

// }


// class sortBy {
//     constructor(list, namePhotographe) {
//         this.list = list
//         this.namePhotographe = namePhotographe
//         this.select = document.getElementById("sortBy")
//         this.media = document.querySelectorAll(".media")
//         // console.log(this.media)
//         this.test()
//     }

  
//     test(){
//         // console.log(this.select.children)
//        let tabTitle 
//        let tabPopularity 
//         let tabDate
//         this.select.addEventListener("change", (e)=> {
//             let value = e.target.value
//             console.log(e.target.value)
//             if(value == "popularity") {
//                 console.log("afficher les medias par ordre de popularité")
//                 tabPopularity  = this.list.sort(function(a,b){
//                     return a.likes - b.likes;
//                 })
//                 this.changeMedia(tabPopularity.reverse())
//             }else if (value == "date"){
//                 console.log("afficher les medias par ordre de date")
//                 tabDate = this.list.sort(function(a,b){
//                     return a.date.localeCompare(b.date)
//                 })
//                 this.changeMedia(tabDate.reverse())

//                 // console.log(this.list)
//             }else if (value == "title") {
//                 console.log("afficher les medias par ordre de titre")
//                 tabTitle = this.list.sort(function(a,b){
//                     return a.title.localeCompare(b.title)
//                 })
//                 this.changeMedia(tabTitle)
//             }
//         })
//     }

//     changeMedia(tabTitle){
//         for (let index = 0; index < this.media.length; index++) {
//             let element = this.media[index];
//             element.querySelector(".media-footer_name").innerHTML= tabTitle[index].title
//             element.querySelector(".media-footer_numberLike").innerHTML= tabTitle[index].likes
            
//             // element.querySelector(".media-src").setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
//             if(tabTitle[index].video ) {
//                 // console.log(element)
//                 let baliseVideo = document.createElement("video")
//                 let baliseVideoSrc = document.createElement("source")
//                 baliseVideo.appendChild(baliseVideoSrc)
//                 baliseVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
//                 baliseVideo.classList.add("media-header_video")
//                 baliseVideo.classList.add("media-src")

//                 element.querySelector(".media-header_img").replaceChild(baliseVideo, element.querySelector(".media-src"))
//                 // element.querySelector(".media-src").setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
//             }else if(tabTitle[index].image) {
//                 let baliseImage = document.createElement("img")
//                 baliseImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].image )
//                 baliseImage.classList.add("media-src")
//                 element.querySelector(".media-header_img").replaceChild(baliseImage, element.querySelector(".media-src"))
//             }
//             // console.log(tabTitle[index])
//             // console.log(element.querySelector(".media-src"))

//         }
//     }
// }


// //recup des donnes json
// fetch("../data.json").then((res)=>{ 
//     if (res.ok) {
//         return res.json()
//     }
// }).then(datas => {
//     //recup infos photograph
//     for(let data of datas.photographers){
//         if(data.id == parseInt(id)) {
//             new CreateCardHeader(data)
//             namePhotographe = data.name
//             new Formulaire(data.name)

//         }
//     }
//     let list = []
//     function compareNombres(a, b) {
//         return a.likes - b.likes;
//     }
//     //recup media photograph

//     for(let data of datas.media){
//         if(data.photographerId == parseInt(id)) {
//             namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
//             // new CreateMediaCard(data, namePhotographe)
//             list.push(data)
//         }
//         // console.log(list) 
//     }
//     // console.log(list)
//     for(let te of list.sort(compareNombres).reverse()) {
//         new CreateMediaCard(te, namePhotographe) 
//     }
//     // console.log(namePhotographe)
//     new sortBy(list, namePhotographe)

// }).catch((err) => {
//     console.log(err)
// })

// //Gére la redirection lorsque je clique sur l'un tags
// setTimeout(() => {
//     let tagsAll = document.querySelectorAll(".btnTags")
//     for (let index = 0; index < tagsAll.length; index++) {
//         let tag = tagsAll[index];
//         tag.addEventListener("click", (e)=> {
//          document.location.href = "../index.html?tag=" + e.target.attributes["aria-label"].value
//         })
//     }
// }, 500);


