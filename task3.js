function add() {
    var numbs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbs[_i] = arguments[_i];
    }
    var summary = 0;
    function inner_add() {
        var next_numbs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            next_numbs[_i] = arguments[_i];
        }
        if (next_numbs.length > 0) {
            summary += next_numbs.reduce(function (acc, numb) { return acc + numb; }, 0);
            return inner_add;
        }
        else {
            return summary;
        }
    }
    return inner_add.apply(void 0, numbs);
}
// @ts-ignore
console.log(add(2)(5)(7)(1)(6)(5)(11)());
function is_anagram(string1, string2) {
    var sorted_string1 = string1.toLowerCase().split('').sort().join('');
    var sorted_string2 = string2.toLowerCase().split('').sort().join('');
    return sorted_string1 === sorted_string2;
}
console.log(is_anagram('cafe', 'face')); // Output: true
console.log(is_anagram('Kyiv', 'home')); // Output: false
function deep_clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var clone;
    if (obj instanceof Array) {
        clone = [];
        for (var i = 0; i < obj.length; i++) {
            clone[i] = deep_clone(obj[i]);
        }
    }
    else {
        clone = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deep_clone(obj[key]);
            }
        }
    }
    return clone;
}
var obj = { a: 1, b: { c: 2 } };
// @ts-ignore
var clonedObj = deepClone(obj);
console.log(clonedObj); // Output: { a: 1, b: { c: 2 } }
// @ts-ignore
console.log(obj === clonedObj); // Output: false
function wrapper(fn) {
    // @ts-ignore
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = JSON.stringify(args);
        if (cache[key]) {
            console.log('з кешу:');
            return cache[key];
        }
        var result = fn.apply(void 0, args);
        cache[key] = result;
        console.log('обраховані: ');
        return result;
    };
}
var calc = function (a, b, c) { return a + b + c; };
var cached_calculation = wrapper(calc);
console.log(cached_calculation(2, 2, 3)); // Output: Calculated, 7
console.log(cached_calculation(5, 8, 1)); // Output: Calculated, 14
console.log(cached_calculation(2, 2, 3)); // Output: From cache, 7
