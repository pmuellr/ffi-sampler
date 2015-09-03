var ffi      = require('ffi')
var ref      = require('ref')
var refArray = require('ref-array')

var VoidPtr    = ref.refType(ref.types.void)
var Int32Array = refArray(ref.types.int32)
var CompareFn  = ffi.Function('int', [VoidPtr, VoidPtr])

var currentLib = ffi.Library(null, {
  'qsort': [ 'void', [VoidPtr, 'size_t', 'size_t', VoidPtr ]]
})

var arr = new Int32Array(5)
for (var i=0; i<arr.length; i++) {
  arr[i] = Math.round(10 * Math.random())
}

var compareFn = ffi.Callback('int', [ VoidPtr, VoidPtr ], compare)

console.log("before qsort: ", [].slice.call(arr))
currentLib.qsort(arr.buffer, arr.length, ref.types.int32.size, compareFn)
console.log("after  qsort: ", [].slice.call(arr))

// void qsort (void *array, size_t count, size_t size, comparison_fn_t compare)
// int comparison_fn_t (void *item1, void *item2)

//------------------------------------------------------------------------------
function compare(ptr1, ptr2) {
  ptr1 = ref.reinterpret(ptr1, 4, 0)
  ptr2 = ref.reinterpret(ptr2, 4, 0)

  var val1 = ptr1.readUInt32LE(0)
  var val2 = ptr2.readUInt32LE(0)

  var result = 0
  if (val1 < val2) result = -1
  if (val1 > val2) result =  1

  console.log("   compare(" + val1 + "," + val2 + "): " + result)

  return result
}
