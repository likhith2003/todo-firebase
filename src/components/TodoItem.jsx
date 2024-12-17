import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  // Convert Firestore Timestamp to a JavaScript Date if needed
  const createdAt = todo.createdAt?.toDate ? todo.createdAt.toDate() : new Date(todo.createdAt);

  return (
    <div className="todo">
      <div>{createdAt.toLocaleString("en-US")}</div>
      <h2 className="todo-text">{todo.text}</h2>
      <button onClick={() => dispatch(deleteTodo(todo.id))} className="close">
        X
      </button>
    </div>
  );
};

export default TodoItem;
