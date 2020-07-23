// second argument is not supported

if (typeof Object.create !== "function") {
    Object.create = function (proto) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        }
        function F() {}
        F.prototype = proto;
        return new F();
    };
}