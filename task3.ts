type Add_f = (numb: number) => Add_f | number;

function add(...numbs: number[]): Add_f | number {
    let summary = 0;

    function inner_add(...next_numbs: number[]): Add_f | number {
        if (next_numbs.length > 0) {
            summary += next_numbs.reduce((acc, numb) => acc + numb, 0);
            return inner_add;
        } else {
            return summary;
        }
    }

    return inner_add(...numbs);
}

// @ts-ignore
console.log(add(2)(5)(7)(1)(6)(5)(11)());

function is_anagram(string1: string, string2: string): boolean {
    const sorted_string1 = string1.toLowerCase().split('').sort().join('');
    const sorted_string2 = string2.toLowerCase().split('').sort().join('');

    return sorted_string1 === sorted_string2;
}

console.log(is_anagram('cafe', 'face')); // Output: true
console.log(is_anagram('Kyiv', 'home')); // Output: false


type Cloneable = { [key: string]: Cloneable } | Cloneable[];

function deep_clone(obj: Cloneable): Cloneable {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let clone: Cloneable;

    if (obj instanceof Array) {
        clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deep_clone(obj[i]);
        }
    } else {
        clone = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deep_clone(obj[key]);
            }
        }
    }

    return clone;
}

const obj = { a: 1, b: { c: 2 } };
// @ts-ignore
const clonedObj = deepClone(obj);
console.log(clonedObj); // Output: { a: 1, b: { c: 2 } }
// @ts-ignore
console.log(obj === clonedObj); // Output: false


// @ts-ignore
type Cache = { [key: string]: number };

type Numeric_func = (...args: number[]) => number;

function wrapper(fn: Numeric_func): Numeric_func {
    // @ts-ignore
    const cache: Cache = {};

    return function (...args: number[]): number {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log('з кешу:');
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        console.log('обраховані: ');
        return result;
    };
}

const calc: Numeric_func = (a, b, c) => a + b + c;
const cached_calculation = wrapper(calc);

console.log(cached_calculation(2, 2, 3)); // Output: Calculated, 7
console.log(cached_calculation(5, 8, 1)); // Output: Calculated, 14
console.log(cached_calculation(2, 2, 3)); // Output: From cache, 7

