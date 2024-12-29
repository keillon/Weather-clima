// variaveis
const apiKey = 'cfdea6c02dd33402701f2b5ed48f1512'
const apiCountryUrl = 'https://flagsapi.com/BE/flat/64.png'

const inputCity = document.querySelector('#input-city')
const btnSearch = document.querySelector('#btn-search')
const ElementCity = document.querySelector('#ElementCity')
const ElementDegree = document.querySelector('#ElementDegree span')
const ElementHumidity = document.querySelector('#ElementHumidity')
const ElementIcon = document.querySelector('#ElementIcon')
const ElementType = document.querySelector('#ElementType')
const ElementTemp = document.querySelector('#ElementTemp')
const infoSearch = document.querySelector('.info-search')
const infoBox = document.querySelector('.info-info')
inputCity.value = ''
// variaveis

// fetch na api
const getWeatherData = async city => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`

  const res = await fetch(apiWeatherUrl)
  const data = await res.json()
  console.log(data)
  return data
}
// fetch na api

// mostrar info da api  na tela
const showWeatherData = async city => {
  try {
    const data = await getWeatherData(city)

    if (data.main === undefined) {
      ElementCity.innerText = 'Cidade não encontrada!'
      ElementDegree.innerText = ''
      ElementHumidity.innerText = ''
      ElementTemp.innerText = ''
      ElementType.setAttribute('src', '')
      ElementIcon.setAttribute('src', '')
      infoBox.classList.add('hide')
    } else {
      infoBox.classList.remove('hide')
      ElementCity.innerText = data.name
      ElementDegree.innerText = parseInt(data.main.temp) + '°C'
      ElementHumidity.innerText = data.main.humidity + '% ' + 'de Umidade'
      ElementTemp.innerText = data.weather[0].description
      ElementType.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      )
      ElementIcon.setAttribute(
        'src',
        `https://flagsapi.com/${data.sys.country}/shiny/64.png`
      )
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    infoBox.classList.add('hide')
    alert('Erro ao buscar dados do tempo. Por favor, tente novamente.')
  }
}

// mostrar info da api  na tela

// capturar o que escreveu no input e chamar a funcao da api para pesquisar
btnSearch.addEventListener('click', e => {
  e.preventDefault()
  const city = inputCity.value
  if (inputCity.value === '') {
    infoSearch.classList.add('hide')
  } else {
    infoSearch.classList.remove('hide')
  }
  showWeatherData(city)
})
// captura o que escreveu no input e chamar a função da api para pesquisar

// captura o 'enter' e pesquisa chamando a função da api para pesquisar
inputCity.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value
    showWeatherData(city)
    infoSearch.classList.remove('hide')
  }
})
// captura o 'enter' e pesquisa chamando a função da api para pesquisar
