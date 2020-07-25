// using toString

function getSum (...args) {
  let total = 0
  function sum (...args) {
    for (const item of args) {
      total += item
    }
    return sum
  }

  sum.toString = function () {
    return total
  }

  return sum(...args)
}

console.log(0 + getSum(1, 2)(4, 3)(4)(5))

// using valueOf

function getSumV2 (...args) {
  let total = 0
  function sum (...args) {
    for (const item of args) {
      total += item
    }
    return sum
  }

  sum.valueOf = function () {
    return total
  }

  return sum(...args)
}

console.log(0 + getSumV2(1, 2)(4, 3)(4)(5))

// using extra ()

function getSumV3 (...args) {
  let total = 0
  function sum (...args) {
    for (const item of args) {
      total += item
    }
    if (args.length == 0) {
      return total
    }
    return sum
  }

  return sum(...args)
}

console.log(getSumV3(1, 2)(4, 3)(4)(5)())
