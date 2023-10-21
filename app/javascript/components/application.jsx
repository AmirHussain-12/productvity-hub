import { BrowserRouter } from 'react-router-dom'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import App from './index'
import client from './apolloClient'

const container = document.getElementById('root')
const root = createRoot(container)

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>
  )
})
