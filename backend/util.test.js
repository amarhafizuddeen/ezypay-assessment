const util = require('./util')

test('Invoice dates for daily subscription', () => {
  expect(util.getDailyInvoiceDates({ startDate: '2020-08-01', endDate: '2020-08-07' })).toEqual([
    '01/08/2020',
    '02/08/2020',
    '03/08/2020',
    '04/08/2020',
    '05/08/2020',
    '06/08/2020',
    '07/08/2020'
  ])
})

test('Invoice dates for weekly subscription', () => {
  expect(
    util.getWeeklyInvoiceDates({ startDate: '2020-08-03', endDate: '2020-08-17', dayOfTheWeek: 1 })
  ).toEqual(['03/08/2020', '10/08/2020', '17/08/2020'])
})

test('Invoice dates for monthly subscription 1st day of the month', () => {
  expect(
    util.getMonthlyInvoiceDates({
      startDate: '2020-08-01',
      endDate: '2020-10-01',
      dateOfTheMonth: 1
    })
  ).toEqual(['01/08/2020', '01/09/2020', '01/10/2020'])
})

test('Invoice dates for monthly subscription 31st day of the month', () => {
  expect(
    util.getMonthlyInvoiceDates({
      startDate: '2020-08-01',
      endDate: '2020-10-01',
      dateOfTheMonth: 31
    })
  ).toEqual(['31/08/2020', '30/09/2020', '31/10/2020'])
})
