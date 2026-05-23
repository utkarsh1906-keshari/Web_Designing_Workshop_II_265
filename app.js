let numbers = [1,2,3,4,5];
console.log(numbers[0]);
console.log(numbers[1]);
console.log(numbers[2]);
console.log(numbers[3]);
console.log(numbers[4]);
console.log(numbers[5]);

//array with multiple data types
let mixedArray = [1,"Hello" , true ,{name : "Alice"} , [1,2,3]];
console.log(mixedArray[0]);
console.log(mixedArray[1]);
console.log(mixedArray[2]);
console.log(mixedArray[3]);
console.log(mixedArray[4]);

//To find the length of array
console.log(numbers.length);


//normal function with no parameter
function greet (){
    console.log("Hello , world")
}
greet();

//normal function
function multiply(a,b){
    return a*b;
};
console.log(multiply(10,2));

//Division
function division(a,b){
    return a/b;
};
console.log(division(10,2));

//normal function with expression
const add = function(a,b){
return a+b;
};
console.log(add(5,7));


//arrow function with no parameters
let sayHi = () => console.log("Hii");
sayHi();

//arrow function with single parameters
let square = x => x*x;
console.log(square(4)); //16

//arrow function with one parameter 
const greetUser = (name) =>{
    console.log(`Hello, ${name}!`);
}
greetUser("Swayam");

//Map on array 
//Map creates a new arrray by applying a function to each element of the original array
let newarray = [1,2,3,4,5];
let squarredArray = newarray.
map((num) => num*num);
console.log(squarredArray);
