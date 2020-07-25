/**
 *
 * Question:- Run n promises in parallel and at a time there will be only promises which are being executed
 *
 */

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('1 resolved')
  }, 1000)
})
const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res('2 resolved')
  }, 1500)
})
const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res('3 resolved')
  }, 3000)
})
const p4 = new Promise((res, rej) => {
  setTimeout(() => {
    rej('4 rejected')
  }, 2000)
})
const p5 = new Promise((res, rej) => {
  setTimeout(() => {
    rej('5 rejected')
  }, 2000)
})

const promises = [p1, p2, p3, p4, p5]

function runMultiPromise (promises, limit) {
  let executed = 0
  let resolved = 0
  const result = []
  let runningPromises = 0
  function myPromise (promises, res, rej) {
    const executor = (data, index) => {
      result[index] = data
      resolved += 1
      runningPromises -= 1
      if (resolved === promises.length) {
        res(result)
      }
      myPromise(promises, res, rej)
    }
    promises
      .slice(executed, executed + limit - runningPromises)
      .forEach(promise => {
        const index = executed
        runningPromises += 1
        executed += 1
        promise
          .then(data => {
            executor(data, index)
          })
          .catch(error => {
            executor(error, index)
          })
      })
  }
  return new Promise((res, rej) => {
    myPromise(promises, res, rej)
  })
}

runMultiPromise(promises, 3).then(data => {
  console.log(data)
})
