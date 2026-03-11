const dias = [
"lunes",
"martes",
"miercoles",
"jueves",
"viernes",
"sabado",
"domingo"
]

const calendario = document.getElementById("calendario")
const contenedor = document.getElementById("promos")

function crearCalendario(){

dias.forEach(dia=>{

const btn = document.createElement("button")

btn.innerText = dia

btn.onclick = ()=>filtrarDia(dia)

calendario.appendChild(btn)

})

}

function filtrarDia(dia){

const filtradas = PROMOS.filter(p=>p.dia===dia)

renderPromos(filtradas)

}

function renderPromos(lista){

contenedor.innerHTML=""

lista.forEach(p=>{

const card = document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="${p.logo}" class="logo">

<h3>${p.banco}</h3>

<p>${p.comercio}</p>

<div class="descuento">${p.descuento}</div>

<p>Tope ${p.tope}</p>

`

contenedor.appendChild(card)

})

}

crearCalendario()

renderPromos(PROMOS)

function obtenerUbicacion(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(posicion=>{

const lat = posicion.coords.latitude
const lng = posicion.coords.longitude

mostrarPromosCercanas(lat,lng)

})

}

}

function distancia(lat1,lng1,lat2,lng2){

const R = 6371

const dLat = (lat2-lat1)*Math.PI/180
const dLng = (lng2-lng1)*Math.PI/180

const a = 
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLng/2)*Math.sin(dLng/2)

const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))

return R*c

}

function mostrarPromosCercanas(userLat,userLng){

const cercanas = PROMOS.filter(p=>{

return distancia(userLat,userLng,p.lat,p.lng) < 5

})

renderPromos(cercanas)

}

obtenerUbicacion()

function pedirPermiso(){

Notification.requestPermission()

}

pedirPermiso()

function notificarPromo(){

const hoy = new Date().getDay()

const dias = [
"domingo",
"lunes",
"martes",
"miercoles",
"jueves",
"viernes",
"sabado"
]

const diaHoy = dias[hoy]

const promosHoy = PROMOS.filter(p=>p.dia===diaHoy)

if(promosHoy.length>0){

new Notification("Promos de hoy 🔥",{

body: promosHoy[0].banco + " " + promosHoy[0].descuento

})

}

}

notificarPromo()

if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js")

}