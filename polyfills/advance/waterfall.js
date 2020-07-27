/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
*/

const waterfall = (array, final) => {
  const cb = (err, ...args) => {
    if (err) {
      final(err)
      return
    }
    const [nextCallback] = array.splice(0, 1)
    if (!nextCallback) {
      final(...args)
      return
    }
    nextCallback(null, ...args, cb)
  }
  cb(null)
}

export default waterfall
