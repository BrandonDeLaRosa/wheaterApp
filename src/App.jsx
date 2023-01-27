import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App (){

  const [weather, setWeather] = useState({})
  const [isCelcius, setIsCelcius] = useState (true)
  const celFar = () => {
    setIsCelcius(!isCelcius)
  }

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(success)
    function success(pos) {
      const crd = pos.coords;   
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d66214aff9c915d26e8f03262d0f890f`)
      .then(res => setWeather(res.data))
    }
  },[])
  console.log(weather);

  return(
    // <body> <img src={cloud} alt="" />
      // <div className='background'>  <img src={cloud} alt="" />
        <div className='cardContent'>
          <h1>Weather APP</h1>

          <img className='weatherIcon' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt="" />

          <h1> Country: {weather.sys?.country}</h1>
          <h1><b>Description: </b>{weather.weather?.[0].description}</h1>
          <h1><b>City: </b>{weather.name}</h1>
          <h2> {weather.weather?.[0].main} : {weather.clouds?.all} %</h2>
          <h2>Wind speed: {weather.wind?.speed} m/s</h2>

          <h2>Actual temp: {isCelcius ? Math?.round(weather.main?.temp - 273) : Math.round(weather.main?.temp - 273 + 32 * 1.8)}{isCelcius ? '°C' : '°F'}</h2>
          <p>Max Temp: {isCelcius ? Math.round(weather.main?.temp_max - 273) : Math.round(weather.main?.temp_max - 273 + 32 * 1.8)} {isCelcius ? '°C' : '°F'}</p>
          <p>Min Temp: {isCelcius ? Math.round(weather.main?.temp_min - 273) : Math.round(weather.main?.temp_min - 273 + 32 * 1.8)} {isCelcius ? '°C' : '°F'}</p>

          <button onClick={celFar}>Change to {isCelcius ? '°F' : '°C'}</button>
          {/* <button onClick={() => setIsCelcius(!isCelcius)}>Change to {isCelcius ? '°F' : '°C'}</button> */}
        </div>
      // </div>  
    // </body>

  )

}

export default App

/* Pasos para app de clima.
1° crear un consumo normal de api
2°copiar la funcion que se encuentra en el link --> https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
3°Volver dinamico el codigo de axios cambiando la latitud y longitud, con el codigo ya encontrado en la funcion de geolocalizacion.
4° dentro de la documentacion de nuestra api copiar y actualizar el API KEY...*/
// 5° Consumir la informacion necesarioa de manera normal 



// Dudas Como hacer la conversion de grados kelvin a farenheit (-273.15 x 1.8 + 32)
// Como cambiar el numero a entero.