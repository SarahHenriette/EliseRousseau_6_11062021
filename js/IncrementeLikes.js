   
    class IncrementeLikes{
        constructor(dataLikes, listMedias) {
            this.listMedias = listMedias
            this.likes = 0
            this.btnLike = document.querySelectorAll('.media footer .media-footer_buttonLike')
            this.likes = this.likes + dataLikes
            document.querySelector('.totalLikes').innerHTML = this.likes
            this.increment()
        }
        

        increment() {
            //au click du btn like j'incrémente le nbr de like de un 
            this.btnLike.forEach(element => {
                element.addEventListener("click", ()=> {
                    let mediaId = element.parentElement.parentElement.querySelector(".media-src").id
                    this.likes = this.likes + 1
                    //ajoute 1 à la baniere rose
                    document.querySelector('.totalLikes').innerHTML = this.likes
                    //ajoute 1 à la photo
                    for (let index = 0; index < this.listMedias.length; index++) {
                        const el= this.listMedias[index];
                        if(el.id == mediaId){
                            el.likes = el.likes + 1
                            element.parentElement.querySelector(".media-footer_numberLike").innerHTML = el.likes
                            console.log(element)
                        }
                    }
                    
                    // element.parentElement.querySelector(".media-footer_numberLike").innerHTML = parseInt(element.parentElement.querySelector(".media-footer_numberLike").innerHTML)+1
                })
            });
        }
        
    }   


