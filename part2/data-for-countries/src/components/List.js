import React from 'react'
import Countries from './Countries'
import SingleCountry from './SingleCountry'

const List = (param) => {

    if (param.itemsToShow.length > 10) {
        return (<div>Too many matches, specify a longer filter</div>)
    }
    else if (param.itemsToShow.length > 1) {
        return (<Countries countries={param.itemsToShow} />)
    }
    else if (param.itemsToShow.length === 1){
        return (param.itemsToShow.map(singleCountry => (
        <SingleCountry key={1} country={singleCountry}/>)))
    }
    else return (<div></div>)
}

export default List