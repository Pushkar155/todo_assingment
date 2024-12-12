import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) =>
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false }, // Assign unique id
    ]);

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((_, index) => index !== id));

  const updateTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, updateTask, toggleTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
