console.log("webpack est ok")

let requete = "../data.json"

fetch(requete).then((response)=>{ 
    if(!response.ok){
        throw new Error("HTTP error" + response.status)
    }
    return response.json()
}).then(data => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})
