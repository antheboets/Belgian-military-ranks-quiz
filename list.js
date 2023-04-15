const drawNewRankTD = (rank) =>{
    const td = document.createElement("TD")
    const image = new Image()
    image.src = rank.image
    image.className = "listImage"
    const text = document.createElement("P")
    text.innerText = `${rank.graad}`
    text.className = "graadText pList"
    let textAanspreek = document.createElement("P")
    textAanspreek.innerText = `"${rank.aanspreeknaam}"`
    textAanspreek.className = "aanspreekText pList"
    td.appendChild(image)
    td.appendChild(text)
    td.appendChild(textAanspreek)
    return td
}

window.addEventListener("load",async ()=>{
    const data = await(await (fetch("data.json"))).json()
    const table = document.getElementById("table")
    //maybe count comps and ranks and stuff. now hardcode values
    for(let i = 0; i < data.length / 4; i++){
        const row = document.createElement("TR")
        row.appendChild(drawNewRankTD(data[i + (23 * 0)]))
        row.appendChild(drawNewRankTD(data[i + (23 * 1)]))
        row.appendChild(drawNewRankTD(data[i + (23 * 2)]))
        row.appendChild(drawNewRankTD(data[i + (23 * 3)]))
        table.appendChild(row)
    }
})