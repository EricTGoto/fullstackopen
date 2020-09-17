import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [response, setResponse] = useState([])

    const ShowWeather = (props) => {
        console.log(props.weather)
        if (props.weather.success === undefined && props.weather.length!==0) return (
        <div>
            <div><b>Temperature </b> : {props.weather.current.temperature} celcius </div>
        <img src={props.weather.current.weather_icons[0]} alt="Weather Icon"/>
        <div>Humidity {props.weather.current.humidity}</div>
        </div>)
        else return (<div>ERROR!!!</div>)

    }
    const hook = () => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: process.env.REACT_APP_API_KEY,
                    query: props.country.capital
                }
            })
            .then(response => {
                console.log('promise fulfilled')
                setResponse(response.data)
                console.log(response)
            }).catch(error => {
                console.error("an error occured:", error)
            })

    }

    useEffect(hook, [])
    return (
        <ShowWeather weather={response} />)
}

export default Weather