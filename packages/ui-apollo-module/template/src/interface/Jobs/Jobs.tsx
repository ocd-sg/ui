import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Job from './Job'

const QUERY = gql`
  query getCountryJobs($country: String!) {
    selected @client @export(as: "country")
    jobs(input: { type: "country", slug: $country }) {
      id
      title
      company {
        name
      }
    }
  }
`

const Jobs = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <p className="db pa1">Loading</p>
  if (error) return <p className="db pa1">Errored</p>

  return data.jobs.map((job) => <Job key={job.id} job={job} />)
}

export default Jobs
