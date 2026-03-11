const map = L.map('map').setView([-34.6037,-58.3816],12)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

PROMOS.forEach(p=>{

L.marker([p.lat,p.lng])
.addTo(map)
.bindPopup(

`
<b>${p.banco}</b><br>
${p.comercio}<br>
${p.descuento}
`

)

})