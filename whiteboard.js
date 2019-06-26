
function balancedBrackets(backetString) {
    return false;
}

console.log(balancedBrackets('[]{}()'));   // should return true
console.log(balancedBrackets('[{[()]}]'));   // should return true
console.log(balancedBrackets('[({}}]'));   // should return false
