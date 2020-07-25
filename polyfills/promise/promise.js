const checkForThen = arg => arg && arg.then && typeof arg.then === 'function'
class Promise {
  constructor (executor) {
    this.value = undefined
    this.handlers = []
    this.status = 'PENDING'

    try {
      // executor is the function which takes 2 callbacks resolve, reject
      executor(
        value => {
          this.resolve(value)
        },
        reason => {
          this.reject(reason)
        }
      )
    } catch (error) {
      // if the executor fails then also the promise rejects with error
      this.reject(error)
    }
  }

  resolve (value) {
    this.setResult(value, 'FULFILLED')
  }

  reject (value) {
    this.setResult(value, 'REJECTED')
  }

  setResult (value, state) {
    const set = () => {
      if (this.status !== 'PENDING') {
        return null
      }
      if (checkForThen(value)) {
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

  executeHandlers () {
    if (this.status === 'PENDING') {
      return null
    }
    this.handlers.forEach(handler => {
      if (this.status === 'REJECTED') {
        return handler.onFail(this.value)
      }
      return handler.onSuccess(this.value)
    })
    this.handlers = []
  }

  attachHandler (handler) {
    this.handlers = [...this.handlers, handler]
    this.executeHandlers()
  }

  then (onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      return this.attachHandler({
        onSuccess: result => {
          if (!onSuccess) {
            return resolve(result)
          }
          try {
            return resolve(onSuccess(result))
          } catch (e) {
            return reject(e)
          }
        },
        onFail: reason => {
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
    return this.then(
      value => {
        return helper(this.constructor.resolve, value)
      },
      reason => {
        return helper(this.constructor.reject, reason)
      }
    )
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
    return new Promise(resolve => {
      let numResolved = 0
      const add = (value, status, index) => {
        resolved[index] = {
          [status === 'fulfilled' ? 'value' : 'reason']: value,
          status
        }
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

/* Example for creation */
var P1 = new APromise((resolve, reject) => {
  resolve(100)
})
// var P2 = new APromise((resolve, reject) => {
//   resolve(40);
// });
// /* Example for chaining */
P1.then(
  function (d) {
    console.log('d', d)
    return d * 20
  },
  function (e) {
    throw e
  }
).then(
  function (d) {
    console.log('d', d)
  },
  function (e) {
    throw e
  }
)
// P1.then(
//   function(d) {
//     return d * 2;
//   },
//   function(e) {
//     throw e;
//   }
// ).then(
//   function(d) {
//     return d * 2; //----- 80
//   },
//   function(e) {
//     throw e;
//   }
// );
// const x = P1.then(
//   function(d) {
//     throw new Error("test");
//   },
//   function(e) {
//     throw e;
//   },
//   "x"
// );
// x.then(
//   function(d) {
//     return d * 2; //----- 80
//   },
//   function(e) {
//     console.log("test-------error");
//     throw e;
//   },
//   'y'
// );
/* Example for nesting */
// P1.then(
//   function(d) {
//     return P2;
//   },
//   function(e) {
//     throw e;
//   }
// )
//   .then(
//     function(d) {
//       return new APromise((res, rej) => {
//         console.log("d", d);
//         setTimeout(() => {
//           rej(d - 10);
//         }, 2000);
//       });
//     },
//     function(e) {
//       throw e;
//     }
//   )
//   .then((null, v => console.log(v)));
