const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const { getInvoiceDates } = require('./util')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is working')
})

app.post('/', (req, res) => {
  const { amount, subscriptionType } = req.body
  const invoiceDates = getInvoiceDates(req.body, subscriptionType)

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
