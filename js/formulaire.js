//Traitement du formulaire de contact
class Formulaire {
    constructor (data) {
        this.btnContactMe = document.getElementById("btnContactMe")
        this.formulaire = document.getElementById("formulaire")
        this.formulaireNamePhotograph = document.getElementById("formulaire-namePhotographe")
        this.data = data
        this.firstname= document.querySelector("#prenom")
        this.lastname= document.querySelector("#nom")
        this.email= document.querySelector("#email")
        this.message= document.querySelector("#message")
        this.regexEmail=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.regexMessage = /^.{10,35}$/
        this.regexMin = /^.{2,35}$/
        this.formulaireName()
        this.addEvent(this.firstname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        this.addEvent(this.lastname, this.regexMin, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        this.addEvent(this.email, this.regexEmail, "Veuillez entrer une adresse mail valide.")
        this.addEvent(this.message, this.regexMessage, "Veuillez entrer 10 caractères ou plus pour le champ du prénom.")
        this.submitForm()
        this.btnClose= document.querySelector(".formulaire-close")
        this.closeForm()
        this.openForm()
    }
    //affiche le nom du photographe dans le formulaire
    formulaireName() {
        this.formulaireNamePhotograph.innerHTML = this.data
    }
    //Gére l'envoi du form
    submitForm(){
        this.formulaire.addEventListener("submit", (e)=> {
            e.preventDefault()
            //si tous les champs sont correctements rempli alors j'affiche les valeurs
            //du formulaire et je reset le formulaire
            if( this.regexMin.test(this.firstname.value) &&
                this.regexMin.test(this.lastname.value) &&
                this.regexEmail.test(this.email.value) &&
                this.regexMessage.test(this.message.value)){
                    let data = {
                        "prenom": this.firstname.value,
                        "nom":  this.lastname.value,
                        "email": this.email.value,
                        "message": this.message.value
                    }
                    //affichage des valeurs du form
                    console.log(data)

                    //reset le form
                    e.target.reset()
                    const textControl = document.querySelectorAll(".text-control")
                    textControl.forEach(element => {
                        element.classList.remove("success")
                    });
        
                }
            })
    }
    //Ferme le formulaire
    closeForm() {
        this.btnClose.addEventListener("click", ()=>{
            this.formulaire.style.display= "none"
        })
    }

    //ouvre le formulaire au clic du btn contact me
    openForm() {
        this.btnContactMe.addEventListener("click", ()=>{
            this.formulaire.style.display= "block"
        })
    }

    //verifie les msg d'erreur ou de validation à la saisie du champ 
    addEvent(first, regex, textMsgErreur){
        first.addEventListener("keyup", function(){
            let msgErreur = first.parentNode.childNodes[5]
            if(regex.test(first.value)) {
                success(first, msgErreur)
            }else {
                error(first, textMsgErreur, msgErreur )
            }
        })
        function success(element, smallError) {
            element.classList.add("success")
            element.classList.remove("error") 
            smallError.style.display="none" //supprime le msg d'erreur 
        }

        function error(element, messageError, smallError) {
            element.classList.add("error")
            element.classList.remove("success")
            smallError.style.display="block" //affiche le msg d'erreur 
            smallError.innerHTML= messageError
        }
    }

}