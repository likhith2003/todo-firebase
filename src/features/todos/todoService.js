import { db, auth } from "../../firebaseConfig"; // Ensure Firestore and Auth are initialized here
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Reference to the 'todos' collection in Firestore
const todosRef = collection(db, "todos");

// Create a new todo
const createTodo = async (todoData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const response = await addDoc(todosRef, { ...todoData, userId: user.uid });
  return { id: response.id, ...todoData };
};

// Get all todos for the logged-in user
const getTodos = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const querySnapshot = await getDocs(todosRef);
  const todos = [];
  querySnapshot.forEach((doc) => {
    const todo = { id: doc.id, ...doc.data() };
    if (todo.userId === user.uid) {
      todos.push(todo);
    }
  });
  return todos;
};

// Delete a specific todo
const deleteTodo = async (todoId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const todoDoc = doc(db, "todos", todoId);
  await deleteDoc(todoDoc);
  return { id: todoId };
};

const todoService = {
  createTodo,
  getTodos,
  deleteTodo,
};

export default todoService;
