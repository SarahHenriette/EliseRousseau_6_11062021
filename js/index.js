// // //recup des donnes json
// fetch("../data.json").then((res)=>{ 
//     if (res.ok) {
//         return res.json()
//     }
// }).then(data => {
//       data.photographers.forEach(dataPhotograph => {
//           console.log(window.location.href)
//         new CreateCard(dataPhotograph)
//       });
  
// }).catch((err) => {
//     console.log(err)
// })

// // fonctionnalité des tags.
// // Au click d'un tag j'affiche les photographes ayant ce même tag 
// setTimeout(() => {
//     let tagsAll = document.querySelectorAll(".btnTags")
//     let tabSelectCards = []

//     for (let index = 0; index < tagsAll.length; index++) {
//         let tag = tagsAll[index];
//         tag.addEventListener("click", (e)=> {
//             let tagEvent = e.target
//             new Tag(tagEvent, tabSelectCards)
//         })
//     }
// }, 500);




// //affiche le block "Passer au contenu"
// window.addEventListener('scroll', () => {
//     if(window.scrollY > document.querySelector('.header').scrollHeight){
//         document.querySelector('.goToContent').style.display = "block"
//     }else {
//         document.querySelector('.goToContent').style.display = "none"

//     }
// })



// let paramSearch = window.location.search
// let id = paramSearch.replace("?id=", "")
// let namePhotographe 
// //recup des donnes json
// fetch("../data.json").then((res)=>{ 
//     if (res.ok) {
//         return res.json()
//     }
// }).then(datas => {
//     //recup infos photograph
//     for(let data of datas.photographers){
//         if(data.id == parseInt(id)) {
//             new CreateCardHeader(data)
//             namePhotographe = data.name
//             new Formulaire(data.name)

//         }
//     }
//     //recup media photograph
//     for(let data of datas.media){
//         if(data.photographerId == parseInt(id)) {
//             namePhotographe =  namePhotographe.replace("-", "").split(" ")[0]
//             new CreateMediaCard(data, namePhotographe)
//         }
//     }
// }).catch((err) => {
//     console.log(err)
// })

// //Gére la redirection lorsque je clique sur l'un tags
// setTimeout(() => {
//     let tagsAll = document.querySelectorAll(".btnTags")
//     for (let index = 0; index < tagsAll.length; index++) {
//         let tag = tagsAll[index];
//         tag.addEventListener("click", (e)=> {
//          document.location.href = "../index.html?tag=" + e.target.attributes["aria-label"].value
//         })
//     }
// }, 500);