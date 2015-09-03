var ffi = require('ffi')

var currentLib = ffi.Library(null, {
  'atoi':  [ 'int', [ 'string' ] ],
})

var atoiVal = currentLib.atoi('1234')
console.log('atoi("1234"):', atoiVal)
