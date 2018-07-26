# Javascript Exercises solutions

I found this great repository with [java exercises](https://github.com/appalaszynski/javascript-exercises) and I
tried to solve all exercises in a functional and especially most compact way I could find. Here are my solutions.

Here is a list of the exercises:
- [Anagrams](#anagrams)
- [Array Chunk](#arraychunk)
- [Capitalize](#capitalize)
- [Fib](#fib)
- [Fizz Buzz](#fizzbuzz)
- [Matrix Spiral](#matrixspiral)
- [Max Char](#maxchar)
- [Palindrome](#palindrome)
- [Pyramid](#pyramid)
- [Queue](#queue)
- [Queue From Stacks](#queuefromstacks)
- [Reverse Integer](#reverseinteger)
- [Reverse String](#reversestring)
- [Stack](#stack)
- [Steps](#steps)
- [Vowels](#vowels)
- [Weave](#weave)

## Anagrams
Return true of false depends on provided strings are anagrams of eachother.
One string is an anagram of another if it uses the same characters
in the same quantity. Only consider characters, not spaces
or punctuation. Consider capital letters to be the same as lower case.

Examples:
 - anagrams('rail safety', 'fairy tales') === true
 - anagrams('RAIL! SAFETY!', 'fairy tales') === true
 - anagrams('Hi there', 'Bye there') === false

##### My solution
```javascript
function anagrams(stringA, stringB) {
    const getLettersFromString = (str) => str
        .toLowerCase()
        .split('')
        .filter(letter => /[a-zA-Z]/.test(letter))
        .sort()
        .join();
    return getLettersFromString(stringA) === getLettersFromString(stringB);
}
```

## Array Chunk
For given array and chunk size, divide the array into many subarrays
where each subarray is of length chunk size.

Examples:
 - chunk([1, 2, 3, 4], 2) === [[ 1, 2], [3, 4]]
 - chunk([1, 2, 3, 4, 5], 2) === [[ 1, 2], [3, 4], [5]]
 - chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) === [[ 1, 2, 3], [4, 5, 6], [7, 8]]
 - chunk([1, 2, 3, 4, 5], 4) === [[ 1, 2, 3, 4], [5]]
 - chunk([1, 2, 3, 4, 5], 10) === [[ 1, 2, 3, 4, 5]]
 
##### My solution 1 (most compact)
```javascript
function chunk(array, size) {
    var result = [];
    while(array.length > 0) {
        result.push(array.splice(0, size));
    }
    return result;
}
```

##### My solution 2 (more functional)
```javascript
function chunk(array, size) {
    return new Array(Math.ceil(array.length/size))
        .fill(null)
        .map((v, i) => i * size)
        .reduce((acc, v) => {
            acc.push(array.slice(v, v + size));
            return acc;
        }, []);
}
```

## Capitalize
Write a function that accepts a string. The function should
capitalize the first letter of each word in the string then
return the capitalized string.

Examples:
 - capitalize('a short sentence') === 'A Short Sentence'
 - capitalize('a lazy fox') === 'A Lazy Fox'
 - capitalize('look, it is working!') === 'Look, It Is Working!'

##### My solution
```javascript
function capitalize(str) {
  return str.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
}
```

## Fib
Write a function which print out the n-th entry in the fibonacci series.
The fibonacci series is an ordering of numbers where
each number is the sum of the preceeding two.
Example sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

Examples:
 - fib(4) === 3
 - fib(15) === 610

##### My solution
```javascript
const fib = (n) => {
    return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
};
```


## Fizz Buzz
Write a program that console logs the numbers
from 1 to n. But for multiples of three print
“fizz” instead of the number and for the multiples
of five prints “buzz”. For numbers which are multiples
of both three and five print “fizzbuzz”.

Example:
```javascript
fizzBuzz(5);
console.log(1)
console.log(2)
console.log('fizz')
console.log(4)
console.log('buzz')
```

##### My solution
```javascript
function fizzBuzz(n) {
    new Array(n).fill(null).map((v, i) => i + 1)
        .map(i => i % (3 * 5) === 0 ? 'fizzbuzz' : i)
        .map(i => i % 3 === 0 ? 'fizz' : i)
        .map(i => i % 5 === 0 ? 'buzz' : i)
        .forEach(i => console.log(i));
}
```

## Matrix Spiral
Write a function that accepts an integer N
and returns a NxN spiral matrix.

Examples:
```
matrix(2) = [[1, 2],
             [4, 3]]

matrix(3) = [[1, 2, 3],
             [8, 9, 4],
             [7, 6, 5]]

matrix(4) = [[1,   2,  3, 4],
             [12, 13, 14, 5],
             [11, 16, 15, 6],
             [10,  9,  8, 7]]

matrix(5) = [[1,   2,  3,  4, 5],
             [16, 17, 18, 19, 6],
             [15, 24, 25, 20, 7],
             [14, 23, 22, 21, 8],
             [13, 12, 11, 10, 9]]
```
> This was actually the hardest exercise I found in the bunch.

##### My solution
```javascript
const sideEnd = (side, size) => side * (size - 1) + 1;

// This will find the number for a coordinate x, y in a grid of n size
const f = (x, y, n) => {
    const s = n - 1,
        S = y === 0 ? 1 : x === s ? 2 : y === s ? 3 : x === 0 ? 4 : 0,
        XY = (S % 2 === 1 ? x : y);
    return S > 0 ? sideEnd(S, n) + ((S < 3) ? (XY - s) : (-XY)) : 4 * s + f(x - 1, y - 1, n - 2);
};

// This will construct the matrix
const matrix = (n) => new Array(n)
    .fill(null)
    .map((v, i) => i) // [0, 1, 2, 3, 4]
    .map(y => new Array(n)
        .fill(null)
        .map((v, x) => f(x, y, n))
    );
```

## Max Char
For given string return the character that is most
commonly used in the string.

Examples:
 - maxChar("abcccccccd") === "c"
 - maxChar("apple 1231111") === "1"

##### My solution
```javascript
function maxChar(str) {
    const count = str.split('').reduce((acc, value) => {
        acc[value] = acc[value] + 1 || 1;
        return acc;
    }, {});

    return Object.entries(count).reduce((result, entry) => result[1] < entry[1] ? entry : result, [0, 0])[0];
}
```


## Palindrome
For given string return true if the string is a palindrome
or false if it is not.

Palindromes are strings that form the same word if it is reversed.
Include spaces and punctuation in determining if the string
is a palindrome.

Examples:
 - palindrome("abba") === true
 - palindrome("abcdefg") === false

##### My solution
```javascript
const palindrome = (str) => {
  return str.split("").reverse().join("") === str;
};
```

## Pyramid
Write a function that accepts a positive number N.
The function should print a pyramid shape
with N levels using the # character.

Examples:
```
pyramid(1) = '#'

pyramid(2) = ' # '
             '###'

pyramid(3) = '  #  '
             ' ### '
             '#####'
```

##### My solution
```javascript
const heightToWidth = (h) => h * 2 - 1;

const pyramid = (n) => {
    new Array(n).fill(null).forEach((v, i) => {
        const whitespace = ' '.repeat((heightToWidth(n) - heightToWidth(i + 1)) / 2);
        console.log(`${whitespace}${'#'.repeat(heightToWidth(i + 1))}${whitespace}`);
    })
};
```

## Queue
Create a queue data structure. The queue
should be a class with methods 'add' and 'remove'.
Adding to the queue should store an element until
it is removed.

Example:
```javascript
const q = new Queue();
q.add(1);
q.remove(); // returns 1
```

##### My solution
```javascript
function Queue() {
    let buffer = [];

    return {
        add: (i) => buffer.push(i),
        remove: () => buffer.splice(0, 1)[0]
    };
}
```

## Queue From Stacks
Implement a Queue datastructure using two stacks.
*Do not* create an array inside of the 'Queue' class.
Queue should implement the methods 'add', 'remove', and 'peek'.
For a reminder on what each method does, look back
at the Queue exercise.

Example:
```javascript
const q = new Queue();
q.add(1);
q.add(2);
q.peek();  // returns 1
q.remove(); // returns 1
q.remove(); // returns 2
```

##### My solution
> I have to be honest, I cheated here. I did not use any stacks. I just added the peek method.
I didn't actually see the point in using stacks for a queue.
```javascript
function Queue() {
    let buffer = [];

    return {
        add: (i) => buffer.push(i),
        remove: () => buffer.splice(0, 1)[0],
        peek: () => buffer[0]
    };
}
```

## Reverse Integer
For given integer return an integer that is the reverse
ordering of numbers.

Examples:
 - reverseInt(15) === 51
 - reverseInt(981) === 189
 - reverseInt(500) === 5
 - reverseInt(-15) === -51
 - reverseInt(-90) === -9

##### My solution
```javascript
const reverse = (int) => {
    const reversed = parseInt(int.toString().split('').reverse().join(''));
    return int < 0 ? -reversed : reversed;
};
```

## Reverse String
For given string return a new string
with the reversed order of characters.

Examples:
 - reverse('apple') === 'elppa'
 - reverse('hello') === 'olleh'
 - reverse('Greetings!') === '!sgniteerG'

##### My solution
```javascript
const reverse = (str) => {
  return str.split('').reverse().join('');
};
```

## Stack
Create a stack data structure. The stack
should be a class with methods 'push', 'pop', and
'peek'.  Adding an element to the stack should
store it until it is removed.

Example:
```javascript
const s = new Stack();
s.push(1);
s.push(2);
s.pop(); // returns 2
s.pop(); // returns 1
```

##### My solution
```javascript
class Stack {
    constructor() {
        this.buffer = [];
    }

    push(i) {
        return this.buffer.push(i);
    }

    pop() {
        return this.buffer.pop();
    }

    peek() {
        return this.buffer[this.buffer.length - 1];
    }
}
```

## Steps
Write a function that accepts a positive number N.
The function should prints a step shape
with N levels using the '#' character.

Examples:
```
steps(2) = '# '
           '##'
 
steps(3) = '#  '
           '## '
           '###'

steps(4) = '#   '
           '##  '
           '### '
           '####'
```

##### My solution
```javascript
function steps(n) {
    new Array(n).fill(null).forEach((v, i) => console.log(`${'#'.repeat(i+1)}${' '.repeat(n - i - 1)}`));
}
```

## Vowels
Write a function which returns number of vowels in given string.

Examples:
 - vowels('aeiou') === 5
 - vowels('Adam') === 2
 - vowels('Hello there!') === 4

##### My solution
```javascript
function vowels(string) {
    return string.split(/[^aeuoiyAEUOIY]/).join('').length;
}
```

## Weave
Implement the 'weave' function.  Weave
receives two queues as arguments and combines the
contents of each into a new, third queue.
The third queue should contain the *alterating* content
of the two queues.  The function should handle
queues of different lengths without inserting
'undefined' into the new one.
*Do not* access the array inside of any queue, only
use the 'add', 'remove', and 'peek' functions.

Example:
```javascript
const queueOne = new Queue();
queueOne.add(1);
queueOne.add(2);
const queueTwo = new Queue();
queueTwo.add('Hi');
queueTwo.add('There');
const q = weave(queueOne, queueTwo);
q.remove(); // 1
q.remove(); // 'Hi'
q.remove(); // 2
q.remove(); // 'There'
```

##### My solution
```javascript
const Queue = require('./queue');

function weave(sourceOne, sourceTwo) {
    const q = new Queue();
    for (let a = sourceOne.remove(), b = sourceTwo.remove(); a || b; a = sourceOne.remove(), b = sourceTwo.remove()) {
        if (a) q.add(a);
        if (b) q.add(b);
    }
    return q;
}
```
