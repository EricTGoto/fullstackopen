import React, { useState } from 'react';
import ReactDOM from 'react-dom'

const Title = (props) => {
  return (
    <h1> {props.word}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
}
const Statistic = (props) => {
  return (
    <>{props.text} {props.value}</>
  )
}

const Statistics = (props) => {
  const { good, bad, neutral, allVotes } = props

  if (allVotes === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr><td><Statistic text='good' value={good} /></td></tr>
          <tr><td><Statistic text='neutral' value={neutral} /></td></tr>
          <tr><td><Statistic text='bad' value={bad} /></td></tr>
          <tr><td><Statistic text='all' value={allVotes} /></td></tr>
          <tr><td><Statistic text='average' value={(good - bad) / allVotes} /></td></tr>
          <tr><td><Statistic text='positive' value={good / allVotes} /></td></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allVotes, setAll] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setAll(allVotes + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allVotes + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
    setAll(allVotes + 1)
  }

  console.log(good, neutral, bad, allVotes)
  return (
    <div>
      <Title word='give feedback' />
      <div>
        <Button handleClick={incrementGood} text='good' />
        <Button handleClick={incrementNeutral} text='neutral' />
        <Button handleClick={incrementBad} text='bad' />
      </div>
      <Title word='statistics' />
      <Statistics good={good} bad={bad} neutral={neutral}
        allVotes={allVotes} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

