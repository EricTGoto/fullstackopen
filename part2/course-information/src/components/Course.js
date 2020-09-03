import React from 'react'
import Part from './Part'
import Total from './Total'

const Course = ({ course }) => {
    return (
        <div>
            <h1> {course.name}</h1>
            <div>
                {course.parts.map((part) =>
                    <Part key={part.id} part={part} />)}
                <Total part={course.parts} />
            </div>
        </div>
    )
}

export default Course