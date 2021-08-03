class CreateCardHomePage {
    constructor(data){
        this.dataPhotograph = data
        this.main = document.querySelector(".photographsList")
        this.createElementCard()
        this.attributionClass()
        this.attributionAttribute()
        this.integrationTextElement()
        this.integrationTagFooter()
        this.rattachElementDOM()
    }

    //creer les element de la card
    createElementCard() {
        this.photograph = document.createElement('article')
        this.photographHeader = document.createElement('a') 
        this.photographContainImage = document.createElement('div')
        this.photographImage = document.createElement('img')
        this.photographName = document.createElement('h2')
        this.photographBody = document.createElement('body') 
        this.photographCity= document.createElement('p') 
        this.photographSlogan= document.createElement('p') 
        this.photographPrice= document.createElement('p') 
        this.photographFooter = document.createElement('ul') 
    }

    //ajout des class sur les élémments
    attributionClass(){
        this.photograph.classList.add("photograph")
        this.photographHeader.classList.add("photograph-header")
        this.photographContainImage.classList.add("photograph-header_image")
        this.photographName.classList.add("photograph-header_title")
        this.photographBody.classList.add("photograph-body")
        this.photographCity.classList.add("photograph-body_city")
        this.photographSlogan.classList.add("photograph-body_job")
        this.photographPrice.classList.add("photograph-body_price")
        this.photographFooter.classList.add("photograph-tags") 
    }

    //ajout des attributs sur les éléments
    attributionAttribute(){
        this.photographHeader.setAttribute("href", "../page/photographer.html?id=" + this.dataPhotograph.id)
        this.photographHeader.setAttribute("aria-label", this.dataPhotograph.name)
        this.photographImage.setAttribute("src", "../img/PhotographIDPhoto/" + this.dataPhotograph.portrait)
        this.photographImage.setAttribute("alt", this.dataPhotograph.alt)
        this.photographName.setAttribute("tabindex", 0)
        this.photographCity.setAttribute("tabindex", 0)
        this.photographSlogan.setAttribute("tabindex", 0) 
        this.photographPrice.setAttribute("tabindex", 0)
    }

    //Ajout du text dans le html
    integrationTextElement(){
        this.photographName.innerHTML = this.dataPhotograph.name
        this.photographCity.innerHTML = this.dataPhotograph.city + ", " + this.dataPhotograph.country
        this.photographSlogan.innerHTML = this.dataPhotograph.tagline
        this.photographPrice.innerHTML = this.dataPhotograph.price + "E/jour" 
    }

    //ajout des tags dans le footer de la card
    integrationTagFooter(){
        this.dataPhotograph.tags.forEach(tag => {
            let liSpan = document.createElement("li")
            let span = document.createElement("span")
            span.setAttribute("aria-label", tag)
            span.setAttribute("tabindex", 0)
            span.classList.add("btnTags")
            span.innerHTML = "#" + tag
            this.photographFooter.appendChild(liSpan)
            liSpan.appendChild(span)
        });
    }
    
    //rattache tout les elements dans le DOM
    rattachElementDOM(){
        this.main.appendChild(this.photograph)
        this.photograph.appendChild(this.photographHeader)
        this.photographHeader.appendChild(this.photographContainImage)
        this.photographContainImage.appendChild(this.photographImage)
        this.photographHeader.appendChild(this.photographName)
        this.photograph.appendChild(this.photographBody)
        this.photographBody.appendChild(this.photographCity)
        this.photographBody.appendChild(this.photographSlogan)
        this.photographBody.appendChild(this.photographPrice)
        this.photograph.appendChild(this.photographFooter)
    }
}

//recup des donnes json
fetch("../data.json").then((res)=>{ 
    //vérifie le statut de la requete
    //si c'est ok je renvoie la réponse en tant qu'objet JSON
    if (res.ok) {
        return res.json()
    }
}).then(data => {
      data.photographers.forEach(dataPhotograph => {
        new CreateCardHomePage(dataPhotograph)
      });
}).catch((err) => {
    console.log(err)
})