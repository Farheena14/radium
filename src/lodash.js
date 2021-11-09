const load = require('lodash')
console.log(load.last(["apple", "orange"]))
console.log(load.last(["apple", "orange", "mango"], 2))
let a = load.chunk(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"], 3)
console.log(a)
console.log("_____________________________________________________________________________________________")
let tail = load.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
console.log(tail)
console.log("_____________________________________________________________________________________________")
let union = load.union([1], [2, 2], [3], [4, 5], [2, 5])
console.log(union)
console.log("_____________________________________________________________________________________________")
let pairs = load.fromPairs(load.fromPairs([
    ['horror', 'The Shining'],
    ['drama', "Titanic"],
    ["thriller", "Shutter Island"],
    ["fantasy", "Pans Labyrinth"]
]))
console.log(pairs)