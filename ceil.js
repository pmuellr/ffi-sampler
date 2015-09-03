var ffi = require('ffi')

var libm = ffi.Library('libm', {
  'ceil': [ 'double', [ 'double' ] ]
})

var ceilVal = libm.ceil(1.5)
console.log('ceil(1.5):', ceilVal)
