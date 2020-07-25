function sum (x, y, z) {
  return x + y + z
}

function curry (fn) {
  let args = []
  function curr () {
    const currentArgs = Array.prototype.slice.call(arguments)
    args = args.concat(currentArgs)
    if (args.length === 3) {
      return fn.apply(this, args)
    }
    return curr
  }
  return curr
}

const curriedFn = curry(sum)
curriedFn(10, 20, 30) // 60
curriedFn(10, 20)(30) // 60
curriedFn(10)(20)(30) // 60
curriedFn(10)(20)(30) // 100
