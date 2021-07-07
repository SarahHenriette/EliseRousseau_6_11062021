class CreateCard {
    constructor(data){
        this.dataPhotograph = data
        this.main = document.querySelector(".photographsList")
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
        this.attributionClass()
        this.attributionAttribute()
        this.integrationTextElement()
        this.integrationTagFooter()
        this.rattachElementDOM()
    }

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

    attributionAttribute(){
        this.photographHeader.setAttribute("href", "../page/photographer.html?id=" + this.dataPhotograph.id)
        this.photographImage.setAttribute("src", "../img/PhotographIDPhoto/" + this.dataPhotograph.portrait)
    }

    integrationTextElement(){
        this.photographName.innerHTML = this.dataPhotograph.name
        this.photographCity.innerHTML = this.dataPhotograph.city + ", " + this.dataPhotograph.country
        this.photographSlogan.innerHTML = this.dataPhotograph.tagline
        this.photographPrice.innerHTML = this.dataPhotograph.price + "E/jour" 
    }

    integrationTagFooter(){
        this.dataPhotograph.tags.forEach(tag => {
            let liSpan = document.createElement("li")
            let span = document.createElement("span")
            span.setAttribute("aria-label", tag)
            span.classList.add("btnTags")
            span.innerHTML = "#" + tag
            this.photographFooter.appendChild(liSpan)
            liSpan.appendChild(span)
        });
    }

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
    if (res.ok) {
        return res.json()
    }
}).then(data => {
      data.photographers.forEach(dataPhotograph => {
        new CreateCard(dataPhotograph)
      });
}).catch((err) => {
    console.log(err)
})