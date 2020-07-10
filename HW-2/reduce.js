function newArrReduce (arr, fn, initVal){
  if (arguments.length < 2) {
    throw new Error('You must set min 2 arguments to newArrReduce (Array, Function)');
  }
  else if (!Array.isArray(arguments[0])) {
    throw new Error('First argument in newArrReduce must be an Array');
  }
  else if (typeof arguments[1] !== 'function') {
    throw new Error('Second argument in newArrReduce must be a Function');
  }

  let accumulator, startIndex; 

  if (arguments[2] !== undefined) {
    accumulator = initVal;
    startIndex  = 0;
  } 
  else {
    accumulator = arr[0];
    startIndex  = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = fn(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

//check newArrEvery
//1
console.log(newArrReduce([[0, 1], [2, 3], [4, 5]], (a, b) => a.concat(b))); // [0, 1, 2, 3, 4, 5]
//2
console.log(newArrReduce([ [2, 3], [4, 5]], (a, b) => a.concat(b), [0,1])); // [0, 1, 2, 3, 4, 5]
//3
console.log(newArrReduce([1,2,3,4,5,6], (a, b) => a + b)); // 21
//4
console.log(newArrReduce([1,2,3,4,5,6], (a, b) => a + b, 19)); // 40
  