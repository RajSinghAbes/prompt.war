const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = String(req.body.task || '').trim();
    if (!task) return res.status(400).json({ error: 'Task is required' });

    tasks.push(task);
    res.status(201).json({ message: 'Task added', tasks });
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= tasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(id, 1);
    res.json({ message: 'Task deleted', tasks });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
