let temperature = document.querySelectorAll(".temperature")

const windSpeed = document.querySelectorAll(".wind-speed")

const humidity = document.querySelectorAll(".humidity")

const searchInput = document.getElementById("searchInput")

const cityNameElement = document.getElementById("city-name")

let searchButton = document.getElementById("btn")

const date = document.querySelectorAll(".date")

const icons = document.getElementById("img")

const history = document.querySelector(".history")

let historyArray = []


const apiKey = "2a4eccb32b5e17e647d64325775f855b"

async function logJSONData(cityName) {
    let apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    const response = await fetch(apiCall);
    const jsonData = await response.json();
    console.log(jsonData);
    historyArray.push (cityName)
    return jsonData
  }

async function showData () {
    const data = await logJSONData(searchInput.value)
    const dateStr = data.list[0].dt_txt.slice(0,10).replaceAll("-","/")
   cityNameElement.innerText = `${data.city.name}(${dateStr})`

   for (let index = 0; index < 6; index ++) {
    if (index == 5) {
        temperature[index].innerText = `Temp: ${data.list[39].main.temp} F`

   windSpeed[index].innerText = `Wind: ${data.list[39].wind.speed} MPH`


   humidity[index].innerText = `Humidity: ${data.list[39].main.humidity}%`

   date[4].innerText = data.list[39].dt_txt.slice(0,10).replaceAll("-","/")

//    icons[index].setAttribute( "src",`https://openweathermap.org/img/wn/${data.list[39].weather.icon}@2x.png`)
    }

    temperature[index].innerText = `Temp: ${data.list[index * 8].main.temp} F`

   windSpeed[index].innerText = `Wind: ${data.list[index * 8].wind.speed} MPH`


   humidity[index].innerText = `Humidity: ${data.list[index * 8].main.humidity}%`

//    icons[index].setAttribute( "src",`https://openweathermap.org/img/wn/${data.list[index * 8].weather.icon}@2x.png`)
    if (index !== 0) {
        date[index - 1].innerText = data.list[index * 8].dt_txt.slice(0,10).replaceAll("-","/")
    }
}

history.textContent = data.city.name
console.log(historyArray)

historyArray.forEach((item, index) => {
        const listItem = document.createElement("li")
        listItem.textContent = item
        history.appendChild(listItem)
    }
)
}

async function searchCity () {
    cityName = searchInput.value
    showData () 
}
searchButton.addEventListener("click",showData)