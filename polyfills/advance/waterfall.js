
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