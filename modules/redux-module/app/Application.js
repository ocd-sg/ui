const React = require('react')

const Module = require('app')

const Application = () =>
  React.createElement(
    'div',
    {
      className:
        'absolute top-0 bottom-0 left-0 right-0 bg-background-100 sans-serif text-normal-100 overflow-hidden lh-solid'
    },
    React.createElement(Module.default, {})
  )

module.exports = Application
