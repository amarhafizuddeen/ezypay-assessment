import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import './App.css'

import Display from './Display'

const API_URL = 'http://localhost:3000'

function App() {
  const [amount, setAmount] = useState(0)
  const [subscriptionType, setSubscriptionType] = useState('DAILY')
  const [dayOfTheWeek, setDayOfTheWeek] = useState(1)
  const [dateOfTheMonth, setDateOfTheMonth] = useState(1)
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().add(1, 'months').format('YYYY-MM-DD'))

  const [data, setData] = useState(false)
  const [display, setDisplay] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(API_URL, {
        amount,
        subscriptionType,
        dayOfTheWeek,
        dateOfTheMonth,
        startDate,
        endDate
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateOfTheMonth = value => {
    if (value && value > 0 && value <= 31) {
      setDateOfTheMonth(parseInt(value))
    } else {
      setDateOfTheMonth('')
    }
  }

  const handleStartDate = value => {
    if (endDate && moment(value).isBefore(moment(endDate))) {
      // Max duration to be 3 months
      const duration = moment(endDate).subtract(1, 'days').diff(moment(value), 'month')

      if (duration > 2) {
        // Set start date to maximum duration if it were to exceed
        setStartDate(moment(endDate).subtract(3, 'months').format('YYYY-MM-DD'))
        return
      }
      setStartDate(value)
    } else if (endDate && moment(value).isSameOrAfter(moment(endDate))) {
      // Make sure that the start date is 1 day before the end date at the minimum
      setStartDate(moment(endDate).subtract(1, 'days').format('YYYY-MM-DD'))
    } else {
      setStartDate(value)
    }
  }

  const handleEndDate = value => {
    if (startDate && moment(value).isAfter(moment(startDate))) {
      // Max duration to be 3 months
      const duration = moment(value).add(1, 'days').diff(moment(startDate), 'month')

      if (duration > 2) {
        // Set end date to maximum duration if it were to exceed
        setEndDate(moment(startDate).add(3, 'months').format('YYYY-MM-DD'))
        return
      }
      setEndDate(value)
    } else if (startDate && moment(value).isSameOrBefore(moment(startDate))) {
      // Make sure that the end date is 1 day after the start date at the minimum
      setEndDate(moment(startDate).add(1, 'days').format('YYYY-MM-DD'))
    } else {
      setEndDate(value)
    }
  }

  useEffect(() => {
    // Make sure that the start date reflects to the day of the week for Weekly subscription type
    const day = moment(startDate).day()
    setDayOfTheWeek(day)
  }, [startDate])

  useEffect(() => {
    console.log(data)
    data && setDisplay(true)
  }, [data])

  return (
    <>
      <div className="container">
        <h1>Subscription Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount (RM)</label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="amount"
              value={amount.toString()}
              onChange={({ target: { value } }) => setAmount(parseInt(value))}
            />
          </div>
          <div className="form-group">
            <label>Subscription Type</label>
            <select
              name="subscriptionType"
              className="form-control form-control-lg"
              value={subscriptionType}
              onChange={({ target: { value } }) => setSubscriptionType(value)}
            >
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
          </div>
          {subscriptionType === 'WEEKLY' ? (
            <div className="form-group">
              <label>Day of the Week</label>
              <select
                className="form-control form-control-lg"
                name="dayOfTheWeek"
                value={dayOfTheWeek}
                onChange={({ target: { value } }) => setDayOfTheWeek(parseInt(value))}
              >
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
              </select>
            </div>
          ) : subscriptionType === 'MONTHLY' ? (
            <div className="form-group">
              <label>Date of the Month</label>
              <input
                type="number"
                max="31"
                className="form-control form-control-lg"
                name="dateOfTheMonth"
                value={dateOfTheMonth}
                onChange={({ target: { value } }) => handleDateOfTheMonth(value)}
              />
            </div>
          ) : null}

          <hr />
          <h3>Duration</h3>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control form-control-lg"
              name="startDate"
              value={startDate}
              onChange={({ target: { value } }) => handleStartDate(value)}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              className="form-control form-control-lg"
              name="endDate"
              value={endDate}
              onChange={({ target: { value } }) => handleEndDate(value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {display ? <Display data={data} /> : ''}
      </div>
    </>
  )
}

export default App
