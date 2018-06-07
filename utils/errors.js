const handleError = (error) => () => {
  console.error('ERROR:', error)
  process.exit(1)
}

module.exports = {
  missing: handleError('missing package or task')
}
