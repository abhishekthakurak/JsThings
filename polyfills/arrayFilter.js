// array filter without second thisArg
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback) {
        if ( ! ((typeof callback === 'Function'
                || typeof callback === 'function')
                && this)) {
            throw new TypeError();
        }
        let array = this
        let newArray = []
        for (let index in array) {
        const status = callback(array[index], index, array)
            if (status) {
                newArray.push(array[index])
            }
        }
        return newArray
    }
}
  
const array = [{value: 1}, {value: 3}, {value: 4},{value: 9}, {value: 10},{value: 3}, {value: 5}]
  
console.log(array.filter(({value})=> value < 5))
  
  