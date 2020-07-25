
if (!Function.prototype.apply) {
  Function.prototype.apply = function (context, args) {
    context.fnName = this
    context.fnName(...args)
  }
}
