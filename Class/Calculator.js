class Calculator {
    #value
  
    constructor(value) {
        this.#value = value
    }

    init(value) {
        this.#value= value
        return this
    }

    add (value) {
        this.#value += value
        return this
    }

    val () {
        return this.#value
    }
}

const cal = new Calculator ()

cal.init(3).add(4).add(5).val()



// Second method 

function Calculator () {
    function inner () {
      let temp
      function init (value) {
         temp = value
         return this
      }
    
      function add (value) {
         temp += value
         return this
      }
    
      function val() {
        return temp
      }
      
      return { init, add, val}
      
    } 
   return inner() 
  }
  
  const cal = new Calculator();
  
  cal.init(3).add(5).add(6).val()
  
  
  cal.value = 20
  
  console.log(cal.val())

