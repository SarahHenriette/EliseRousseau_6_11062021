class Tag {
    constructor(tagEvent, tabSelectCards){
        this.tag = tagEvent
        this.tabSelectCards = tabSelectCards
        this.main = document.querySelector("#photographsList")
        this.photographCards = this.main.childNodes
        this.allSameTags = document.querySelectorAll('.btnTags[aria-label='+ this.tag.ariaLabel +']')
        this.deleteCardsPhotograph()
        this.activeOrDesactiveTags()
        this.displayOrHidePhotographsCards()
    }

    deleteCardsPhotograph(){
        for(let photographCard of this.photographCards) {
            photographCard.style.display = "none"
        }
    }

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


// fonctionnalité des tags.
// Au click d'un tag j'affiche les photographes ayant ce même tag 
setTimeout(() => {
    let tagsAll = document.querySelectorAll(".btnTags")
    let tabSelectCards = []

    for (let index = 0; index < tagsAll.length; index++) {
        let tag = tagsAll[index];
        tag.addEventListener("click", (e)=> {
            document.location.href="index.html?tag" + e.target.ariaLabel

            let tagEvent = e.target
            new Tag(tagEvent, tabSelectCards)
        })
    }
}, 500);