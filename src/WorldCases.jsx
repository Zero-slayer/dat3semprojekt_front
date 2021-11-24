import React, {useState, useEffect} from "react";
import './App';

export default function WorldNumbers(){
    const [data,setData]=useState([]);
    const getData=()=>{
      fetch('https://api.covid19api.com/summary',
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }).then(function(response)
      {
          console.log(response)
          return response.json();
        }).then(function(myJson) 
        {
            console.log(myJson["Global"]["TotalConfirmed"])
            setData(myJson["Global"]["TotalConfirmed"])
        });
  
    }
    useEffect(()=>{
      getData()
    },[])

    return(
        <div className="App">
            <h1>{data}</h1>
       </div>
    );
}