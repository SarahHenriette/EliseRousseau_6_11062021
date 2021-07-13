//Gére la redirection lorsque je clique sur l'un tags
setTimeout(() => {
    let tagsAll = document.querySelectorAll(".btnTags")
    for (let index = 0; index < tagsAll.length; index++) {
        let tag = tagsAll[index];
        tag.addEventListener("click", (e)=> {
         document.location.href = "../index.html?tag=" + e.target.attributes["aria-label"].value
        })
    }
}, 500);
