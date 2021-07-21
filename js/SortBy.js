class sortBy {
    constructor( listMedias, namePhotographe) {
        this.listMedias =  listMedias
        this.namePhotographe = namePhotographe
        this.select = document.getElementById("dropdown")
        this.media = document.querySelectorAll(".media")
        this.dropdown = document.querySelectorAll(".dropdown-item")
        this.dropdownBtn = document.getElementById("dropdownButton")
        this.mediaList = document.getElementById('mediasList')
        this.displayMedias()
    }
    
    //au changement du select les medias vont changer de place en fonction de la valeur
    displayMedias(){
        let tabTitle 
        let tabPopularity 
        let tabDate
        this.dropdown.forEach(element => {
            element.addEventListener("click", (e)=> {
                let value = e.target.attributes["aria-label"].value
                console.log(value)
                if(value == "popularity"){
                    this.dropdownBtn.innerHTML = "Popularité"
                    //trie du tableau contenant tout les medias par popularité
                    tabPopularity  = this.listMedias.sort(function(a,b){
                        return a.likes - b.likes;
                    })
                    this.changeMedias(tabPopularity.reverse())

                }else if (value == "date"){
                    this.dropdownBtn.innerHTML = "Date"
                    //trie du tableau contenant tout les medias par date
                    tabDate = this.listMedias.sort(function(a,b){
                        return a.date.localeCompare(b.date)
                    })
                    this.changeMedias(tabDate.reverse())
                }else if (value == "title") {
                    this.dropdownBtn.innerHTML = "Titre"
                    //trie du tableau contenant tout les medias par titre
                    tabTitle = this.listMedias.sort(function(a,b){
                        return a.title.localeCompare(b.title)
                    })
                    this.changeMedias(tabTitle)
                }
            })
        });
    }

    //au changement de valeur je supprime tout les medias existant et 
    //je recrée des medias a partir d'un tableau 
    changeMedias(tabTitle){
        Array.from(this.mediaList.children).forEach(el => {
            el.remove()
        });
        tabTitle.forEach(element => {
            new CreateMediaCard(element, this.namePhotographe) 
        });
        new Lightbox(this.namePhotographe, tabTitle)
    }
}