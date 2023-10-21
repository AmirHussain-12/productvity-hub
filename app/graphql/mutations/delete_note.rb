class Mutations::DeleteNote < Mutations::BaseMutation
  argument :id, ID, Integer, required: true

  type Types::NoteType

  def resolve(id:)
    note = Note.find_by(id: id)
    note.destroy
    
    return note
  end
end