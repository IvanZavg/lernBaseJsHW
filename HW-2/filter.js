function newArrFilter (arr, fn){
  if (arguments.length < 2) {
    throw new Error('You must set min 2 arguments to newArrFilter (Array, Function)');
  }
  else if (!Array.isArray(arguments[0])) {
    throw new Error('First argument in newArrFilter must be an Array');
  }
  else if (typeof arguments[1] !== 'function') {
    throw new Error('Second argument in newArrFilter must be a Function');
  }

  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) newArr.push(arr[i]);
  }
  return newArr;
}

//check newArrFilter
console.log(newArrFilter([1,2,3,4,6], (el)=> (el%2))); //[ 1, 3 ]