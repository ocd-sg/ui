const handleError = (error) => () => {
  console.error('ERROR:', error)
  process.exit(1)
}

module.exports = {
  missingPackage: handleError('missing package'),
  missingTask: handleError('missing task')
}
