const moment = require('moment')

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

const getInvoiceDates = data => {
  const invoiceDates =
    subscriptionType === 'DAILY'
      ? getDailyInvoiceDates(data)
      : subscriptionType === 'WEEKLY'
      ? getWeeklyInvoiceDates(data)
      : getMonthlyInvoiceDates(data)

  return invoiceDates
}

module.exports = {
  getDailyInvoiceDates,
  getWeeklyInvoiceDates,
  getMonthlyInvoiceDates,
  getInvoiceDates
}
