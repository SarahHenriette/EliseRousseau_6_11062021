let json = "../data.json"

fetch(json).then((res)=>{ 
    if (res.ok) {
        return res.json()
    }else {
        console.log(res.status)
    }
}).then(data => {
      data.photographers.forEach(dataPhotograph => {
        createCard(dataPhotograph)
      });
  
}).catch((err) => {
    console.log(err)
})

function createCard (dataPhotograph){
    //récuperation du conteneur des cards photographes
    const main = document.querySelector(".photographsList")

    //créations des éléments pour créer les cards des photographes
    let photograph = document.createElement('a')
    let photographHeader = document.createElement('header') 
    let photographContainImage = document.createElement('div')
    let photographImage = document.createElement('img')
    let photographName = document.createElement('h2')
    let photographBody = document.createElement('body') 
    let photographCity= document.createElement('p') 
    let photographSlogan= document.createElement('p') 
    let photographPrice= document.createElement('p') 
    let photographFooter = document.createElement('footer') 

    //attributions des class aux éléments
    photograph.classList.add("photograph")
    photographHeader.classList.add("photograph-header")
    photographContainImage.classList.add("photograph-header_image")
    photographName.classList.add("photograph-header_title")
    photographBody.classList.add("photograph-body")
    photographCity.classList.add("photograph-body_city")
    photographSlogan.classList.add("photograph-body_job")
    photographPrice.classList.add("photograph-body_price")
    photographFooter.classList.add("photograph-footer")

    //attributiond des attributs
    photograph.setAttribute("href", "#")
    photographImage.setAttribute("src", "../img/PhotographIDPhoto/" + dataPhotograph.portrait)

    
    //integration text dans les elements
    photographName.innerHTML = dataPhotograph.name
    photographCity.innerHTML = dataPhotograph.city + ", " + dataPhotograph.country
    photographSlogan.innerHTML = dataPhotograph.tagline
    photographPrice.innerHTML = dataPhotograph.price + "E/jour" 

    //integration des tags dans le footer
    dataPhotograph.tags.forEach(tag => {
        let t = document.createElement("span")
        // t.setAttribute("href", "#")
        t.setAttribute("aria-label", tag)
        t.classList.add("btnTags")
        t.innerHTML = "#" + tag
        photographFooter.appendChild(t)
    });

    //rattachement des éléments au DOM 
    main.appendChild(photograph)
    photograph.appendChild(photographHeader)
    photographHeader.appendChild(photographContainImage)
    photographContainImage.appendChild(photographImage)
    photographHeader.appendChild(photographName)
    photograph.appendChild(photographBody)
    photographBody.appendChild(photographCity)
    photographBody.appendChild(photographSlogan)
    photographBody.appendChild(photographPrice)
    photograph.appendChild(photographFooter)
}
