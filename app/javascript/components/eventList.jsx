import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { initCapital } from '../helpers/helpers'

const EventList = ({ events, deleteHandler, resource }) => {
  const navigate = useNavigate()

  const renderEvents = (eventArray) => eventArray.map((event) => (
    <li key={event.id}>
      <NavLink to={`/${resource}/${event.id}`}>
        {event.name}
      </NavLink>
      <button onClick={() => deleteHandler(event.id)}>delete</button>
      <button onClick={() => navigate(`/${resource}/${event.id}/edit`)}>Edit</button>
    </li>
  ))

  return (
    <section className="eventList">
      <h2>
      {initCapital(resource)}
        <Link to={`/${resource}/new`}>New Event</Link>
      </h2>
      <ul>{renderEvents(events)}</ul>
    </section>
  )
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    event_name: PropTypes.string,
    content: PropTypes.string,
  })).isRequired,
}

export default EventList
