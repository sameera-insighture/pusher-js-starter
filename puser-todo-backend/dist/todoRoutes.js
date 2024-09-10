"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pusher_1 = __importDefault(require("./pusher")); // Import the Pusher instance
const router = express_1.default.Router();
let todos = [];
let currentId = 1;
router.get("/", (req, res) => {
    res.json(todos);
});
router.post("/", (req, res) => {
    const newTodo = {
        id: currentId++,
        title: req.body.title,
        completed: false,
    };
    // Simulate a delay of 20 seconds
    setTimeout(() => {
        todos.push(newTodo);
        pusher_1.default.trigger("todos", "created", newTodo); // Use the imported Pusher instance
        res.json(newTodo);
    }, 20000); // 20 seconds delay
});
router.put("/:id", (req, res) => {
    const todo = todos.find((t) => t.id === +req.params.id);
    if (todo) {
        todo.title = req.body.title;
        todo.completed = req.body.completed;
        pusher_1.default.trigger("todos", "updated", todo); // Use the imported Pusher instance
        res.json(todo);
    }
    else {
        res.status(404).send("Todo not found");
    }
});
router.delete("/:id", (req, res) => {
    const todoIndex = todos.findIndex((t) => t.id === +req.params.id);
    if (todoIndex > -1) {
        const [deletedTodo] = todos.splice(todoIndex, 1);
        pusher_1.default.trigger("todos", "deleted", deletedTodo); // Use the imported Pusher instance
        res.json(deletedTodo);
    }
    else {
        res.status(404).send("Todo not found");
    }
});
exports.default = router;
