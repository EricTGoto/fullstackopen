import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './components/List'

const App = () => {
    const [countryQuery, setCountryQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [showAll, setShowAll] = useState(true)

    const handleQueryChange = (event) => {
        if (event.target.value === '') setShowAll(true)
        else setShowAll(false)

        setCountryQuery(event.target.value)
    }

    const itemsToShow = showAll ? countries : countries.filter(country => country.name.toLowerCase().includes(countryQuery.toLowerCase()))

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    return (
        <div>
            <form>
                <div>find countries <input value={countryQuery} onChange={handleQueryChange} /></div>
            </form>
            <List itemsToShow={itemsToShow} />
        </div>
    )
}

export default App