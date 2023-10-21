class Mutations::CreateNote < Mutations::BaseMutation
  argument :name, String, required: true
  argument :content, [String], required: true

  type Types::NoteType

  def resolve(name:, content:)
    note = Note.new(
      name: name,
      content: content
    )

    note.save
    return note
  end
end