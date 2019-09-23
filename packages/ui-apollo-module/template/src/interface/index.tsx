import * as React from 'react'

import Provider from 'app/store'
import _Module from 'app/interface/Module'

const Module = () => (
  <Provider>
    <_Module />
  </Provider>
)

export default Module
