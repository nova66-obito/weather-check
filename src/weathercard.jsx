import React, { useEffect, useState } from "react";
import './card.css';
import clear from './image/clear.png';
import rain from './image/rain.png';
import mist from './image/mist.png';
import thun from './image/snow.png';
import Cloud from './image/cloud.png';
import { FaSearch } from "react-icons/fa";
export default function Weather(){
    let[details , setDetails] = useState(null)
    let [time,setTime] = useState(new Date())
    let [value, setvalue] = useState('chennai')    
    console.log(time)
    let call=()=>{
        let apicall =fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=d5486daf45b62ea5cb7678e592b11b21`)
        let data = apicall.then((item)=>item.json());
        data.then((weather)=>setDetails(weather))
    }
    useEffect(function(){
        call();
    }
    ,[])
    console.log(details)
    return(
        <>
          <div className="card">
             <div className="top">
                 <h2 onClick={()=>call()} style={{cursor:"pointer"}}><FaSearch /></h2>
                 <input type="text" placeholder="search" onChange={(event)=>setvalue(event.target.value)}/>
             </div>
             {details && details.cod === 200 ?
                <div className="down">
                <div className="loc">
                <h2>{details?.name}</h2>
                <p>{time.toLocaleString()}</p>
                </div>
             <div className="down-sub">
                 <div className="tem">
                     <h1>{details && Math.round(details?.main.temp-273.25)}<sup>°c</sup></h1>
                 </div>
                 <div className="pic">
                    <img src={details.weather[0].main === 'Clear' ? clear : 
                        details.weather[0].main === 'Rain' ? rain :
                        details.weather[0].main === 'Mist' ? mist :
                        details.weather[0].main === 'thunderstorm' ? 
                        thun : details.weather[0].main === 'Clouds' ? Cloud : null} alt="clear weather" />
                 </div>
             </div>
             <div className="end">
                 <div>
                     <img src={'https://cdn-icons-png.freepik.com/256/9792/9792622.png?ga=GA1.1.170401809.1728805057&semt=ais_hybrid'} alt="" />
                     <h2><span>{details.wind.speed}</span>Km/h</h2>
                 </div>
                 <div>
                     <img src={'https://cdn-icons-png.freepik.com/256/5769/5769965.png?ga=GA1.1.170401809.1728805057&semt=ais_hybrid'} alt="" />
                     <h2><span>{details.main.humidity}</span><small>:water vapor</small></h2>
                 </div>
             </div>
          </div> :<h1 className="text-center">invalid city name</h1>
            }
            
          </div>
        </>
    )
}