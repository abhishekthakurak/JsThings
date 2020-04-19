function add (total) {
    function recursor(){
      let args = Array.prototype.slice.apply(arguments);
      function resultFn() {
          args = args.concat(Array.prototype.slice.apply(arguments));
          if (args.length>=total) {
                return args.slice(0,total).reduce(
                    function (acc , next) { 
                    return acc+next
                },0); //will only sum first {total} arguments
          }
          return resultFn;
      }
      return resultFn();
    }
    return recursor
  }
  
  let myAdd = add(3)
  myAdd(1, 3, 5)
  myAdd(1, 2)(4)
  myAdd(1)(2, 5)
  myAdd(1)(2)(2)

  