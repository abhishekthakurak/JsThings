const throttle = (func, limit) => {
  let lastTimeoutId
  let lastRan
  return function() {
    if (!lastRan) {
      func.apply(this, arguments)
      lastRan = Date.now()
    } else {
      clearTimeout(lastTimeoutId)
      lastTimeoutId = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, arguments)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}


  