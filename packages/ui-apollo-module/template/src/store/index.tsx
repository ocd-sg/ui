import * as React from 'react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import { ApolloProvider } from '@apollo/react-hooks'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache,
  resolvers: {}
})

const initialState = { selected: 'united-states' }
cache.writeData({ data: initialState })
client.onResetStore(() => cache.writeData({ data: initialState }))

const Provider = ({ children }: any) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Provider
