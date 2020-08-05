const travel = [
    {
        "id": 1,
        "kota": "berau",
        "lokasi": "East Kalimantan",
        "judul": "Derawan Island",
        "foto": "img/derawan.jpg",
        "deskripsi": "Derawan Island is located in the Derawan Islands, Derawan District, Berau Regency, East Kalimantan. In the surrounding waters there is a marine park. On rocks at a depth of ten meters, there is a coral known as the Blue Trigger Wall because of the 18 meter long coral there are many triggerfish.",
        "biaya": 5000000
    },
    {
        "id": 2,
        "kota": "berau",
        "lokasi": "East Kalimantan",
        "judul": "Maratua Island",
        "foto": "img/maratua.jpg",
        "deskripsi": "Maratua Island is the outer islands of Indonesia, located in the Sulawesi Sea. Maratua Island has extraordinary natural and underwater beauty. Divers call it The Indonesian Maldives. Aside from being a marine tourism, since 2015, Maratua also have an annual event that Maratua Jazz and Dive Fiesta.",
        "biaya": 6000000
    },
    {
        "id": 3,
        "kota": "berau",
        "lokasi": "East Kalimantan",
        "judul": "Labuan Cermin Lake",
        "foto": "img/labuan.jpg",
        "deskripsi": "Labuan Cermin Lake is one of the water attractions located in Berau Regency. Labuan Cermin has a layer that makes the sun reflect. This happens because Lake Labuan Cermin has salt water on the surface of the lake, while fresh water at the bottom of the lake.",
        "biaya": 4000000
    },
    {
        "id": 4,
        "kota": "flores",
        "lokasi": "East Nusa Tenggara",
        "judul": "Wae Rebo",
        "foto": "img/waerebo.jpg",
        "deskripsi": "Wae Rebo is a remote and mysterious traditional village in Manggarai Regency, East Nusa Tenggara. Located at an altitude of 1,200 m above sea level. In this village there are only 7 main houses or what is referred to as Mbaru Niang.",
        "biaya": 8000000
    },
    {
        "id": 5,
        "kota": "flores",
        "lokasi": "East Nusa Tenggara",
        "judul": "Padar Island",
        "foto": "img/padar.jpg",
        "deskripsi": "Padar Island is the third largest island in the Komodo National Park area. The main attraction of Padar Island is its panorama. The island is formed by rolling hills that stretch out facing the blue sea.",
        "biaya": 6000000
    },
    {
        "id": 6,
        "kota": "flores",
        "lokasi": "East Nusa Tenggara",
        "judul": "Kelimutu National Park",
        "foto": "img/kelimutu.jpg",
        "deskripsi": "Kelimutu National Park, consists of a region with hills and mountains. Mount Kelimutu, which has the three coloured lakes, is also located in this national park.",
        "biaya": 7000000
    }
]

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

function ready() {
    dropdownList()
    
    let destinationList = document.querySelector(".dropdown")
    destinationList.addEventListener("change", changeDestination)

    let searchBox = document.querySelector(".search-box").children[0]
    searchBox.addEventListener("keyup", handleSearchBox)
}

const dropdownList = () => {
    let allCity = document.querySelector(".dropdown")

    const city = travel.map(item => item.kota)
    const filteredCity = city.filter((item, index) => city.indexOf(item) >= index)

    filteredCity.map((kota) => {
        let kotaFirstCapital = kota.charAt(0).toUpperCase() + kota.substring(1)
        allCity.innerHTML += `<option value=${kotaFirstCapital}>${kotaFirstCapital}</option>`
    })
}

const changeDestination = (e) => {
    let card, city = e.target.value;
    const cardDeck = document.querySelector(".card-deck")
    
    if(city){
        cardDeck.innerHTML = ""
        travel.filter((item) => item.kota === city.toLowerCase()).map((item) => {
            card = `
            <div class="card destination" id=${item.id}>
                <img src=${item.foto} class="card-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.judul}</h5>
                    <h6 class="card-title">${item.lokasi}</h6>
                    <p class="card-text">${item.deskripsi}</p>
                </div>
                <div class="card-footer">
                    <p>Total Expenses: ${item.biaya}</p>
                    <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#des${item.id}" onClick="destinationDetail(${item.id})">See More</button>
                    <button type="button" class="btn btn-primary">Add to Wishlist</button>
                </div>
            </div>
            `
            cardDeck.innerHTML += card
        })
    } else {
        cardDeck.innerHTML = ""
    }

    if (cardDeck !== "") {
        let cardByCity = cardDeck.children
        for (let i = 0; i < cardByCity.length; i++) {
            const element = cardByCity[i];
            const buttonDestination = element.querySelector(".card-footer").children[2]
            // console.log(buttonDestination)
            buttonDestination.addEventListener("click", buttonClicked)
        }
    }
}

const destinationDetail = (id) => {
    let modal;
    const modalDeck = document.querySelector(".popup")

    if (id) {
        modalDeck.innerHTML = ""
        modalDeck.setAttribute("id", "des" + id)
        travel.filter(item => item.id === id).map(item => {
            modal = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn btn-secondary">Add to Wishlist</button>
                    </div>
                    <div class="modal-body">
                        <img src=${item.foto} class="card-img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.judul}</h5>
                            <h6 class="card-title">${item.lokasi}</h6>
                            <p class="card-text">${item.deskripsi}</p>
                        </div>
                        <div class="card-footer">
                            <p>Total Expenses: ${item.biaya}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            modalDeck.innerHTML = modal
        })
    }

    if (modalDeck !== "") {
        let cardByCity = modalDeck.children

        for (let i = 0; i < cardByCity.length; i++) {
            const element = cardByCity[i];
            const buttonDestination = element.querySelector(".modal-header").children[0]
  
            buttonDestination.addEventListener("click", buttonClicked)
        }
    }
}

const handleSearchBox = () => {
    let searchBoxValue = document.querySelector(".search-box").children[0].value
    let cardDeck = document.querySelector(".card-deck").children

    for (let i = 0; i < cardDeck.length; i++) {

        const title = cardDeck[i].children[1].children[0];
        let valueTitle = title.innerHTML

        if (valueTitle.toLowerCase().indexOf(searchBoxValue.toLowerCase()) > -1) {
            title.parentElement.parentElement.style.display = ""
        } else {
            title.parentElement.parentElement.style.display = "none"
        }
    }
}

const buttonClicked = (e) => {

    let priceBox = document.querySelector(".search-box").children[1]
    let hiddenNav = document.createElement("nav")

    if (e.target) {
        let costString = e.target.parentElement.children[0]
        
        if (costString.innerHTML === "Add to Wishlist") {
            costString = costString.parentElement.parentElement.children[1].children[2].children[0]
        }

        let cost = parseInt(costString.innerHTML.slice(15))
        
        if (!isNaN(cost)) {
            hiddenNav.innerHTML = cost
            priceBox.append(hiddenNav)
        }
    }
    updateWishlistTotal()
}

const updateWishlistTotal = () => {
    let priceBox = document.querySelector(".search-box").children[1]
    let hiddenNav = document.querySelector(".search-box").children[1].children
    let total = 0;

    for (let i = 0; i < hiddenNav.length; i++) {
        
        const cost = hiddenNav[i].innerHTML;
        total = total + parseInt(cost)
    }
    
    priceBox.value = "Total Price: " + total
}