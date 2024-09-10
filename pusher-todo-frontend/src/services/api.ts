import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;
const API_URL = `${API_BASE_URL}/api/todos`;

export const getTodos = () => axios.get(API_URL);

export const createTodo = (title: string) => axios.post(API_URL, { title });

export const updateTodo = (id: number, title: string, completed: boolean) =>
  axios.put(`${API_URL}/${id}`, { title, completed });

export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
