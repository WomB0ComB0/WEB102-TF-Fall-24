import React from 'react'

interface EventProps {
  event: string
  color: string
  location?: string
}

const Event: React.FC<EventProps> = ({ event, color, location }) => {
  return (
    <td className={`Event ${color}`}>
      <h5>{event}</h5>
      {location && <h6>{location}</h6>}
    </td>
  )
}

export default Event