// @ts-ignore
import express, { Request, Response } from 'express';

interface User {
    id: string;
    username: string;
    name?: string;
}

const app = express();
app.use(express.json());

let users: User[] = [];

// Ендпоінт для створення користувача
app.post('/users', (req: Request, res: Response) => {
    const { username, name } = req.body;
    const id = Date.now().toString(); // Генеруємо унікальний ідентифікатор
    const newUser: User = { id, username, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Ендпоінт для отримання даних користувача за його id
app.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});

// Ендпоінт для отримання списку користувачів
app.get('/users', (_req: Request, res: Response) => {
    res.json(users);
});

// Ендпоінт для оновлення даних користувача за його id
app.put('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, name } = req.body;
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const updatedUser = { ...users[userIndex], username, name };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
});

// Ендпоінт для видалення користувача за його id
app.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.json(deletedUser);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
