// array map without second thisArg
if (Array.prototype.map) {
  Array.prototype.map = function (callback) {
    if (this == null) {
      throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }
    const array = this
    const newArray = []
    for (const index in array) {
      newArray.push(callback(array[index], index, array))
    }
    return newArray
  }
}

const array = [{ value: 1 }, { value: 3 }, { value: 4 }, { value: 9 }, { value: 10 }, { value: 3 }, { value: 5 }]

console.log(array.map(({ value }) => (value * 3)))
