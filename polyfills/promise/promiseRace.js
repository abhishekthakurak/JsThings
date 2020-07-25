// False Promises
const firstPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data payload from the first promise...'), 1000)
  })
}

const secondPromise = () => {
  return new Promise((_, reject) => {
    setTimeout(() =>
      reject('Promise has rejected...')
    , 3000)
  })
}

function promiseRace (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

promiseRace([firstPromise(), secondPromise()])
  .then(response => {
    console.log(response)
  })

  .catch(error => {
    console.log('error', error)
  })
