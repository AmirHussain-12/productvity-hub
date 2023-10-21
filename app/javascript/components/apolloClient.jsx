import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { BASE_URL, CSRF_TOKEN } from '../helpers/helpers'

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
  headers: {
    'X-CSRF-Token': CSRF_TOKEN,
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
