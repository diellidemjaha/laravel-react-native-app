import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

// Define the Todo type
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const apiUrl = 'http://localhost:8000/api/todos'; // Replace <YOUR_LOCAL_IP>

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos on component load
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTodos(response.data); // Ensure that `response.data` is an array of Todo objects
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await axios.post(apiUrl, { title: newTodo });
        setNewTodo('');
        loadTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      console.log('Todo deleted successfully');
      loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteTodo = async (id: number) => {
    try {
      await axios.put(`${apiUrl}/${id}`, { completed: true });
      console.log('Todo completed successfully');
      loadTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          value={newTodo}
          placeholder="New Todo"
          onChangeText={setNewTodo}
          style={styles.input}
        />
        <Pressable onPress={handleAddTodo} style={styles.button}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </Pressable>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()} // Ensure `id` exists
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.title}
              </Text>
              <Pressable onPress={() => handleCompleteTodo(item.id)} style={styles.completeButton}>
                <Text style={styles.buttonText}>Complete</Text>
              </Pressable>
              <Pressable onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#28A745',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    padding: 5,
    borderRadius: 5,
  },
});
