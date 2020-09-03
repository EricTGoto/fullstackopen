import React from 'react'

const Filter = (params) => <input value={params.filterWord} onChange={params.onChange}/>

export default Filter