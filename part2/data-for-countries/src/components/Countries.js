import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
    return (
        countries.map(country => (
            <Country key={country.population + country.area} country={country} />
        ))
    )
}

export default Countries
