"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var users = [];
// Ендпоінт для створення користувача
app.post('/users', function (req, res) {
    var _a = req.body, username = _a.username, name = _a.name;
    var id = Date.now().toString(); // Генеруємо унікальний ідентифікатор
    var newUser = { id: id, username: username, name: name };
    users.push(newUser);
    res.status(201).json(newUser);
});
// Ендпоінт для отримання даних користувача за його id
app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    var user = users.find(function (u) { return u.id === id; });
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});
// Ендпоінт для отримання списку користувачів
app.get('/users', function (_req, res) {
    res.json(users);
});
// Ендпоінт для оновлення даних користувача за його id
app.put('/users/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, username = _a.username, name = _a.name;
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    var updatedUser = __assign(__assign({}, users[userIndex]), { username: username, name: name });
    users[userIndex] = updatedUser;
    res.json(updatedUser);
});
// Ендпоінт для видалення користувача за його id
app.delete('/users/:id', function (req, res) {
    var id = req.params.id;
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    var deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.json(deletedUser);
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
