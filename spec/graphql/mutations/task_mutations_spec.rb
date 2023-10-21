require 'rails_helper'

module Mutations
  RSpec.describe CreateTask, type: :request do
    def create_query()
      <<~GQL
        mutation {
          createTask(input: {
            name: "Petdaer",
            description: "Parker",
            dueDate: "2023-07-22",
          }) {
              id
              name
              description
              }
        }
      GQL
    end

    describe '.resolve' do
      it 'creates a task' do
        expect do
          post '/graphql', params: { query: create_query }
        end.to change { Task.count }.by(1)
      end

      it 'returns a task' do
        post '/graphql', params: { query: create_query }
        json = JSON.parse(response.body)
        data = json['data']['createTask']
        expect(data['name']).to eq('Petdaer')
        expect(data['description']).to eq('Parker')
        expect(data['id']).to be_present
      end
    end
  end

  RSpec.describe UpdateTask, type: :request do
    describe '.resolve' do
      def update_query(id)
        <<~GQL
          mutation {
            updateTask(input: {
              id: #{id}
              name: "updated task",
              description: "Task has been updated",
              dueDate: "22-05-2023",
            }) {
                id
                name
                description
                dueDate
            }
          }
        GQL
      end

      it 'update a task' do
        task = create(:task)
        post '/graphql', params: { query: update_query(task.id) }
        json = JSON.parse(response.body)
        data = json['data']['updateTask']

        expect(data['id'].to_i).to equal(task.id)
        expect(data['name']).to eq("updated task")
        expect(data['description']).to eq("Task has been updated")
      end
    end
  end

  RSpec.describe DeleteTask, type: :request do
    describe '.resolve' do
      def delete_query(id)
        <<~GQL
          mutation {
            deleteTask(input: {
              id: #{id}
            }) {
                id
            }
          }
        GQL
      end

      it 'delete a task' do
        task = create(:task)

        expect {
          post '/graphql', params: { query: delete_query(task.id) }
        }.to change { Task.count }.by(-1)

        json = JSON.parse(response.body)
        data = json['data']['deleteTask']
        expect(data['id'].to_i).to equal(task.id)
      end
    end
  end
end
