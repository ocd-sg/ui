const React = require('react')
const ReactDOM = require('react-dom')

const { AppContainer } = require('react-hot-loader')
const Application = require('./Application')

const container = document.createElement('div')
container.setAttribute('id', 'container')
document.body.appendChild(container)

process.nextTick(() => {
  ReactDOM.render(
    React.createElement(
      AppContainer, {},
      React.createElement(Application, {})
    ),
    container
  )
})

if (module.hot) {
  module.hot.accept('./Application', () => {
    const NextApp = require('./Application')
    ReactDOM.render(
      React.createElement(
        AppContainer, {},
        React.createElement(NextApp, {})
      ),
      container
    )
  })
}
