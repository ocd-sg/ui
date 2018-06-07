const path = require('path')

const projectPath = process.cwd()
const modulePath = path.resolve(__dirname, '..')

module.exports = {
  projectPath,
  projectPackagePath: path.resolve(projectPath, 'package.json'),
  projectSourcePath: path.resolve(projectPath, 'src'),
  projectBuildPath: path.resolve(projectPath, 'build'),
  projectBuildAppPath: path.resolve(projectPath, 'build/app'),
  projectBuildLibPath: path.resolve(projectPath, 'build/lib'),
  projectNodeModulesPath: path.resolve(projectPath, 'node_modules'),
  modulePath,
  modulePackagesPath: path.resolve(modulePath, 'packages')
}
