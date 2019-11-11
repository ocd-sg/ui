const React = require('react')
const ReactDOM = require('react-dom')

const Application = require('app')

const container = document.createElement('div')
container.setAttribute('id', 'container')
document.body.appendChild(container)

ReactDOM.render(React.createElement(Application, {}), container)

// FIXME: wait until React hooks work with `react-hot-loader`
// const { AppContainer } = require('react-hot-loader')
//
// process.nextTick(() => {
//   ReactDOM.render(
//     React.createElement(
//       AppContainer, {},
//       React.createElement(Application, {})
//     ),
//     container
//   )
// })
//
// if (module.hot) {
//   module.hot.accept('./Application', () => {
//     const NextApp = require('./Application')
//     ReactDOM.render(
//       React.createElement(NextApp, {}),
//       container
//     )
//   })
// }
