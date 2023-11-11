const input = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
const city = document.getElementById("city")
const country = document.getElementById("country")
const temperature = document.getElementById("temp")
const feelsLike = document.getElementById("feelslike")
const wind = document.getElementById("wind")
const humidity = document.getElementById("humidity")
const pressure = document.getElementById("pressure")
const unitButton = document.getElementById('unitButton')
const middleSectionDiv = document.querySelector('.searchResults')
const backgroundImage = document.querySelector(".backgroundImage")
const placeInfoDiv = document.querySelector('.placeinfo')
const moreInfoParagraph =document.getElementById('moreinfo')
const apiKey = '8dcafccdaec5c43fc42f0c870f129121'
const list = document.getElementById("ul")

// console.log(city.innerHTML)
// console.log(country.innerHTML)
// console.log(temperature.innerHTML)
// console.log(feelsLike.innerHTML)
// console.log(wind.innerHTML)
// console.log(humidity.innerHTML)
// console.log(pressure.innerHTML)
// console.log(unitButton.innerHTML)


searchButton.addEventListener('click', function () {
    
        async function fetchingTemp() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`)
            const data = await response.json()
            // console.log(data)
            if (input.value == '' && input.value !== data.city) {
                city.innerHTML = "Enter the place"
                country.innerHTML = null
                temperature.innerHTML = ''
            } 
            else {
                temperature.innerHTML = Math.round(((data.main.temp) - 273.15).toFixed(2))
                unitButton.innerHTML = "°C"
                feelsLike.innerHTML = `Feels Like  ${Math.round((data.main.feels_like) - 273)}°C`
                humidity.innerHTML = `Humidity  ${data.main.humidity}%`
                pressure.innerHTML = `Pressure  ${data.main.pressure}mb`
                wind.innerHTML = `Wind  ${Math.round(data.wind.speed * (3600/1000))}km/h `
                middleSectionDiv.style.display = 'inline-block'
                placeInfoDiv.style.display = 'inline-block'
                input.value = '' //after submission input ko khali kr dega
            }
        }
        
        async function fetchingOtherData() {
            const response = await fetch('../citiesData.json')
            const otherData = await response.json()
            // console.log(otherData)
            let suggestedlist = otherData.filter( obj => obj.city.toLowerCase().includes(input.value.toLowerCase()) )
            
            for (const cityObj of otherData) {
                if (input.value.toLowerCase() === cityObj.city.toLowerCase()) {
                    city.innerHTML = cityObj.city
                    country.innerHTML = cityObj.country
                    backgroundImage.style.backgroundImage = `url("${cityObj.image}")`;
                    moreInfoParagraph.innerHTML = `${cityObj.placeInfo}`
                    backgroundImage.style.backgroundSize = `contain`;
                    backgroundImage.style.backgroundRepeat = `no-repeat`
                    backgroundImage.style.backgroundPosition = `center top`
                }
            }
        }

        fetchingTemp()
        fetchingOtherData()
    }
    );


input.oninput = ()=>{
    async function fetchingOtherData() {
        const response = await fetch('../citiesData.json')
        const otherData = await response.json()
        if((input.value).length){
        let suggestedlist = otherData.filter( obj => (obj.city.toLowerCase().includes(input.value.toLowerCase())))
        suggestedlist = suggestedlist.slice(0,5)
        suggestedlist.forEach(obj => {
            const resultItem = document.createElement('li')
            resultItem.innerHTML = obj.city+ "," + obj.country
            list.appendChild(resultItem)
            resultItem = ''
        });
        console.log(suggestedlist)
    }
    }
    fetchingOtherData()
}

