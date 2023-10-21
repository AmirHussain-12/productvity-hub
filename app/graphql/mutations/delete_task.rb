class Mutations::DeleteTask < Mutations::BaseMutation
  argument :id, ID, Integer, required: true

  type Types::TaskType

  def resolve(id:)
    task = Task.find_by(id: id)
    task.destroy
    return task
  end
end