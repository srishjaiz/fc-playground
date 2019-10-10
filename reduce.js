function curry(func) {
    return function curried(...args) {
        if(args.length >= func.length) {
            return func.apply(this, args);
        }
        else{
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

function reduce(callback, accumulator, arr){
    if(typeof callback !== 'function'){
        throw new TypeError("The parameter passed as the callback function is not a function.");        
    }
    if(Array.isArray(arr) === false) {
        throw new TypeError("The parameter passed as an Array is not an array.");        
    }
    
    if(arr.length==0 && accumulator==undefined){
        throw new TypeError("Callback function cannot be called on an empty array with no initial value provided.");        
    }
    else if(arr.length==0 && accumulator!=undefined){
        return accumulator;
    }
    else if(arr.length==1 && accumulator==undefined){
        return arr[0];
    }
    else{
        arr.forEach(element => {
            accumulator=callback(element,accumulator);
        });
    }
    return accumulator;
}



function map(callback, arr){
    let newArr=[];
    if (typeof callback !== 'function') {
        throw new TypeError('callback function is not a function');
    }
    reduce((element,result)=>{
        result=callback(element);
        newArr.push(result);
    },[],arr);
    return newArr;
}


function filter(callback, arr){
    let newArr=[];
    if (typeof callback !== 'function') {
        throw new TypeError('callback function is not a function');
    }
    reduce((element,result)=>{
        result=callback(element);
        result?newArr.push(result):result;
    },[],arr);
    return newArr;
}

function flat(depth, arr) {
    let newArr=[];
    function flatten(element, result) {
        if(Array.isArray(element) && depth > 0) {
            depth--;
            for(let i in element) {
                result = flatten(element[i], result);
            }
            depth++;
        }
        else{
            // result = result.push(element);
            newArr.push(element);
        }
        return newArr;
    }
    return reduce(flatten, [], arr);
}


function flatMap(callback, arr){
    let result = map(callback, arr);
    return flat(1, result);
}

function double(ele){
    return ele*2;
}
function test(ele){
    if(ele>=3){
        return ele;
    }
    return 0;
}






curRed=curry(reduce);
curMap=curry(map);
curFilter=curry(filter);
curFlat=curry(flat);
curFlatMap=curry(flatMap);


console.log(curRed((val,acc)=>{ return val+acc;})(10)([1,2,3,4,5])); //25
console.log(curRed((val,acc)=>{ return val+acc;})(undefined)([1])); //1
console.log(curRed((val,acc)=>{ return val+acc;})(10)([])); //10
// console.log(curRed((val,acc)=>{ return val+acc;})(undefined)([])); //typrerror thrown
console.log(curMap(double,[1,2,3,4]));
console.log(curFilter(test,[1,2,3,4]));


let arr = [[1,2], [4,5,6,7,[8,9,[13,14]]]];
window.b=arr;
window.c=curFlat(3, b);
console.log("Before flat: " + window.b + "\n After flat: " + window.c);

console.log(curFlatMap(e=>{
    return [e,2*e];
},[1,2,3,4,5]));
