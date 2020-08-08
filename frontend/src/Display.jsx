import React from 'react'

const Display = ({ data: { amount, subscriptionType, invoiceDates } }) => {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <h1>Invoice Data</h1>
      <h4>Amount: RM{amount}</h4>
      <h4>Subscription Type: {subscriptionType}</h4>
      <ul className="list-group">
        {invoiceDates &&
          invoiceDates.map(date => (
            <li key={date} className="list-group-item">
              {date}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Display
