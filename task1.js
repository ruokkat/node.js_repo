//задача 1
function adding(num) {
    let summary = num;

    function inner_adding(nextNum) {
        if (nextNum !== undefined) {
            summary += nextNum;
            return inner_adding;//повертаю саму функцію для можливості виклику далі
        } else {
            return summary;//повертаю суму, коли більше параметрів не передано
        }
    }

    return inner_adding;//виклик функції
}

console.log(adding(2)(5)(7)(1)(6)(5)(11)());


//задача 2
function is_anagram(string_1, string_2) {
    const sorted_string1 = string_1.toLowerCase().split('').sort().join(''); // перетворюю рядки у нижній регістр, розбиваю на масив символів, сортую та злиття назад в рядок
    const sorted_string2 = string_2.toLowerCase().split('').sort().join(''); // для порівняння

    return sorted_string1 === sorted_string2; // повертає true, якщо відсортовані рядки однакові - означає що вони є анаграмами
}

console.log(is_anagram('cafe', 'face')); // вихід: true
console.log(is_anagram('Kyiv', 'home')); // вихід: false


//задача 3
function deep_сlone(obj) {
    if (obj === null || typeof obj !== 'об єкт: ') {
        return obj; // якщо obj є простим типом даних або null - повертаємо його без клонування
    }

    let clone; // змінна клон буде містити клон об'єкта або масива

    if (obj instanceof Array) { // якщо obj є масивом створюємо новий пустий масив
        clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deep_сlone(obj[i]); // рекурсивно клонуємо елементи масиву
        }
    } else { // якщо obj є об'єктом створюємо новий пустий об'єкт
        clone = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deep_сlone(obj[key]); // Рекурсивно клонуємо властивості об'єкта
            }
        }
    }

    return clone; // Повертаємо клонований об'єкт або масив
}

const obj = {a: 69, b: {c: 27}};
const clonedObj = deep_сlone(obj);
console.log(clonedObj); // вихід: { a: 69, b: { c: 27 } }
console.log(obj === clonedObj); // вихід: false

//задача 4
function wrapper(fn) {
    const cache = {}; //об'єкт для збереження кешованих результатів

    return function (...args) {
        const key = JSON.stringify(args); //створення ключа шляхом серіалізації аргументів функції в рядок

        if (cache[key]) { //перевіряємо чи результат кешований за заданим ключем
            console.log('з кешу');
            return cache[key]; //повертаємо кешований результат
        }

        const result = fn(...args); //виклик оригінальної функції з переданими аргументами
        cache[key] = result; // зберігаємо результату в кеші за ключем
        console.log('обраховано');
        return result; // ну і повертаємо результат :)
    };
}

const calc = (a, b, c) => a + b + c;
const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 2, 3)); // вихід: Calculated, 7
console.log(cachedCalc(5, 8, 1)); // вихід: Calculated, 14
console.log(cachedCalc(2, 2, 3)); // вихід: From cache, 7