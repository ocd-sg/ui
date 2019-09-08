import * as React from 'react'

import { Card } from '@blueprintjs/core'

export type Props = {
  children?: React.ReactElement<any>[] | React.ReactElement<any>
  data: {
    id?: string
    value?: string
  }
}

const Component = ({
  children,
  data = {
    id: null,
    value: null
  }
}: Props) => (
  <Card className='w5' interactive={true}>
    <h1>
      {data.id}: {data.value}
    </h1>
    <div className='bp3-text-muted'>
      {children}
    </div>
  </Card>
)

export default Component
