(()=>{const e=e=>{const a=document.createElement("TD"),n=new Image;n.src=e.image,n.className="listImage";const t=document.createElement("P");t.innerText=`${e.graad}`,t.className="graadText pList";let d=document.createElement("P");return d.innerText=`"${e.aanspreeknaam}"`,d.className="aanspreekText pList",a.appendChild(n),a.appendChild(t),a.appendChild(d),a};window.addEventListener("load",(async()=>{const a=await(await fetch("data.json")).json(),n=document.getElementById("table");for(let t=0;t<a.length/4;t++){const d=document.createElement("TR");d.appendChild(e(a[t+0])),d.appendChild(e(a[t+23])),d.appendChild(e(a[t+46])),d.appendChild(e(a[t+69])),n.appendChild(d)}}))})();