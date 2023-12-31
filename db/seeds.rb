# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


require 'faker'

5.times do
  Note.create(
    name: Faker::Name.name,
    content: Faker::Markdown.emphasis
  )

  Task.create(
    name: Faker::Book.title,
    description: Faker::Markdown.emphasis,
    due_date: Faker::Date.forward(days: 10)
  )
end

p "created #{Task.count} tasks and #{Note.count} notes"