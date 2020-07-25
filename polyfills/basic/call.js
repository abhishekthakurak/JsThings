
if (!Function.prototype.call) {
  Function.prototype.call = function (context, ...args) {
    context.fnName = this
    context.fnName(...args)
  }
}
