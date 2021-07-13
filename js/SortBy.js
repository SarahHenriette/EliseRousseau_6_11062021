class sortBy {
    constructor( listMedias, namePhotographe) {
        this.listMedias =  listMedias
        this.namePhotographe = namePhotographe
        this.select = document.getElementById("dropdown")
        this.media = document.querySelectorAll(".media")
        this.dropdown = document.querySelectorAll(".dropdown-item")
        this.dropdownBtn = document.getElementById("dropdownButton")
        this.displayMedias()
    }
    
    //au changement du select les medias vont changer de place en fonction de la valeur
    displayMedias(){
        let tabTitle 
        let tabPopularity 
        let tabDate
        this.dropdown.forEach(element => {
            element.addEventListener("click", (e)=> {
                // console.log(this.select.querySelector(".dropdown-arrow"))
                let value = e.target.attributes["aria-label"].value
                console.log(value)
                if(value == "popularity"){
                    this.dropdownBtn.innerHTML = "Popularité"
                    //trie du tableau contenant tout les medias par popularité
                    tabPopularity  = this.listMedias.sort(function(a,b){
                        return a.likes - b.likes;
                    })
                    this.changeMedias(tabPopularity.reverse())
                    new Lightbox(this.namePhotographe, tabPopularity)

                }else if (value == "date"){
                    this.dropdownBtn.innerHTML = "Date"
                    //trie du tableau contenant tout les medias par date
                    tabDate = this.listMedias.sort(function(a,b){
                        return a.date.localeCompare(b.date)
                    })
                    this.changeMedias(tabDate.reverse())
                    new Lightbox(this.namePhotographe, tabDate)
                }else if (value == "title") {
                    this.dropdownBtn.innerHTML = "Titre"
                    //trie du tableau contenant tout les medias par titre
                    tabTitle = this.listMedias.sort(function(a,b){
                        return a.title.localeCompare(b.title)
                    })
                    this.changeMedias(tabTitle)
                    new Lightbox(this.namePhotographe, tabTitle)
                }
            })
        });
    }

    //change les medias de place en fonction de la valeur choisi
    changeMedias(tabTitle){
        for (let index = 0; index < this.media.length; index++) {
            let element = this.media[index];
            element.querySelector(".media-footer_name").innerHTML= tabTitle[index].title
            element.querySelector(".media-footer_numberLike").innerHTML= tabTitle[index].likes            
            if(tabTitle[index].video) {
                let baliseVideo = document.createElement("video")
                let baliseVideoSrc = document.createElement("source")
                baliseVideo.appendChild(baliseVideoSrc)
                baliseVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
                baliseVideo.setAttribute("id", tabTitle[index].id)
                baliseVideo.classList.add("media-header_video")
                baliseVideo.classList.add("media-src")
                element.querySelector(".media-header_img").replaceChild(baliseVideo, element.querySelector(".media-src"))
            }else if(tabTitle[index].image) {
                let baliseImage = document.createElement("img")
                baliseImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].image )
                baliseImage.setAttribute("id", tabTitle[index].id)
                baliseImage.classList.add("media-src")
                element.querySelector(".media-header_img").replaceChild(baliseImage, element.querySelector(".media-src"))
            }
        }
    }
}