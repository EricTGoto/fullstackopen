import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import contactService from './services/Contact'
import Notification from './components/SuccessNotification'
import Error from './components/Error'

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
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const peopleToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()))

    const People = ({ people }) => {

        const removeContact = (id) => {
            if (window.confirm(`Do you really want to delete this contact?`)) {
                const personToDelete = persons.find(person => person.id === id)

                contactService
                    .remove(id)
                    .catch(error => {
                        setError('The contact was already deleted')
                        setTimeout(() => {
                            setError(null)
                        }, 2000)
                        setPersons(persons.filter(person => person.id !== id))
                    })

                setMessage(`${personToDelete.name} deleted from phonebook`)
                setTimeout(() => {
                    setMessage(null)
                }, 2000)
                setPersons(persons.filter(person => person.id !== id))

            }
        }

        return (
            people.map(person => (
                <Person key={person.id} name={person.name} number={person.number} onClick={() => removeContact(person.id)} />))
        )
    }

    const hook = () => {
        contactService
            .getAll()
            .then(contacts => {
                setPersons(contacts)
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

        if (isInPhonebook(noteObject.name, persons)) {
            if (window.confirm(`${noteObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
                const oldInformation = persons.find(person => person.name === noteObject.name)
                const newInformation = { ...oldInformation, number: noteObject.number }

                contactService
                    .update(oldInformation.id, newInformation)
                    .then(contact => {
                        setMessage(`${noteObject.name}'s number was changed to ${noteObject.number}`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 2000)
                        setPersons(persons.map(person => person.id !== oldInformation.id ? person : contact))
                    })
                    .catch(error => {
                        setError(`${noteObject.name}'s information was already deleted`)
                        setTimeout(() => {
                            setError(null)
                        }, 2000)
                        setPersons(persons.filter(person => person.id !== oldInformation.id))
                    })
            }
        } else {
            setMessage(`Added ${noteObject.name} to the phonebook`)
            setTimeout(() => {
                setMessage(null)
            }, 2000)
            contactService
                .create(noteObject)
                .then(contact => setPersons(persons.concat(contact)))
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
            <Notification message={message} />
            <Error error={error} />
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