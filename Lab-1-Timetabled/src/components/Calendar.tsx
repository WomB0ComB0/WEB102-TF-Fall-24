import React from 'react'
import Event from './Event'

const Calendar = () => {
  return (
    <div className="Calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="time">8 am</td>
            <Event event='Starbucks ☕️' color='green' location='123 Main St' />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Event event='Yolk 🍳' color='green' location='456 Elm St' />
            <td></td>
          </tr>
          <tr>
            <td className="time">9 am</td>
            <td></td>
            <td></td>
            <td></td>
            <Event event='Subway 🚊' color='pink' location='Downtown Station' />
            <td></td>
            <td></td>
            <Event event='The Bean 🫘' color='blue' location='Millennium Park' />
          </tr>
          {/* Add more rows for other time slots */}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar