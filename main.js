let currentRank = null
let rankDiv
let color = false
let imagesObj = {}
let data = []
let backupData = []

let groundActive = true
let medicActive = true
let airActive = true
let navyActive = true

const rand = (max) => Math.floor(Math.random() * max)

const changeComponent = async (comp,compValue,e)=>{
    if(compValue){
        if(currentRank.component === comp){
            while(currentRank.component === comp){
                choseNewRank()
            }
            rankDiv.removeEventListener("click",restRank)
            await loadImages()
            rankDiv.removeChild(rankDiv.firstChild)
            await drawNewRank()
        }
        removeAllRanksFromComponent(comp)
        e.target.className = "componentBtnPressed"
    }
    else{
        addAllRanksFromComponent(comp)
        setScore()
        currentRank.score = 0
        e.target.className = "componentBtn"
    }
}

const removeAllRanksFromComponent = (comp) =>{
    data = data.filter((rank)=>{
        if(rank.component === comp){
            return false
        }
        return true
    })
}

const addAllRanksFromComponent = (comp) =>{
    backupData.forEach((rank)=>{
        if(rank.component === comp){
            data.push(rank)
        }
    })
}

const ImageLoadPromise = (image) =>{
    return new Promise((resolve, reject) =>{
        try{
            image.onload = ()=>{
                addStyleToImage(image)
                resolve()
            }
        }
        catch(err){
            console.log(err)
            reject(err)
        }
    })
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
            currentRank = data[i]
            return
        }
    }
    console.log("new rank selection methode didnt find rank")
    currentRank = data[rand(data.length)]
    return
}

const addStyleToImage = (image) =>{
    image.className = "rankImage"
}

const loadImages = async() => {
    let loadPromise = [] 
        
    let rankImage = new Image()
    loadPromise.push(ImageLoadPromise(rankImage))
    rankImage.src = currentRank.image

    let rankColorImage = new Image()
    loadPromise.push(ImageLoadPromise(rankColorImage))
    rankColorImage.src = currentRank.imageKleur
    
    await Promise.all(loadPromise)

    imagesObj.image = rankImage
    imagesObj.imageColor = rankColorImage
}

const drawNewRank = async () => {
    let div = document.createElement("DIV")
    rankDiv.addEventListener("click",showRank)

    if(color){
        div.appendChild(imagesObj.imageColor)
    }
    else{
        div.appendChild(imagesObj.image)
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

const restRank = async () =>{
    rankDiv.removeEventListener("click",restRank)
    choseNewRank()
    await loadImages()
    rankDiv.removeChild(rankDiv.firstChild)
    await drawNewRank()
}

const changeImage = () => 
    rankDiv.firstChild.replaceChild(color ? imagesObj.imageColor :imagesObj.image ,rankDiv.firstChild.getElementsByTagName("img")[0])

window.addEventListener("load",async ()=>{
    rankDiv = document.getElementById("rank")
    document.getElementById("colorBtn").addEventListener("click",()=>{
        color ? color = false : color = true
        changeImage()
    })
    document.getElementsByClassName("componentBtn")[0].addEventListener("click",(e)=>{
        changeComponent("Landcomponent",groundActive,e)
        groundActive = !groundActive
    })
    document.getElementsByClassName("componentBtn")[1].addEventListener("click",(e)=>{
        changeComponent("Medische component",medicActive,e)
        medicActive = !medicActive
    })
    document.getElementsByClassName("componentBtn")[2].addEventListener("click",(e)=>{
        changeComponent("Luchtcomponent",airActive,e)
        airActive = !airActive
    })
    document.getElementsByClassName("componentBtn")[3].addEventListener("click",(e)=>{
        changeComponent("Marinecomponent",navyActive,e)
        navyActive = !navyActive
    })
    data = await(await (fetch("data.json"))).json()
    backupData = data
    setScore()
    choseNewRank()
    await loadImages()
    await drawNewRank()
})