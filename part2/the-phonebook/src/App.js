import React, { useState, useEffect } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import Form from './components/Form'
import axios from 'axios'
const isInPhonebook = (name, persons) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === name) {
            return true
        }
    }
    return false
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterWord, setFilterWord] = useState('')
    const [showAll, setShowAll] = useState(true)

    const peopleToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()))

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            name: newName,
            number: newNumber,
            date: new Date().toISOString(),
            id: persons.length + 1
        }

        if (isInPhonebook(newName, persons)) {
            window.alert(`${newName} is already in the phonebook!`)
        } else {
            setPersons(persons.concat(noteObject))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        if (event.target.value !== '') setShowAll(false)
        setFilterWord(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Filter Contacts</h3>
            <Filter filterWord={filterWord} onChange={handleFilterChange} />
            <h3>Add new contacts</h3>
            <Form onSubmit={addNote} newName={newName} nameChange={handleNoteChange} newNumber={newNumber} numberChange={handleNumberChange} />
            <h3>Contacts</h3>
            <People people={peopleToShow} />
        </div>
    )
}

export default App