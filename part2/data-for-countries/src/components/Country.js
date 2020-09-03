import React, {useState} from 'react'
import SingleCountry from './SingleCountry'

const Country = (param) => {
    const [clicked, setClicked]=useState(false)

    const handleClick = () => {
        if(clicked) {
            setClicked(false)      
        }
        else setClicked(true)
    }

    const RenderInformation = () => {
        if (clicked) {
            return <SingleCountry key={param.country.population + param.country.region} country={param.country}/>
        }
        else return <></>
    }
    return (
    <div>{param.country.name} <button onClick={handleClick}>show</button>

    <RenderInformation/>

    </div>
    
    )
}

export default Country