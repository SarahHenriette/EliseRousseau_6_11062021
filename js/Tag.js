class Tag {
    constructor(tagEvent, tabSelectCards){
        this.tag = tagEvent
        this.tagAriaLabel = this.tag.attributes["aria-label"].value
        this.allSameTags = document.querySelectorAll('.btnTags[aria-label='+ this.tagAriaLabel +']')
        this.photographCards = document.querySelector("#photographsList").childNodes
        this.tabSelectCards = tabSelectCards
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
    //et ajoute ou retire les cards du tableau "tabSelectCards"
    activeOrDesactiveTags(){
        for(let tag of this.allSameTags) {
            tag.classList.toggle("active")
        }

        if(this.tag.classList.contains("active")){
            this.allSameTags.forEach(tag => {
                let cardOfTag = tag.parentNode.parentNode.parentNode
                this.tabSelectCards.push(cardOfTag)  
            });
        }else {
            this.tag.blur()
            this.allSameTags.forEach(tag => {
                let cardOfTag = tag.parentNode.parentNode.parentNode
                this.tabSelectCards.splice(this.tabSelectCards.indexOf(cardOfTag),1)
            })
        }
    }
    //affiche ou masque les cards des photographes en fonction du tableau tabSelectCards
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
            tag.addEventListener("keyup", (e)=> {
                let tagEvent = e.target
                if(e.key == "Enter") {
                    new Tag(tagEvent, tabSelectCards)
                }
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
