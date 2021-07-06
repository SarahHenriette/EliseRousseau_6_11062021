export default class Tag {
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
            this.addCardsPhotograph(this.allSameTags)
            
        }else {
            this.removeCardsPhotograph(this.allSameTags)
        }
    }

    displayOrHidePhotographsCards(){
        console.log(this.tabSelectCards.length)
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
    addCardsPhotograph() {
        this.changeBackgroundColorTag("#901C1C", "white")   
        this.allSameTags.forEach(tag => {
            console.log(this.tabSelectCards)
            this.tabSelectCards.push(tag.parentNode.parentNode.parentNode)  
        });
    }

    removeCardsPhotograph() {
        this.changeBackgroundColorTag("white", "#901C1C")
        this.allSameTags.forEach(tag => {
            this.tabSelectCards.splice(this.tabSelectCards.indexOf(tag.parentNode.parentNode.parentNode),1)
        })
    }

    changeBackgroundColorTag(colorBackground, colorText){ 
        this.allSameTags.forEach(tag => {
            tag.style.backgroundColor= colorBackground
            tag.style.color= colorText
        });
    }

}
