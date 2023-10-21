class Mutations::CreateTask < Mutations::BaseMutation
  argument :name, String, required: true
  argument :description, String
  argument :due_date, Types::DateType


  type Types::TaskType

  def resolve(name:, description: nil, due_date: nil)
    task = Task.new(
      name: name,
      description: description,
      due_date: due_date
    )

    if task.save
      return task
    else
      return task.errors
    end
  end
end