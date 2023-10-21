import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import Header from './header'
import EventList from './eventlist'
import Event from './event'
import EventForm from './eventForm'
import { CREATE_TASK, DELETE_TASK_MUTATION, TASK_QUERY, UPDATE_TASK } from '../queries/tasks'

const Task = (props) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { data } = useQuery(TASK_QUERY)
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [createTask] = useMutation(CREATE_TASK)
  const navigate = useNavigate()

  const resource = props.resource

  useEffect(() => {
    console.log('data tasks', data)
    setEvents(data?.tasks)
    data?.tasks?.length && setIsLoading(false)
  }, [data])

  const addTask = async (event) => {
    createTask({
      variables: {
        input: {
          name: event.name,
          description: event.description,
          dueDate: event.due_date
        },
      },
      refetchQueries: [{ query: TASK_QUERY }],
    })
      .then(() => {
        alert('Event Added!')
        navigate('/tasks')
      })
      .catch((error) => {
        console.error('Mutation error:', error)
      })
  }

  const deleteTasks = async (id) => {
    await deleteTask({
      variables: {
        input: { id },
      },
      refetchQueries: [{ query: TASK_QUERY }],
    })
  }

  const editTask = async (e, event, id) => {
    e.preventDefault()

    updateTask({
      variables: {
        input: {
          id,
          name: event.name,
          description: event.description,
          dueDate: event.due_date
        },
      },
    })
      .then(() => {
        window.alert('Event Updated!')
        navigate('/tasks')
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
            <EventList events={events} deleteHandler={deleteTasks} resource={resource} />
            <Routes>
              <Route
                path='new'
                element={
                  <EventForm
                    onSave={addTask}
                    onEdit={editTask}
                    events={events}
                    resource={resource}
                  />
                }
              />
              <Route
                path=':id/edit'
                element={
                  <EventForm
                    onSave={addTask}
                    onEdit={editTask}
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

export default Task