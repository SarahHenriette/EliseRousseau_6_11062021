class sortBy {
    constructor( listMedias, namePhotographe, likes) {
        this.listMedias =  listMedias
        this.likes = likes
        this.namePhotographe = namePhotographe
        this.dropdown = document.querySelectorAll(".dropdown-item")
        this.dropdownBtn = document.getElementById("dropdownButton")
        this.listMediasDOM = document.getElementById('mediasList')
        this.displayMedias()
    }
    
    //Dans la liste déroulante, au changement de valeur (popularité, date ou titre) 
    //je trie le tableau des medias reçu en parametre
    displayMedias(){
        let tabTitle 
        let tabPopularity 
        let tabDate
        this.dropdown.forEach(element => {
            element.addEventListener("click", (e)=> {
                let value = e.target.attributes["aria-label"].value
                if(value == "popularity"){
                    this.dropdownBtn.innerHTML = "Popularité" 
                    //trie du tableau reçu en parametre par popularité
                    tabPopularity  = this.listMedias.sort(function(a,b){
                        return a.likes - b.likes;
                    })
                    //
                    this.changeMedias(tabPopularity.reverse())

                }else if (value == "date"){
                    this.dropdownBtn.innerHTML = "Date"
                    //trie du tableau reçu en parametre par date
                    tabDate = this.listMedias.sort(function(a,b){
                        return a.date.localeCompare(b.date)
                    })
                    this.changeMedias(tabDate.reverse())
                }else if (value == "title") {
                    this.dropdownBtn.innerHTML = "Titre"
                    //trie du tableau reçu en parametre par titre
                    tabTitle = this.listMedias.sort(function(a,b){
                        return a.title.localeCompare(b.title)
                    })
                    this.changeMedias(tabTitle)
                }
            })
        });
    }

    //je supprime la liste des medias affiché dans le DOM et je le remplace par le tableau trié
    changeMedias(tab){
        Array.from(this.listMediasDOM.children).forEach(el => {
            el.remove()
        });
        tab.forEach(element => {
            new CreateMediaCard(element, this.namePhotographe) 
        });
        //J’instancie la lightbox pour avoir le tableau bien trié dans la lightbox 
        new Lightbox(this.namePhotographe, tab)
        new IncrementeLikes(parseInt(document.querySelector('.totalLikes').innerHTML), tab)
    }
}