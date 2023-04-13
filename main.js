let currentRank = null
let rankDiv
let color = false
let imageObjs = {}

const rand = (max) => Math.floor(Math.random() * max)

const ImageLoadPromise = (image) =>{
    return (resolve, reject) =>{
        image.onload()
        resolve()
    }
}

const setScore = () =>{
    data.forEach((item)=>{
        item.score = 1
    })
}

const incrementScore = (value) =>{
    data.forEach((item)=>{
        item.score += value
    })
}

const choseNewRank = () => {
    let maxScore = 0
    let score = 0
    let currentScore = 0
    data.forEach((item)=>{
        maxScore += item.score
    })
    score = rand(maxScore)
    for(let i = 0; i < data.length; i++){
        currentScore += data[i].score
        if(currentScore > score){
            incrementScore(1)
            data[i].score = 0
            return data[i]
        }
    }
    console.log("new rank selection methode didnt find rank")
    return data[rand(data.length)]
}

const drawNewRank = async () => {
    currentRank = choseNewRank()
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
    pRank.innerText = `${currentRank.graad}`
    pRank.className = "graadText"

    let pComponent = document.createElement("P")
    pComponent.innerText = `${currentRank.component}`
    pComponent.className = "componentText"

    let pRankAanspreeknaam = document.createElement("P")
    pRankAanspreeknaam.innerText = `"${currentRank.aanspreeknaam}"`
    pRankAanspreeknaam.className = "aanspreekText"

    div.appendChild(pRank)
    div.appendChild(pComponent)
    div.appendChild(pRankAanspreeknaam)
    rankDiv.addEventListener("click",restRank)
}

const restRank = () =>{
    rankDiv.removeEventListener("click",restRank)
    rankDiv.removeChild(rankDiv.firstChild)
    drawNewRank()
}

const changeImage = () => {
    //fix deze code
    //rankDiv.firstChild.replaceChild(color ? imageObjs.imageColor :imageObjs.image ,rankDiv.firstChild.getElementsByTagName("img")[0])
    //idk fix class
    let div = rankDiv.firstChild
    let img = div.getElementsByTagName("img")[0]
    color ? div.replaceChild(imageObjs.imageColor,img) : div.replaceChild(imageObjs.image,img)
    div.getElementsByTagName("img")[0].className = "rankImage"
}

window.addEventListener("load",async ()=>{
    rankDiv = document.getElementById("rank")
    document.getElementById("colorBtn").addEventListener("click",()=>{
        color ? color = false : color = true
        changeImage()
    })
    data = await(await (fetch("data.json"))).json()
    setScore()
    await drawNewRank()
})