const isThenable = arg => arg && arg.then && typeof arg.then === 'function'
class Promise {

  constructor (executor) {
    this.result = undefined
    this.handlers = []
    this.status = 'PENDING'
    try {
      // executor is the function which takes 2 callbacks resolve, reject
      executor((value) => {
        this.resolve(value)
      }, (reason) => {
        this.reject(reason)
      })
    } catch (e) {
      // if the executor fails then also the promise rejects with error
      this.reject(e)
    }
  } // done

  setResult (value, state) {
    const set = () => {
      if (this.status !== 'PENDING') {
        return null
      }
      if (isThenable(value)) {
        return value.then(this.resolve, this.reject)
      }
      this.value = value
      this.status = state
      // call all then, catch, finally chains
      return this.executeHandlers()
    }
    // promise should be resolved async always
    setTimeout(set, 0)
  }

  attachHandler (handler) {
    this.handlers = [...this.handlers, handler]
    this.executeHandlers()
  }

  executeHandlers () {
    if (this.status === 'PENDING') {
      return null
    }
    this.handlers.forEach((handler) => {
      if (this.status === 'REJECTED') {
        return handler.onFail(this.value)
      }
      return handler.onSuccess(this.value)
    })
    this.handlers = []
  }

  then (onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      return this.attachHandler({
        onSuccess: (result) => {
          if (!onSuccess) {
            return resolve(result)
          }
          try {
            return resolve(onSuccess(result))
          } catch (e) {
            return reject(e)
          }
        },
        onFail: (reason) => {
          if (!onFail) {
            return reject(reason)
          }
          try {
            return resolve(onFail(reason))
          } catch (e) {
            return reject(e)
          }
        }
      })
    })
  }

  resolve (value) {
    this.setResult(value, 'FULFILLED')
  }

  reject (value) {
    this.setResult(value, 'REJECTED')
  }

  static resolve (value) {
    return new Promise((resolve) => {
      return resolve(value)
    })
  }

  static reject (value) {
    return new Promise((resolve, reject) => {
      return reject(value)
    })
  }

  // effectively this means promise status has already been changed to REJECTED, and the value is also final, now we just have to chain this thing, hence just calling this.then with just the onReject function will suffice
  catch (onRejection) {
    return this.then(null, onRejection)
  }
  // finally also doesnt deal with manipulating the status, value of the current promise
  // it only returns a new Promise with same status/value as the current one, after calling the callback
  // therefore executing the callback in both onReject, onResolve then returning the resolved, rejected new promise will do the trick
  // except in case when the callback itself fails, then you need to reject with the catched error
  finally (callback) {
    const helper = (executor, value) => {
      try {
        callback()
        return executor.call(this, value)
      } catch (e) {
        return this.constructor.reject(e)
      }
    }
    return this.then(value => {
      return helper(this.constructor.resolve, value)
    }, reason => {
      return helper(this.constructor.reject, reason)
    })
  }

  // promise.all takes an array of promises and returns 1 single promise which resolves with an array of the resolved values of all the input promises. in case any single promise rejects, then it doesnt wait for the others, and it rejects immediately
  static all (promises) {
    const resolved = []
    const numPromises = promises.length
    return new Promise((resolve, reject) => {
      let numResolved = 0
      const add = (value, index) => {
        resolved[index] = value
        numResolved++
        if (numResolved === numPromises) {
          resolve(resolved)
        }
      }
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            add(value, index)
          },
          // reject this new promise even if one of them rejects
          reject
        )
      })
    })
  }

  // promise.race accepts an array of promises and returns a single promise, and as soon as on of them resolves, or rejects, this new promise also resolves/rejects without waiting for others, with the resolve/rejection of the "fulfilled promise"
  static race (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  // promise.all takes an array of promises and returns 1 single promise which resolves only after all input promises are settled with an array of the resolved/rejected values of all the input promises.
  static allSettled (promises) {
    const resolved = []
    const numPromises = promises.length
    return new Promise((resolve) => {
      let numResolved = 0
      const add = (value, status, index) => {
        resolved[index] = { [status === 'fulfilled' ? 'value' : 'reason']: value, status }
        numResolved++
        if (numResolved === numPromises) {
          resolve(resolved)
        }
      }
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            add(value, 'fulfilled', index)
          },
          value => add(value, 'rejected', index)
        )
      })
    })
  }
}
Promise.reject('x').then(() => {
  console.log('r')
  return 'r'
}, () => {
  console.log('j')
  return 'j'
}).then((x) => {
  console.log('r1', x)
  return 'r1'
}, (j) => {
  console.log('j1')
  return 'j1'
}).then((x) => {
  console.log('r2', x)
  return 'r2'
}, (j) => {
  console.log('j2')
  return 'j2'
}).finally(x => console.log('f', x)).then(x => console.log(x))
final(err, ressult)
item(args, callback)



// const waterfall = (array, final) => {
//   const cb = (err, ...args) => {
//     if (err) {
//       final(err)
//       return
//     }
//     const [nextCallback] = array.splice(0, 1)
//     if (!nextCallback) {
//       final(...args)
//       return
//     }
//     nextCallback(null, ...args, cb)
//   }
//   cb(null)
// }
// [].reduce((res, value, index) => {
//   return res
// }, [])
// Array.prototype.reduce = function (executor, accumulator) {
//   const array = this
//   for (let index in array) {
//     const value = array[index]
//     console.log(value, index, accumulator)
//     accumulator = executor(accumulator, value, index)
//   }
// }