import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 8080;

const todo_item = [];

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    status: "True",
    data: todo_item,
    message: "ToDo items fetched successfully",
  });
});

app.get("/health", (req, res) => {
  return res.json({ status: "True", message: "server is healthy" });
});

app.get("/todos", (req, res) => {
  return res.json({ todos: todo_item });
});

app.post("/todos", (req, res) => {
  const { todo } = req.body;
  todo_item.push(todo);
  return res.json({
    status: "True",
    todo: todo,
    message: "data added successfully",
  });
});

app.delete("/todos", (req, res) => {
  const { todo } = req.body;
  const index = todo_item.indexOf(todo);
  todo_item.splice(index, 1);
  if (index < -1) {
    return res.json({ status: "False", message: "todo items is not found" });
  } else {
    return res.json({
      status: "True",
      todo: todo,
      message: "todo item deleted successfully",
    });
  }
});
app.put("/todos", (req, res) => {
  const { oldTodo, newTodo } = req.body;
  const index = todo_item.indexOf(oldTodo);
  todo_item.splice(index, 1);
  todo_item.push(newTodo);
  if (index < -1) {
    res.json({ status: "false", message: "todo items is not found" });
  } else {
    res.json({
      status: "True",
      oldTodo: oldTodo,
      newTodo: newTodo,
      message: "todo item updated successfully",
    });
  }
});
