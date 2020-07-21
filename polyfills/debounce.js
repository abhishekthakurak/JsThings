
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this;
        const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

/* usage */

var myEfficientFn = debounce(function() {
    // All the taxing stuff you do
    console.log('debounce called')
}, 250);

window.addEventListener('resize', myEfficientFn);




// const debounce = (func, delay) => {
//     let inDebounce
//     return function() {
//       const context = this
//       const args = arguments
//       clearTimeout(inDebounce)
//       inDebounce = setTimeout(() => func.apply(context, args), delay)
//     }
//   }