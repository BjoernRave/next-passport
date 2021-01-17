
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./next-passport.cjs.production.min.js')
} else {
  module.exports = require('./next-passport.cjs.development.js')
}
