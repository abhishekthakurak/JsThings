import { EventEmitter } from "events";

let cycle = 0;

let emitter = new EventEmitter();

emitter.on("produce", function(v) {
  console.log(`produce ${v}`);
});
emitter.on("consume", function(v) {
  console.log(`consume ${v}`);
});

emitter.on("full", function(arr) {
  consumer(arr).next();
});
emitter.on("empty", function(arr) {
  producer(arr).next();
});

function produce(arr, from = 0, to = 10) {
  switch (from) {
    case to:
      emitter.emit("full", arr);
      return;
    default:
      emitter.emit("produce", from);
      produce((arr.push(from), arr), from + 1, to);
  }
}

function consume(arr) {
  switch (arr.length) {
    case 0:
      emitter.emit("empty", arr);
      return;
    default:
      emitter.emit("consume", arr[0]);
      consume((arr.shift(), arr));
  }
}

function producer(arr) {
  switch (cycle) {
    case 2:
      return;
    default:
      cycle += 1;
      produce(arr);
  }
}

function consumer(arr) {
  consume(arr);
}

// Usage:
// import { producer } from './producer_consumer.js'
// producer([]).next()
