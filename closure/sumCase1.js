/**
 * Create a sum function which can do the following
 *
 * sum(1) // print 1
 * sum(2) // sum(2) in next line will print 3
 * sum(30) // sum(30) in next line will print 33
 *
 */

function sumWrapper () {
  let total = 0
  return function (adder) {
    total += adder
    return total
  }
}

const sum = sumWrapper()

console.log(sum(1))
console.log(sum(2))
console.log(sum(30))
