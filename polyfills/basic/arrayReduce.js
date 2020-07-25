if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback /*, initialValue */) {
    if (this === null) {
      throw new TypeError(
        'Array.prototype.reduce ' + 'called on null or undefined'
      )
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }

    const array = this
    const len = array.length
    let index = 0
    let value
    if (arguments.length >= 2) { // initial value is present
      value = arguments[1] // set initial value
    } else {
      if (len == 0) { // no inital value provided so assign first value as initial value
        throw new TypeError('Reduce of empty array ' +
                  'with no initial value')
      }
      index = 1
      value = array[0]
    }
    for (; index < len; index++) {
      value = callback(value, array[index], index, array)
    }
    return value
  }
}

const res = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }].reduce(function (accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue.value
}, 10)

console.log(res)
