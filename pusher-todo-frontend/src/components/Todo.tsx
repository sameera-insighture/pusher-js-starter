import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTodos, createTodo, deleteTodo } from "services/api";
import pusher from "services/pusher";
import useSnackbar from "./Snackbar/useSnackbar";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const showSnackbar = useSnackbar();
  // const [notification, setNotification] = useState<string>("");
  // const [notificationsCount, setNotificationsCount] = useState<number>(0);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
    fetchTodos();

    const channel = pusher.subscribe("todos");
    channel.bind("created", (data: Todo) => {
      setTodos((prevTodos) => [...prevTodos, data]);
    });

    channel.bind("deleted", (data: Todo) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== data.id));
    });

    return () => {
      pusher.unsubscribe("todos");
    };
  }, []);

  const handleCreateTodo = async () => {
    if (newTodo.trim() !== "") {
      createTodo(newTodo);
      setNewTodo("");
      showSnackbar(
        "Todo created successfully. It will take sometimes to create this todo",
        { color: "success", closeIcon: true }
      );
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <Container id="todo" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          <Stack>
            <Box mb={3}>
              <Typography variant="h3">Todo Application</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box flexGrow={1}>
                <TextField
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="New Todo"
                  size="small"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateTodo}
                >
                  Add Todo
                </Button>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <List>
              {todos.map((todo) => (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={todo.title} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Todo;
