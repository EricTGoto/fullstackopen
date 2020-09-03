import React from 'react'
import Language from './Language'
const SingleCountry = (props) => {
    return (
        <div>
            <h1>{props.country.name}</h1>
            <div>Capital: {props.country.capital}</div>
            <div>Population: {props.country.population}</div>
            <h2>Languages:</h2>
            <ul>{props.country.languages.map(language => (
                <Language key={language.nativeName} language={language} />
            ))} </ul>
            <img src={props.country.flag} height={100} alt="Country flag"/>
        </div>
    )
}

export default SingleCountry