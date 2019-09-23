import * as React from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const Country = ({ country, highlight }: any) => {
  const client = useApolloClient()
  const handleClick = () =>
    client.writeData({ data: { selected: country.slug } })
  return (
    <a
      className={['db pa1', highlight ? 'b' : ''].join(' ')}
      onClick={handleClick}
    >
      {country.name}
    </a>
  )
}

export default Country
