let tagsNav = document.querySelectorAll(".header-nav ul span")
let main = document.querySelector(".photographsList")
let photographCards = main.childNodes
// let t = document.querySelectorAll("span")
let tab = []

for (let index = 0; index < tagsNav.length; index++) {
    let tagNav = tagsNav[index];
    tagNav.addEventListener("click", (e)=> {
        photographCards.forEach(photographCard=> {
            photographCard.style.display = "none"
        });
        let tagNav = e.target
        tagNav.classList.toggle("active")
        if(tagNav.classList.contains("active")){
            tagNav.style.backgroundColor= "#901C1C"
            tagNav.style.color= "white"
            console.log("ok")
            let test = document.querySelectorAll('footer span[aria-label='+ tagNav.ariaLabel +']')
            test.forEach(element => {
                element.parentNode.parentNode.style.backgroundColor= "red"
                    tab.push(element.parentNode.parentNode)
                
            });
        }else {
            console.log("non")
            tagNav.style.backgroundColor= "white"
            tagNav.style.color= "#901C1C"
            let test = document.querySelectorAll('footer span[aria-label='+ tagNav.ariaLabel +']')
            test.forEach(element => {
                tab.splice(tab.indexOf(element.parentNode.parentNode),1)
            });

        }
        console.log(tab)
        tab.forEach(el=> {
            el.style.display='flex'


        })
        // photographCards.forEach(photographCard=> {
        //     photographCard.style.display = "none"
        // });
        // let test = document.querySelectorAll('.photograph footer span[aria-label='+ tagNav.ariaLabel +']')
        
        // test.forEach(element => {
        //     tab.push(element.parentNode.parentNode)
        // });
        // tab.forEach(el=> {
        //     el.style.display='flex'
        // })

    
    })
    // tagNav.addEventListener("focusout", (e)=> {
    //     // console.log(e)
    //     tab= []
    //     // e.target.style.backgroundColor= "white"
    //     // e.target.style.color = "#901C1C"
    //     photographCards.forEach(photographCard => {
    //         photographCard.style.display = "flex"
         
    //     });
    // })
}

// console.log(tagsNav)
