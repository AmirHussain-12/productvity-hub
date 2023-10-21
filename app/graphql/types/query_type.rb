# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :notes, [Types::NoteType], null: false
    def notes
      Note.all
    end

    field :note, Types::NoteType, null: false do
      argument :id, ID, required: true
    end

    def note(id:)
      Note.find_by(id: id)
    end


    field :tasks, [Types::TaskType], null: false
    def tasks
      Task.all
    end

    field :task, Types::TaskType, null: false do
      argument :id, ID, required: true
    end

    def task(id:)
      Task.find(id)
    end
  end
end
