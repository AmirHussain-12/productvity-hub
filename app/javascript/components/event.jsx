import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Event = ({ events, resource }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const event = events.find((e) => e.id === id)

  useEffect(() => {
    if (typeof event === 'undefined')
      navigate(`/${resource}`)
  })

  return (
    <>
      {resource === "notes" ? (
        <div className="eventContainer">
          <h2>Note</h2>
          <ul>
            <li>Name: {event.name}</li>
            <li>Content: {event.content}</li>
          </ul>
        </div>
      ) : (
        <div className="eventContainer">
          <h2>Task</h2>
          <ul>
            <li>Name: {event.name}</li>
            <li>Description: {event.description}</li>
            <li>Due Date: {event.due_date}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Event