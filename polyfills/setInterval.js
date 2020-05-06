function setIntervalPolyfill() {
    let nodes = [];
  
    function setInterval(fn, time) {
      let id = nodes.length;
      nodes.push(true);
      function repeat() {
        setTimeout(() => {
          if (!nodes[id]) {
            return;
          }
          fn();
          repeat();
        }, time);
      }
      repeat();
      return id;
    }
  
    function clearInterval(id) {
      nodes[id] = false;
    }
  
    return {
      clearInterval,
      setInterval
    };
}
  
const { clearInterval, setInterval } = setIntervalPolyfill();
let timerId = setInterval(callback, 1000);
let id = 0;
function callback() {
    console.log("interval is running");
    id++;
    if (id > 3) {
      clearInterval(timerId);
    }
}
  
  