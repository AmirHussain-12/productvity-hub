
import { gql } from '@apollo/client'

export const NOTES_QUERY = gql`
  query {
    notes {
      id
      name
    }
  }
`

export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      id
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      id
      name
      content
    }
  }
`

export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      name
      content
    }
  }
`
