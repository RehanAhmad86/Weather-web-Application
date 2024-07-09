import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faTemperatureHalf, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import myimage from './images/myimage.png';
import image2 from './images/p1-removebg-preview.png';
import image3 from './images/p2p-removebg-preview.png';
import image4 from './images/p3-removebg-preview.png';
import image5 from './images/p4-removebg-preview.png';

export default function App() {
  let [timezoneOffset, setTimezoneOffset] = useState(0);
  let [date, setDate] = useState(new Date())
  let [data, setData] = useState({})
  let [location, setLocation] = useState('Sahiwal')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c5a9cea39c5b142013e31b96939b6413`
  const searchlocation = () => {
      axios.get(url).then(response => {
        setData(response.data)
        setTimezoneOffset(response.data.timezone)
        console.log(response.data)
      })
      .catch(error => {
        console.log('Error: ', error);
      });
      setLocation('')
    }


  const keyPress = (event) => {
    if (event.key === 'Enter') {
      searchlocation();
    }
  }

  useEffect(() => {
    searchlocation();
    const interval = setInterval(() => {
      const localDate = new Date();
      const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
      const locationDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
      setDate(locationDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset]);

  const formatDate = date.toLocaleDateString('en-US',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  const formatTime = date.toLocaleTimeString('en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(':', ' : ')

  return (
    <div className='body'>
      <div className="container">
        <header>
          <div className='c1'>
            <div className='cc1'>
              <h1 className='city'>{data.name}</h1>
              <p className='date'>{`${formatDate} | ${formatTime}`}</p>
            </div>
            <div className="search-bar">
              <input value={location} onChange={event => setLocation(event.target.value)} onKeyDown={keyPress} className='search' type="text" placeholder="Type a city name" />
              <button onClick={searchlocation} className='searchbutton' type="button">Search</button>
              <FontAwesomeIcon className='location' icon={faLocation} size="1x" />
            </div>
          </div>
        </header>




        <main>
          <div className="current-weather">
            <div className="temperature">
              <div className='degree'>{data.main ? <>{data.main.temp.toFixed()}</> : null}</div>
              <div className="weather-details">
                <span><b>°C</b> | °F</span>
                <span>{data.weather ? <>{data.weather[0].main}</> : null}</span>
              </div>
            </div>
            <div className="weather-analysis">
              <div><img src={myimage} alt="Current weather" /></div>
              <div><p className='p p1'>
                <FontAwesomeIcon className="icon icon1" icon={faTemperatureHalf} size="1x" /> Feels like : {data.main ? <>{data.main.feels_like.toFixed()} °C</> : null}
              </p>
                <p className='p p2'>
                  <FontAwesomeIcon className="icon icon2" icon={faDroplet} size="1x" /> Humidity : {data.main ? <>{data.main.humidity} %</> : null}
                </p>
                <p className='p p3'>
                  <FontAwesomeIcon className="icon icon3" icon={faWind} size="1x" /> Wind : {data.wind ? <>{data.wind.speed.toFixed()} m/sec</> : null}
                </p>
              </div>
            </div>
          </div>
        </main>


        <div className="forecast">

          <div className="list list1">
            <p>Thursday</p>
            <img src={image2} alt="Overcast clouds" />
            <p>23° - 14°</p>
            <p>Overcast clouds</p>
          </div>
          <div className="list list2">
            <p>Friday</p>
            <img src={image3} alt="Clear Sky" />
            <p>26° - 18°</p>
            <p>Clear Sky</p>
          </div>
          <div className="list list3">
            <p>Saturday</p>
            <img src={image4} alt="Haze" />
            <p>25° - 17°</p>
            <p>Haze</p>
          </div>
          <div className="list list4">
            <p>Sunday</p>
            <img src={image5} alt="Light Rain" />
            <p>22° - 13°</p>
            <p>Light Rain</p>
          </div>

        </div>

      </div>
    </div>
  )
}
