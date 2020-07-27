var Cache = {
  cacheData: {},

  get: (key) => {
    if (Cache.cacheData.hasOwnProperty(key) && Cache.cacheData[key].val) {
      return Cache.cacheData[key].val
    }
    return false
  },

  set: (key, value, expiry) => {
    Cache.clear(key) // Clear before we store it so we can clean up the timeout.

    var to = false
    if (expiry && parseInt(expiry) > 0) {
      to = setTimeout(function () {
        Cache.clear(key)
      }, parseInt(expiry))
    }

    Cache.cacheData[key] = {
      expiry: expiry,
      val: value,
      timeout: to
    }
  },

  clear: (key) => {
    if (Cache.cacheData.hasOwnProperty(key)) {
      if (Cache.cacheData[key].to) {
        clearTimeout(Cache.cacheData[key].to)
      }

      delete Cache.cacheData[key]
      return true
    }

    return false
  }
}

export default Cache
