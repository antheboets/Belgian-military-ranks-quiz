(()=>{const e=e=>{console.log(e);const n=document.createElement("TD"),a=new Image;a.src=e.image,a.className="listImage";const t=document.createElement("P");t.innerText=`${e.graad}`,t.className="graadText";let l=document.createElement("P");return l.innerText=`"${e.aanspreeknaam}"`,l.className="aanspreekText",n.appendChild(a),n.appendChild(t),n.appendChild(l),n};window.addEventListener("load",(async()=>{const n=await(await fetch("data.json")).json(),a=document.getElementById("table");console.log(n.length/4);for(let t=0;t<n.length/4;t++){console.log("loop");const l=document.createElement("TR");l.appendChild(e(n[t+0])),l.appendChild(e(n[t+23])),l.appendChild(e(n[t+46])),l.appendChild(e(n[t+69])),console.log(l),a.appendChild(l)}}))})();