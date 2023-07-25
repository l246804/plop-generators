const { setupGenerators } = require('./dist/index.cjs')

module.exports = function (plop) {
  setupGenerators(plop)
}
