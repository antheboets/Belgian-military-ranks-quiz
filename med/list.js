(()=>{const e=e=>{const a=document.createElement("TD"),t=new Image;t.src=e.image,t.className="listImage";const n=document.createElement("P");n.innerText=`${e.graad}`,n.className="graadText pList";let d=document.createElement("P");return d.innerText=`"${e.aanspreeknaam}"`,d.className="aanspreekText pList",a.appendChild(t),a.appendChild(n),a.appendChild(d),a};window.addEventListener("load",(async()=>{const a=await(await fetch("data.json")).json(),t=document.getElementById("table");for(let n=0;n<a.length/4;n++){const d=document.createElement("TR");d.appendChild(e(a[n+0])),t.appendChild(d)}}))})();