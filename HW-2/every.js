function newArrEvery (arr, fn){
  if (arguments.length < 2) {
    throw new Error('You must set min 2 arguments to newArrEvery (Array, Function)');
  }
  else if (!Array.isArray(arguments[0])) {
    throw new Error('First argument in newArrEvery must be an Array');
  }
  else if (typeof arguments[1] !== 'function') {
    throw new Error('Second argument in newArrEvery must be a Function');
  } 

  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) return false;
  }
  return true
}

//check newArrEvery
//1
console.log(newArrEvery([1,2,3,4,5,6], (el)=> (el % 2))); //false
//2
console.log(newArrEvery([1,3,5], (el)=> (el % 2))); //true