import React from 'react'

const Person = (params) => {
    return(
     <div>{params.name} {params.number}
     <button onClick={params.onClick}>delete</button>
     </div>)
}

export default Person