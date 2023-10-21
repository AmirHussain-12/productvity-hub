class Mutations::UpdateNote < Mutations::BaseMutation
  argument :id, ID, Integer, required: true
  argument :name, String, required: true
  argument :content, [String]

  type Types::NoteType

  def resolve(id:, name: nil, content: nil)
    note = Note.find_by(id: id)
    note.name = name
    note.content = content if content
    note.save
    return note
  end
end