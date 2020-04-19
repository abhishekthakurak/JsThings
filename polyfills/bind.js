// using apply

if (!Function.prototype.bind) {
    Function.prototype.bind = function (context /* ...args */) {
      var fn = this;
      var args = Array.prototype.slice.call(arguments, 1);
      return function () {
        return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
      };
    };
}

// using call

if (!Function.prototype.bind) {
    Function.prototype.bind = function (context /* ...args */) {
      var fn = this;
      var args = Array.prototype.slice.call(arguments, 1);
      return function () {
        return fn.call(context, ...args.concat(Array.prototype.slice.call(arguments)));
      };
    };
}

// shorter syntax



if (!Function.prototype.bind) {
    Function.prototype.bind = function (context, ...args1) {
        let fn = this;
        return function (...arg2) {
            fn.apply(context, [...args1, ...arg2])
        }
    };
}
