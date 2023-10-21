import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import Header from './header'
import EventList from './eventlist'
import Event from './event'
import EventForm from './eventForm'
import { CREATE_NOTE, DELETE_NOTE_MUTATION, NOTES_QUERY, UPDATE_NOTE } from '../queries/notes'

const Notes = (props) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { data } = useQuery(NOTES_QUERY)
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION)
  const [updateNote] = useMutation(UPDATE_NOTE)
  const [createNote] = useMutation(CREATE_NOTE)
  const navigate = useNavigate()

  const resource = props.resource

  useEffect(() => {
    setEvents(data?.notes)
    data?.notes?.length && setIsLoading(false)
  }, [data])

  const addEvent = async (event) => {
    createNote({
      variables: {
        input: {
          name: event.name,
          content: event.content,
        },
      },
      refetchQueries: [{ query: NOTES_QUERY }],
    })
      .then(() => {
        alert('Event Added!')
        navigate('/notes')
      })
      .catch((error) => {
        console.error('Mutation error:', error)
      })
  }

  const deleteNotes = async (id) => {
    await deleteNote({
      variables: {
        input: { id },
      },
      refetchQueries: [{ query: NOTES_QUERY }],
    })
  }

  const editEvent = async (e, event, id) => {
    e.preventDefault()

    updateNote({
      variables: {
        input: {
          id,
          name: event.name,
          content: event.content,
        },
      },
    })
      .then(() => {
        window.alert('Event Updated!')
        navigate('/notes')
      })
      .catch((error) => {
        console.error('Mutation error:', error)
      })
  }

  return (
    <>
      <Header />
      <div className='grid'>
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <>
            <EventList events={events} deleteHandler={deleteNotes} resource={resource} />
            <Routes>
              <Route
                path='new'
                element={
                  <EventForm
                    onSave={addEvent}
                    onEdit={editEvent}
                    events={events}
                    resource={resource}
                  />
                }
              />
              <Route
                path=':id/edit'
                element={
                  <EventForm
                    onSave={addEvent}
                    onEdit={editEvent}
                    events={events}
                    resource={resource}
                  />
                }
              />
              <Route path=':id' element={<Event events={events} resource={resource} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  )
}

export default Notes