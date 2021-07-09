class sortBy {
    constructor(list, namePhotographe) {
        this.list = list
        this.namePhotographe = namePhotographe
        this.select = document.getElementById("sortBy")
        this.media = document.querySelectorAll(".media")
        // console.log(this.media)
        this.test()
    }
    
    test(){
        // console.log(this.select.children)
       let tabTitle 
       let tabPopularity 
        let tabDate
        this.select.addEventListener("change", (e)=> {
            let value = e.target.value
            console.log(e.target.value)
            if(value == "popularity") {
                console.log("afficher les medias par ordre de popularité")
                tabPopularity  = this.list.sort(function(a,b){
                    return a.likes - b.likes;
                })
                this.changeMedia(tabPopularity.reverse())
            }else if (value == "date"){
                console.log("afficher les medias par ordre de date")
                tabDate = this.list.sort(function(a,b){
                    return a.date.localeCompare(b.date)
                })
                this.changeMedia(tabDate.reverse())

                // console.log(this.list)
            }else if (value == "title") {
                console.log("afficher les medias par ordre de titre")
                tabTitle = this.list.sort(function(a,b){
                    return a.title.localeCompare(b.title)
                })
                this.changeMedia(tabTitle)
            }
        })
    }

    changeMedia(tabTitle){
        for (let index = 0; index < this.media.length; index++) {
            let element = this.media[index];
            element.querySelector(".media-footer_name").innerHTML= tabTitle[index].title
            element.querySelector(".media-footer_numberLike").innerHTML= tabTitle[index].likes
            
            // element.querySelector(".media-src").setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
            if(tabTitle[index].video ) {
                // console.log(element)
                let baliseVideo = document.createElement("video")
                let baliseVideoSrc = document.createElement("source")
                baliseVideo.appendChild(baliseVideoSrc)
                baliseVideoSrc.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
                baliseVideo.classList.add("media-header_video")
                baliseVideo.classList.add("media-src")

                element.querySelector(".media-header_img").replaceChild(baliseVideo, element.querySelector(".media-src"))
                // element.querySelector(".media-src").setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].video )
            }else if(tabTitle[index].image) {
                let baliseImage = document.createElement("img")
                baliseImage.setAttribute("src", "../img/"+ this.namePhotographe +"/"+ tabTitle[index].image )
                baliseImage.classList.add("media-src")
                element.querySelector(".media-header_img").replaceChild(baliseImage, element.querySelector(".media-src"))
            }
            // console.log(tabTitle[index])
            // console.log(element.querySelector(".media-src"))

        }
    }
}