import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your Laravel backend URL
});

// API calls for "Todos"
export const getTodos = () => api.get('/todos'); // GET - Fetch todos
export const addTodo = (todo) => api.post('/todos', todo); // POST - Add a new todo
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo); // PUT - Update a todo
export const deleteTodo = (id) => api.delete(`/todos/${id}`); // DELETE - Remove a todo
