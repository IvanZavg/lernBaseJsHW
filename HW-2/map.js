function newArrMap (arr, fn){
	if (arguments.length < 2) {
		throw new Error('You must set min 2 arguments to newArrMap (Array, Function)');
	}
	else if (!Array.isArray(arguments[0])) {
		throw new Error('First argument in newArrMap must be an Array');
	}
	else if (typeof arguments[1] !== 'function') {
		throw new Error('Second argument in newArrMap must be a Function');
	}

	let newArr = [];

	for (let i = 0; i < arr.length; i++) {
		newArr.push(fn(arr[i], i, arr))
	}
	return newArr;
}

//check newArrMap
console.log(newArrMap([1,2,3,4,5], (el) => el*2)); //[ 2, 4, 6, 8, 10 ]