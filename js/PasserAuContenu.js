let header = document.querySelector(".header")

document.addEventListener("scroll", ()=> {
    if(window.scrollY >= header.scrollHeight){
        document.querySelector(".goToContent").style.display = "block"
    } else {
        document.querySelector(".goToContent").style.display = "none"
    }
})
