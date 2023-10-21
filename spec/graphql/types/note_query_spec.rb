require 'rails_helper'

module Types
  RSpec.describe QueryType, type: :request do
    def notes_query
      <<~GQL
        query {
          notes {
            id
            name
            content
          }
        }
      GQL
    end

    def note_query(id)
      <<~GQL
        query {
          note(id: #{id}) {
            id
            name
            content
          }
        }
      GQL
    end

    describe '.resolve' do
      let!(:note){ FactoryBot.create(:note) }

      it 'retrives all notes' do
        post '/graphql', params: { query: notes_query }
        json = JSON.parse(response.body)
        data = json['data']
        expect(data['notes']).to be_present
      end

      it 'retrives single note' do
        post '/graphql', params: { query: note_query(note.id) }
        json = JSON.parse(response.body)
        data = json['data']['note']

        expect(data).to be_present
        expect(data['id'].to_i).to eq(note.id)
        expect(data['name']).to eq(note.name)
      end
    end
  end
end
