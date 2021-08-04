    class IncrementeLikes{
        constructor(dataLikes, listMedias) {
            this.listMedias = listMedias
            this.totalLikes = 0
            this.btnHeartLike = document.querySelectorAll('.media footer .media-footer_buttonLike')
             //affiche les likes à la baniere rose
            this.totalLikes = this.totalLikes + dataLikes
            document.querySelector('.totalLikes').innerHTML = this.totalLikes
            this.increment()
        }
        

        increment() {
            //au click du btn like j'incrémente le nbr de like de un 
            this.btnHeartLike.forEach(element => {
                element.addEventListener("click", ()=> {
                    let mediaId = element.parentElement.parentElement.querySelector(".media-src").id
                    //ajoute 1 à la baniere rose
                    this.totalLikes = this.totalLikes + 1
                    document.querySelector('.totalLikes').innerHTML = this.totalLikes
                    //ajoute 1 à la photo
                    for (let index = 0; index < this.listMedias.length; index++) {
                        const el= this.listMedias[index];
                        if(el.id == mediaId){
                            el.likes = el.likes + 1
                            element.parentElement.querySelector(".media-footer_numberLike").innerHTML = el.likes
                        }
                    }
                })
            });
        }
        
    }   


