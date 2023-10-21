Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  root to: redirect('/notes')

  get 'notes', to: 'components#index'
  get 'notes/new', to: 'components#index'
  get 'notes/:id', to: 'components#index'
  get 'notes/:id/edit', to: 'components#index'


  get 'tasks', to: 'components#index'
  get 'tasks/new', to: 'components#index'
  get 'tasks/:id', to: 'components#index'
  get 'tasks/:id/edit', to: 'components#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
