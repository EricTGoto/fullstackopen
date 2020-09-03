import React from 'react'

const Form = (params) => {
    return (
    <form onSubmit={params.onSubmit}>
        <div>name: <input value={params.newName} onChange={params.nameChange} /></div>
        <div>number: <input value={params.newNumber} onChange={params.numberChange} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default Form