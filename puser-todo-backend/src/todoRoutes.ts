import express from "express";
import pusher from "./pusher"; // Import the Pusher instance

const router = express.Router();

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentId = 1;

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const newTodo: Todo = {
    id: currentId++,
    title: req.body.title,
    completed: false,
  };

  // Simulate a delay of 20 seconds
  setTimeout(() => {
    todos.push(newTodo);
    pusher.trigger("todos", "created", newTodo); // Use the imported Pusher instance
    res.json(newTodo);
  }, 20000); // 20 seconds delay
});

router.put("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === +req.params.id);
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    pusher.trigger("todos", "updated", todo); // Use the imported Pusher instance
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

router.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === +req.params.id);
  if (todoIndex > -1) {
    const [deletedTodo] = todos.splice(todoIndex, 1);
    pusher.trigger("todos", "deleted", deletedTodo); // Use the imported Pusher instance
    res.json(deletedTodo);
  } else {
    res.status(404).send("Todo not found");
  }
});

export default router;
