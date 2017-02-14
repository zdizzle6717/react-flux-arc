'use strict';
let bitToString1 = (2 >>> 0).toString(2);
let bitToString2 = (4 >>> 0).toString(2);
let bitToString3 = (8 >>> 0).toString(2);
let bitToString4 = (16 >>> 0).toString(2);
let bitToString5 = (32 >>> 0).toString(2);


let test = (1 << 1).toString(2);
let test2 = (1 << 2).toString(2);
let test3 = (1 << 3).toString(2);
let test4 = (1 << 4).toString(2);
let test5 = (1 << 5).toString(2);

console.log('bitToString: ' + bitToString1);
console.log('bitToString: ' + bitToString2);
console.log('bitToString: ' + bitToString3);
console.log('bitToString: ' + bitToString4);
console.log('bitToString: ' + bitToString5);

console.log(test);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
