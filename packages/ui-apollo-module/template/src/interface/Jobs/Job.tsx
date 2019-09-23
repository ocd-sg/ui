import * as React from 'react'

const Job = ({ job }: any) => (
  <li className="pa1">
    <div className="f7 ttu fw6 text-normal-80">{job.company.name}</div>
    <div className="f4 fw4">{job.title}</div>
  </li>
)

export default Job
