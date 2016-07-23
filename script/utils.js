define([], function () {
	return {
		each: function (arr, fn) {
			for (var i = 0; i < arr.length; i++) {
				fn.call(arr[i], i, arr[i]);
			}
		}
	};
});