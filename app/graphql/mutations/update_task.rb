class Mutations::UpdateTask < Mutations::BaseMutation
  argument :id, ID, Integer, required: true
  argument :name, String, required: true
  argument :description, String
  argument :due_date, Types::DateType

  type Types::TaskType

  def resolve(id:, name: nil, description: nil, due_date: nil)
    task = Task.find_by(id: id)
    task.name = name
    task.description = description if description
    task.due_date = due_date if due_date
    task.save
    return task
  end
end