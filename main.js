let currentRank = null
let rankDiv
let color = false
let imageObjs = {}
let data = {}

const rand = (max) => Math.floor(Math.random() * max)

const ImageLoadPromise = (image) =>{
    return (resolve, reject) =>{
        image.onload()
        resolve()
    }
}

const drawNewRank = async () => {
    currentRank = data[rand(data.length)]
    let div = document.createElement("DIV")
    let loadPromise = [] 

    let rankImage = new Image()
    loadPromise.push(ImageLoadPromise(rankImage))
    rankImage.src = currentRank.image
    rankImage.className = "rankImage"

    let rankColorImage = new Image()
    loadPromise.push(ImageLoadPromise(rankColorImage))
    rankColorImage.src = currentRank.imageKleur
    rankImage.className = "rankImage"

    rankDiv.addEventListener("click",showRank)

    await Promise.all(loadPromise)

    imageObjs.image = rankImage
    imageObjs.imageColor = rankColorImage
    if(color){
        div.appendChild(imageObjs.imageColor)
    }
    else{
        div.appendChild(imageObjs.image)
    }
    rankDiv.appendChild(div)
}

const showRank = ()=>{
    let div = rankDiv.firstChild
    rankDiv.removeEventListener("click",showRank)
    let pRank = document.createElement("P")
    pRank.innerText = currentRank.graad
    pRank.className = "graadText"

    let pRankAanspreeknaam = document.createElement("P")
    pRankAanspreeknaam.innerText = `"${currentRank.aanspreeknaam}"`
    pRankAanspreeknaam.className = "aanspreekText"

    div.appendChild(pRank)
    div.appendChild(pRankAanspreeknaam)
    rankDiv.addEventListener("click",restRank)
}

const restRank = () =>{
    rankDiv.removeEventListener("click",restRank)
    rankDiv.removeChild(rankDiv.firstChild())
    drawNewRank()
}

const changeImage = () => {
    let div = rankDiv.firstChild
    let img = div.getElementsByTagName("img")[0]
    color ?  img.src = currentRank.imageColor : img.src = currentRank.image
}

window.addEventListener("load",async ()=>{
    rankDiv = document.getElementById("rank")
    document.getElementById("colorBtn").addEventListener("click",()=>{
        color ? color = false : color = true
        changeImage()
    })
    data = await(await (fetch("data.json"))).json()
    await drawNewRank()
})