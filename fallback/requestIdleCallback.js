window.requestIdleCallback = function (cb) {
  const start = Date.now()
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: () => {
        return Math.max(0, 50 - (Date.now() - start))
      }
    })
  }, 1)
}


window.cancelIdleCallback = function (id) {
  clearTimeout(id)
}

