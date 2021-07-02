const main = document.querySelector(".photographsList")
let json = "../data.json"

fetch(json).then((res)=>{ 
    if (res.ok) {
        return res.json()
    }else {
        console.log(res.status)
    }
}).then(data => {
      data.photographers.forEach(photographe => {
        console.log(photographe)
        let photograph = document.createElement('a')
        let photographHeader = document.createElement('header') 
        let photographBody = document.createElement('body') 
        let photographFooter = document.createElement('footer') 


        photograph.setAttribute("href", "#")
        photograph.classList.add("photographsList-photograph")
        photographHeader.classList.add("photographsList-photograph_header")
        photographBody.classList.add("photographsList-photograph_body")
        photographFooter.classList.add("photographsList-photograph_footer")


        main.appendChild(photograph)
        photograph.appendChild(photographHeader)
        photograph.appendChild(photographBody)
        photograph.appendChild(photographFooter)
      });
  
}).catch((err) => {
    console.log(err)
})