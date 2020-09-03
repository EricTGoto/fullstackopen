import React from 'react'

const Total = ({ part }) => {
    return (
      <div><b>total of {part.reduce((acc, cur,) => acc + cur.exercises, 0)} exercises</b></div>)
  }

export default Total