import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('New York'); 
  const [query, setQuery] = useState('');
  const [doIt, setDoIT] = useState('');

  const apiKey = 'AIzaSyCVEG-zx7Ihfy6y0b9nBpXJkjmo0v2pZtc';
  const cx = '660272c82ded142cf';

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8b60608854399b686eb358c6c1c3a5d1`;

    axios.get(url).then((response) => {
      setData(response.data);
      thisIsWeird(location + ' in ' + response.data.weather[0].main + ' weather');
      myIMG();
    });
  }, []); 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8b60608854399b686eb358c6c1c3a5d1`;

      axios.get(url).then((response) => {
        setData(response.data);
        thisIsWeird(location + ' in ' + response.data.weather[0].main + ' weather');
        myIMG();
      });

      setLocation('');
    }
  };

  function thisIsWeird(myDat) {
    console.log(myDat);
    setQuery(myDat);
  }

  function myIMG() {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${location}park&searchType=image&imgSize=large&num=2`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const imageUrl = data.items[0].link;
          console.log(imageUrl);
          setDoIT(imageUrl);
        } else {
          console.log('No images found for search query.');
        }
      });
  }

  return (
    <div className="app" style={{backgroundImage: `url(${doIt})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` } }>
      <center><h1 style={{color: `crimson`}} >This is weather app</h1></center>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
