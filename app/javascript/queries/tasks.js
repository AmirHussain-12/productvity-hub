import { gql } from '@apollo/client'

export const TASK_QUERY = gql`
  query {
    tasks {
      id
      name
      description
      dueDate
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      description
      dueDate
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      name
      description
      dueDate
    }
  }
`