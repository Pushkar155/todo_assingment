import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        {
          title: "Buy Groceries",
          description: "Purchase milk, eggs, and bread from the store.",
          dueDate: "2024-12-15",
          completed: false,
        },
        {
          title: "Complete React Project",
          description: "Finish the remaining components and test the app.",
          dueDate: "2024-12-14",
          completed: true,
        },
        {
          title: "Schedule Doctor's Appointment",
          description: "Call and schedule an appointment with Dr. Smith.",
          dueDate: "2024-12-20",
          completed: false,
        },
        {
          title: "Workout",
          description: "Go to the gym and complete a 30-minute session.",
          dueDate: "2024-12-16",
          completed: true,
        },
        {
          title: "Read a Book",
          description: "Finish reading 'Atomic Habits' by James Clear.",
          dueDate: "2024-12-18",
          completed: false,
        },
        {
          title: "Plan Vacation",
          description: "Research and plan the itinerary for the holiday trip.",
          dueDate: "2024-12-25",
          completed: false,
        },
      ]);
      

  const addTask = (task) => setTasks((prev) => [...prev, { ...task, completed: false }]);

  const deleteTask = (id) => setTasks((prev) => prev.filter((_, index) => index !== id));

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task, index) =>
        index === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
