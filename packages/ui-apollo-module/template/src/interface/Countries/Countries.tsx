import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Country from './Country'

const QUERY = gql`
  {
    selected @client
    countries {
      name
      slug
    }
  }
`

const Countries = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <p className="db pa1">Loading</p>
  if (error) return <p className="db pa1">Errored</p>

  return data.countries.map((country) => (
    <Country
      key={country.slug}
      country={country}
      highlight={country.slug === data.selected}
    />
  ))
}

export default Countries
