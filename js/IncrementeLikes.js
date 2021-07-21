   
    class IncrementeLikes{
        constructor(dataLikes) {
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
                    this.likes = this.likes + 1
                    //ajoute 1 à la baniere rose
                    document.querySelector('.totalLikes').innerHTML = this.likes
                    //ajoute 1 à la photo
                    element.parentElement.querySelector(".media-footer_numberLike").innerHTML = parseInt(element.parentElement.querySelector(".media-footer_numberLike").innerHTML)+1
                })
            });
        }
        
    }   


