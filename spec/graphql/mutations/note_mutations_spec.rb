require 'rails_helper'

module Mutations
  RSpec.describe CreateNote, type: :request do
    def create_query()
      <<~GQL
        mutation {
          createNote(input: {
            name: "Petdaer",
            content: "Parker",
          }) {
              id
              name
              content
              }
        }
      GQL
    end

    describe '.resolve' do
      it 'creates a note' do
        expect do
          post '/graphql', params: { query: create_query }
        end.to change { Note.count }.by(1)
      end

      it 'returns a note' do
        post '/graphql', params: { query: create_query }
        json = JSON.parse(response.body)
        data = json['data']['createNote']
        expect(data['name']).to eq('Petdaer')
        expect(JSON.parse(data['content'])).to eq(["Parker"])
        expect(data['id']).to be_present
      end
    end
  end

  RSpec.describe UpdateNote, type: :request do
    describe '.resolve' do
      def update_query(id)
        <<~GQL
          mutation {
            updateNote(input: {
              id: #{id}
              name: "updated note",
              content: "note has been updated",
            }) {
                id
                name
                content
            }
          }
        GQL
      end

      it 'update a note' do
        note = create(:note)
        post '/graphql', params: { query: update_query(note.id) }
        json = JSON.parse(response.body)
        data = json['data']['updateNote']

        expect(data['id'].to_i).to equal(note.id)
        expect(data['name']).to eq("updated note")
        expect(JSON.parse(data['content'])).to eq(["note has been updated"])
      end
    end
  end

  RSpec.describe DeleteNote, type: :request do
    describe '.resolve' do
      def delete_query(id)
        <<~GQL
          mutation {
            deleteNote(input: {
              id: #{id}
            }) {
                id
            }
          }
        GQL
      end

      it 'delete a note' do
        note = create(:note)

        expect {
          post '/graphql', params: { query: delete_query(note.id) }
        }.to change { Note.count }.by(-1)

        json = JSON.parse(response.body)
        data = json['data']['deleteNote']
        expect(data['id'].to_i).to equal(note.id)
      end
    end
  end
end
