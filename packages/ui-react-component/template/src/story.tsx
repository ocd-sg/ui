import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered'

import Component from './index'

const data = {
  id: 'key',
  value: 'value'
}

storiesOf('Component', module)
  .addDecorator(centered)
  .add('basic', () => (
    <Component data={data}>
      <p>I’m a child</p>
    </Component>
  ))
  .add('without children', () => <Component data={data} />)
  .add('array as children', () => (
    <Component data={data}>
      {[1, 2, 3].map((d, index) => <p key={index}>{d}</p>)}
    </Component>
  ))
