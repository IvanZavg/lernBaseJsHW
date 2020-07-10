function newArrSome (arr, fn){
	if (arguments.length < 2) {
		throw new Error('You must set min 2 arguments to newArrSome (Array, Function)');
	}
	else if (!Array.isArray(arguments[0])) {
		throw new Error('First argument in newArrSome must be an Array');
	}
	else if (typeof arguments[1] !== 'function') {
		throw new Error('Second argument in newArrSome must be a Function');
	}	

	for (let i = 0; i < arr.length; i++) {
		if (fn(arr[i], i, arr)) return true;
	}
	return false
}

//check newArrSome
//1
console.log(newArrSome([1,2,3,4,5,6], (el)=> (el === 2))); //true
//2
console.log(newArrSome([1,3,6], (el)=> (el === 2))); //false