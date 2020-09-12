import React from 'react'

const SuccessNotification = ({ message}) => {

    const style = {
        color: 'green',
        fontStyle: 'italic',
        borderStyle: 'solid',
        borderRadius: 5,
        fontSize: 20
    }

    if (message ===null) {
        return null
    }

    return (
        <div style={style}>{message}</div>
    )
}

export default SuccessNotification