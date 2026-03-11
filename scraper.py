import requests
from bs4 import BeautifulSoup
import json

promos = []

urls = {

"galicia":"https://www.galicia.ar/personas/promociones",
"santander":"https://www.santander.com.ar/promociones",
"bbva":"https://www.bbva.com.ar/personas/promociones.html",
"mercadopago":"https://www.mercadopago.com.ar/promociones"

}

for banco,url in urls.items():

    try:

        r = requests.get(url)
        soup = BeautifulSoup(r.text,"html.parser")

        items = soup.find_all("h3")

        for item in items:

            promo = {
                "banco": banco,
                "titulo": item.text.strip(),
                "descuento": "",
                "dia":"varios"
            }

            promos.append(promo)

    except:
        pass

with open("../data/promos.json","w") as f:
    json.dump(promos,f,indent=2)

print("Promos guardadas:",len(promos))