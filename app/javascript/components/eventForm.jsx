import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Pikaday from 'pikaday'
import PropTypes from 'prop-types'

import { formatDate, isEmptyObject, validateEvent } from '../helpers/helpers'

import 'pikaday/css/pikaday.css'

const EventForm = ({ events, onSave, onEdit, resource }) => {
  const { id } = useParams()

  const initialEventState = useCallback(
    () => {
      var defaults = { name: '' }
      if (resource == 'notes') {
        defaults = {
          ...defaults,
          content: '',
        }
      } else {
        defaults = {
          ...defaults,
          description: '',
          due_date: '',
        }
      }

      const currEvent = id ? events?.find((e) => e.id === Number(id)) : {}
      return { ...defaults, ...currEvent }
    },
    [events, id]
  )

  const [event, setEvent] = useState(initialEventState)
  const [formErrors, setFormErrors] = useState({})
  const dateInput = useRef(null)
  const [isUpdate, setIsUpdate] = useState(false)

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }))
  }

  useEffect(() => {
    if (id) {
      const event = events.find((e) => e.id === Number(id))
      setEvent(event)
      setIsUpdate(true)
    } else {
      setIsUpdate(false)
    }
  }, [])

  useEffect(() => {
    const pikaday = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date)
        dateInput.current.value = formattedDate
        updateEvent('due_date', formattedDate)
      },
    })

    return () => pikaday.destroy()
  }, [])

  const handleInputChange = (e) => {
    const { target } = e
    const { name } = target
    const value = target.value

    updateEvent(name, value)
  }

  useEffect(() => {
    setEvent(initialEventState)
  }, [events, initialEventState])

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) return null

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateEvent(event)

    if (!isEmptyObject(errors)) {
      setFormErrors(errors)
    } else {
      onSave(event)
    }
  }

  const cancelURL = event.id ? `/${resource}/${event.id}` : `/${resource}`
  const title = event.id ? `${event.created_at} - ${event.name}` : 'New Event'

  return (
    <div>
      <h2>{title}</h2>
      {renderErrors()}
      <form className="eventForm" onSubmit={isUpdate ? (e) => onEdit(e, event, id) : handleSubmit}>
        <div>
          <label htmlFor="name">
            <strong>Name</strong>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={event.name}
            />
          </label>
        </div>
        {resource == 'tasks' &&
          <div>
            <label htmlFor="due-date">
              <strong>Date:</strong>
              <input
                type="text"
                id="due_date"
                name="due_date"
                ref={dateInput}
                autoComplete="off"
                value={event.created_at}
                onChange={handleInputChange}
              />
            </label>
          </div>
        }
        <div>
          <label htmlFor="content">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id={resource == 'tasks' ? 'description' : 'content'}
              name={resource == 'tasks' ? 'description' : 'content'}
              onChange={handleInputChange}
              value={resource == 'tasks' ? event.description : event.content}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default EventForm

EventForm.propTypes = {
  onSave: PropTypes.func.isRequired,
}
