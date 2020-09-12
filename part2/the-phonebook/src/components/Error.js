import React from 'react'

const Error = ({ error }) => {

    const style = {
        borderStyle: 'solid',
        color: 'red',
        background: 'grey',
        fontSize: 20
    }

    if (error === null) return null

    return (
        <div style={style}>{error}</div>
    )
}

export default Error