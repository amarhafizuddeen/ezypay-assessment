const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const moment = require('moment')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is working')
})

const getDailyInvoiceDates = ({ startDate, endDate }) => {
  const invoiceDates = []
  let now = moment(startDate)
  const end = moment(endDate)

  while (moment(now).isSameOrBefore(moment(end))) {
    invoiceDates.push(moment(now).format('DD/MM/YYYY'))
    now = moment(now).add(1, 'days')
  }

  return invoiceDates
}

const getWeeklyInvoiceDates = ({ startDate, endDate, dayOfTheWeek }) => {
  const invoiceDates = []
  let now = moment(startDate)
  const end = moment(endDate)

  while (moment(now).isSameOrBefore(moment(end))) {
    invoiceDates.push(moment(now).format('DD/MM/YYYY'))
    now = moment(now).add(1, 'weeks')
  }

  return invoiceDates
}

const getMonthlyInvoiceDates = ({ startDate, endDate, dateOfTheMonth }) => {
  const invoiceDates = []
  let now = moment(startDate)
  const end = moment(endDate)

  while (moment(now).isSameOrBefore(moment(end))) {
    const year = moment(now).year()
    const month = moment(now).month() + 1
    const endOfMonthDate = moment(now).endOf('month').date()
    let day = dateOfTheMonth

    if (day > endOfMonthDate) {
      day = endOfMonthDate
    }

    const date = moment(`${year}/${month}/${day}`, 'YYYY/MM/DD')
    invoiceDates.push(moment(date).format('DD/MM/YYYY'))
    now = moment(now).add(1, 'months')
  }

  return invoiceDates
}

app.post('/', (req, res) => {
  const { amount, subscriptionType } = req.body

  const invoiceDates =
    subscriptionType === 'DAILY'
      ? getDailyInvoiceDates(req.body)
      : subscriptionType === 'WEEKLY'
      ? getWeeklyInvoiceDates(req.body)
      : getMonthlyInvoiceDates(req.body)

  const response = {
    amount,
    subscriptionType,
    invoiceDates
  }

  res.json(response)
})

app.listen(PORT, () => {
  console.log('Server started on port :', PORT)
})
