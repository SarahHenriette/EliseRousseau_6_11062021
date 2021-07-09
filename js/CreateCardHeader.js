//creer la card header de la page photographe
class CreateCardHeader {
    constructor (data) {
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

    //Insere les infos du photographe dans les balises html
    infosPhotograph() {
        this.firstName.innerHTML = this.dataPhotograph.name
        this.city.innerHTML = this.dataPhotograph.city + ", " + this.dataPhotograph.country
        this.slogan.innerHTML = this.dataPhotograph.tagline
    }

    //Insere les tags
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

    //Insere la photo
    portraitPhotograph () {
        this.image.setAttribute("src" , "../img/PhotographIDPhoto/"+ this.dataPhotograph.portrait)
    } 
}