import CreateCard from './CreateCard'
import Tag from './Tag'

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

// fonctionnalité des tags.
// Au click d'un tag j'affiche les photographes ayant ce même tag 
setTimeout(() => {
    let tagsAll = document.querySelectorAll(".btnTags")
    let tabSelectCards = []

    for (let index = 0; index < tagsAll.length; index++) {
        let tag = tagsAll[index];
        tag.addEventListener("click", (e)=> {
            let tagEvent = e.target
            new Tag(tagEvent, tabSelectCards)
        })
    }
}, 500);

//affiche le block "Passer au contenu"
window.addEventListener('scroll', () => {
    if(window.scrollY > document.querySelector('.header').scrollHeight){
        document.querySelector('.goToContent').style.display = "block"
    }else {
        document.querySelector('.goToContent').style.display = "none"

    }
})
