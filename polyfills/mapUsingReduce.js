// Create Array.map using Array.reduce

Array.prototype.map = function(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Pass a function as param");
    }

    let data = this.reduce((acc, value, index, array) => {
      let data = callback(value, index, array);
      acc.push(data);
      return acc;
    }, []);

    return data;
};
  
console.log(
    [1, 2, 3, 4].map((data) => {
      return {
        id: data * 2
      };
    })
);