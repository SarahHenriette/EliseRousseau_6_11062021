import CreateCard from './CreateCard'
import Tag from './Tag'

//recup des donnes json

fetch("../data.json").then((res)=>{ 
    if (res.ok) {
        return res.json()
    }else {
        console.log(res.status)
    }
}).then(data => {
      data.photographers.forEach(dataPhotograph => {
        new CreateCard(dataPhotograph)
      });
  
}).catch((err) => {
    console.log(err)
})


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