(()=>{const e=e=>{const a=document.createElement("TD"),n=new Image;n.src=e.image,n.className="listImage";const t=document.createElement("P");t.innerText=`${e.graad}`,t.className="graadText";let d=document.createElement("P");return d.innerText=`"${e.aanspreeknaam}"`,d.className="aanspreekText",a.appendChild(n),a.appendChild(t),a.appendChild(d),a};window.addEventListener("load",(async()=>{const a=await(await fetch("data.json")).json(),n=document.getElementById("table");console.log(a.length/4);for(let t;t<a.length/4;t++){const a=document.createElement("TR");a.appendChild(e(t)),a.appendChild(e(t+23)),a.appendChild(e(t+46)),a.appendChild(e(t+69)),n.appendChild(a)}}))})();