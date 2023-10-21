require 'rails_helper'

module Types
  RSpec.describe QueryType, type: :request do
    def tasks_query
      <<~GQL
        query {
          tasks {
            id
            name
            description
            dueDate
          }
        }
      GQL
    end

    def task_query(id)
      <<~GQL
        query {
          task(id: #{id}) {
            id
            name
            description
            dueDate
          }
        }
      GQL
    end

    describe '.resolve' do
      let!(:task){ FactoryBot.create(:task) }

      it 'retrives all notes' do
        post '/graphql', params: { query: tasks_query }
        json = JSON.parse(response.body)
        data = json['data']
        expect(data['tasks']).to be_present
      end

      it 'retrives single note' do
        post '/graphql', params: { query: task_query(task.id) }
        json = JSON.parse(response.body)
        data = json['data']['task']

        expect(data).to be_present
        expect(data['id'].to_i).to equal(task.id)
        expect(data['name']).to eq(task.name)
      end
    end
  end
end
