# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_note, mutation: Mutations::CreateNote
    field :update_note, mutation: Mutations::UpdateNote
    field :delete_note, mutation: Mutations::DeleteNote

    field :create_task, mutation: Mutations::CreateTask
    field :update_task, mutation: Mutations::UpdateTask
    field :delete_task, mutation: Mutations::DeleteTask
  end
end
