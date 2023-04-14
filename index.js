/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

eval("let currentRank = null\r\nlet rankDiv\r\nlet color = false\r\nlet imagesObj = {}\r\nlet data = []\r\nlet backupData = []\r\n\r\nlet groundActive = true\r\nlet medicActive = true\r\nlet airActive = true\r\nlet navyActive = true\r\n\r\nconst rand = (max) => Math.floor(Math.random() * max)\r\n\r\nconst changeComponent = async (comp,compValue,e)=>{\r\n    console.log(e.target)\r\n    if(compValue){\r\n        if(currentRank.component === comp){\r\n            while(currentRank.component !== comp){\r\n                choseNewRank()\r\n            }\r\n            rankDiv.removeEventListener(\"click\",restRank)\r\n            choseNewRank()\r\n            await loadImages()\r\n            rankDiv.removeChild(rankDiv.firstChild)\r\n            await drawNewRank()\r\n        }\r\n        removeAllRanksFromComponent(comp)\r\n        e.target.className = \"componentBtnPressed\"\r\n    }\r\n    else{\r\n        addAllRanksFromComponent(comp)\r\n        setScore()\r\n        currentRank.score = 0\r\n        e.target.className = \"componentBtn\"\r\n    }\r\n}\r\n\r\nconst removeAllRanksFromComponent = (comp) =>{\r\n    data.filter((rank)=>{\r\n        if(rank.component === comp){\r\n            return false\r\n        }\r\n        return true\r\n    })\r\n}\r\n\r\nconst addAllRanksFromComponent = (comp) =>{\r\n    backupData.forEach((rank)=>{\r\n        if(rank.component === comp){\r\n            data.push(rank)\r\n        }\r\n    })\r\n}\r\n\r\nconst ImageLoadPromise = (image) =>{\r\n    return new Promise((resolve, reject) =>{\r\n        try{\r\n            image.onload = ()=>{\r\n                addStyleToImage(image)\r\n                resolve()\r\n            }\r\n        }\r\n        catch(err){\r\n            console.log(err)\r\n            reject(err)\r\n        }\r\n    })\r\n}\r\n\r\nconst setScore = () =>{\r\n    data.forEach((item)=>{\r\n        item.score = 1\r\n    })\r\n}\r\n\r\nconst incrementScore = (value) =>{\r\n    data.forEach((item)=>{\r\n        item.score += value\r\n    })\r\n}\r\n\r\nconst choseNewRank = () => {\r\n    let maxScore = 0\r\n    let score = 0\r\n    let currentScore = 0\r\n    data.forEach((item)=>{\r\n        maxScore += item.score\r\n    })\r\n    score = rand(maxScore)\r\n    for(let i = 0; i < data.length; i++){\r\n        currentScore += data[i].score\r\n        if(currentScore > score){\r\n            incrementScore(1)\r\n            data[i].score = 0\r\n            currentRank = data[i]\r\n            return\r\n        }\r\n    }\r\n    console.log(\"new rank selection methode didnt find rank\")\r\n    currentRank = data[rand(data.length)]\r\n    return\r\n}\r\n\r\nconst addStyleToImage = (image) =>{\r\n    image.className = \"rankImage\"\r\n}\r\n\r\nconst loadImages = async() => {\r\n    let loadPromise = [] \r\n        \r\n    let rankImage = new Image()\r\n    loadPromise.push(ImageLoadPromise(rankImage))\r\n    rankImage.src = currentRank.image\r\n\r\n    let rankColorImage = new Image()\r\n    loadPromise.push(ImageLoadPromise(rankColorImage))\r\n    rankColorImage.src = currentRank.imageKleur\r\n    \r\n    await Promise.all(loadPromise)\r\n\r\n    imagesObj.image = rankImage\r\n    imagesObj.imageColor = rankColorImage\r\n}\r\n\r\nconst drawNewRank = async () => {\r\n    let div = document.createElement(\"DIV\")\r\n    rankDiv.addEventListener(\"click\",showRank)\r\n\r\n    if(color){\r\n        div.appendChild(imagesObj.imageColor)\r\n    }\r\n    else{\r\n        div.appendChild(imagesObj.image)\r\n    }\r\n    rankDiv.appendChild(div)\r\n}\r\n\r\nconst showRank = ()=>{\r\n    let div = rankDiv.firstChild\r\n    rankDiv.removeEventListener(\"click\",showRank)\r\n    let pRank = document.createElement(\"P\")\r\n    pRank.innerText = `${currentRank.graad}`\r\n    pRank.className = \"graadText\"\r\n\r\n    let pComponent = document.createElement(\"P\")\r\n    pComponent.innerText = `${currentRank.component}`\r\n    pComponent.className = \"componentText\"\r\n\r\n    let pRankAanspreeknaam = document.createElement(\"P\")\r\n    pRankAanspreeknaam.innerText = `\"${currentRank.aanspreeknaam}\"`\r\n    pRankAanspreeknaam.className = \"aanspreekText\"\r\n\r\n    div.appendChild(pRank)\r\n    div.appendChild(pComponent)\r\n    div.appendChild(pRankAanspreeknaam)\r\n    rankDiv.addEventListener(\"click\",restRank)\r\n}\r\n\r\nconst restRank = async () =>{\r\n    rankDiv.removeEventListener(\"click\",restRank)\r\n    choseNewRank()\r\n    await loadImages()\r\n    rankDiv.removeChild(rankDiv.firstChild)\r\n    await drawNewRank()\r\n}\r\n\r\nconst changeImage = () => rankDiv.firstChild.replaceChild(color ? imagesObj.imageColor :imagesObj.image ,rankDiv.firstChild.getElementsByTagName(\"img\")[0])\r\n\r\nwindow.addEventListener(\"load\",async ()=>{\r\n    rankDiv = document.getElementById(\"rank\")\r\n    document.getElementById(\"colorBtn\").addEventListener(\"click\",()=>{\r\n        color ? color = false : color = true\r\n        changeImage()\r\n    })\r\n    document.getElementsByClassName(\"componentBtn\")[0].addEventListener(\"click\",(e)=>{\r\n        changeComponent(\"Landcomponent\",groundActive,e)\r\n        groundActive = !groundActive\r\n    })\r\n    document.getElementsByClassName(\"componentBtn\")[1].addEventListener(\"click\",(e)=>{\r\n        changeComponent(\"Medische component\",medicActive,e)\r\n        medicActive = !medicActive\r\n    })\r\n    document.getElementsByClassName(\"componentBtn\")[2].addEventListener(\"click\",(e)=>{\r\n        changeComponent(\"Luchtcomponent\",airActive,e)\r\n        airActive = !airActive\r\n    })\r\n    document.getElementsByClassName(\"componentBtn\")[3].addEventListener(\"click\",(e)=>{\r\n        changeComponent(\"Marinecomponent\",navyActive,e)\r\n        navyActive = !navyActive\r\n    })\r\n    data = await(await (fetch(\"data.json\"))).json()\r\n    backupData = data\r\n    setScore()\r\n    choseNewRank()\r\n    await loadImages()\r\n    await drawNewRank()\r\n})\n\n//# sourceURL=webpack://gradenquiz/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./main.js"]();
/******/ 	
/******/ })()
;