class Tag {
    constructor(tagEvent, tabSelectCards){
        this.tag = tagEvent
        this.tagAriaLabel = this.tag.attributes["aria-label"].value
        this.tabSelectCards = tabSelectCards
        this.main = document.querySelector("#photographsList")
        this.photographCards = this.main.childNodes
        this.allSameTags = document.querySelectorAll('.btnTags[aria-label='+ this.tagAriaLabel +']')
        this.deleteCardsPhotograph()
        this.activeOrDesactiveTags()
        this.displayOrHidePhotographsCards()
    }
    //masque les cards des photographes
    deleteCardsPhotograph(){
        for(let photographCard of this.photographCards) {
            photographCard.style.display = "none"
        }
    }
    //affiche ou retire la class active sur les tags
    activeOrDesactiveTags(){
        for(let tag of this.allSameTags) {
            tag.classList.toggle("active")
        }
        if(this.tag.classList.contains("active")){
            this.allSameTags.forEach(tag => {
                this.tabSelectCards.push(tag.parentNode.parentNode.parentNode)  
            });
            
        }else {
            this.allSameTags.forEach(tag => {
                this.tabSelectCards.splice(this.tabSelectCards.indexOf(tag.parentNode.parentNode.parentNode),1)
            })
        }
    }
    //affiche ou masque les cards des photographe en fonction du tableau tabSelectCards
    displayOrHidePhotographsCards(){
        if(this.tabSelectCards.length === 0){
            for(let photographCard of this.photographCards) {
                photographCard.style.display = "flex"
            }
        }else {
            for(let el of this.tabSelectCards) {
                el.style.display = "flex"
            }
        }        
    }
}

    //regex pour vérifier si l'url contient un parametre tag
    let regTag = /\?tag=/i 

    // fonctionnalité des tags.
    setTimeout(() => {
        //si l'url n'a pas de parametres alors les tags fonctionnent normalement
        if(window.location.search == ""){
            let tagsAll = document.querySelectorAll(".btnTags")
            let tabSelectCards = []
            for (let index = 0; index < tagsAll.length; index++) {
                let tag = tagsAll[index];
                // Au click d'un tag j'affiche les photographes ayant ce même tag 
                tag.addEventListener("click", (e)=> {
                    let tagEvent = e.target
                    new Tag(tagEvent, tabSelectCards)
                })
            }
        //sinon si l'url contient un parametre tag alors j'affiche les cards contenant le meme tag
        } else if (regTag.test(window.location.search)) {
            let tagAriaLabel = window.location.search.replace(/\?tag=/i, "")//valeur de tag
            let tabSelectCards = []
            let tag = document.querySelector('.btnTags[aria-label="'+ tagAriaLabel +'"]')
            new Tag(tag, tabSelectCards)
        }
    }, 300);
