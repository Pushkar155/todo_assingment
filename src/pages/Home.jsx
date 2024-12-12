import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import Modal from "../components/Modal";

const Home = () => {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTaskContext();
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Completed");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const onSave = (formData) => {
    addTask(formData);
    setShowModal(false);
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        (statusFilter === "All" ||
          (statusFilter === "Completed" && task.completed) ||
          (statusFilter === "Pending" && !task.completed)) &&
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="relative h-auto min-h-[100vh] w-full flex flex-col justify-start items-center bg-gray-900 text-white">
      {showModal && <Modal onSave={onSave} showModal={showModal} setShowModal={setShowModal} />}
      {deleteIndex !== null && (
        <div className="absolute h-screen w-screen flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 flex flex-col justify-center items-center gap-4">
            <p className="text-lg font-semibold">Are you sure you want to delete this task?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  deleteTask(deleteIndex);
                  setDeleteIndex(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteIndex(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="w-full lg:h-[50vh] sm: h-[40vh] flex flex-col justify-end items-center gap-5 pb-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg')",
        }}
      >
        <h1 className="font-semibold text-gray-50 text-3xl">Pushkar's Todo APP</h1>
        <div className="lg:w-[45%] bg-white text-gray-700 h-auto p-4 shadow-lg rounded-xl flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search Task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-[2px] border-gray-400 rounded-md p-2 w-full focus:outline-blue-500"
          />
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-[2px] border-gray-400 rounded-md p-2 w-full"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border-[2px] border-gray-400 rounded-md p-2 w-full"
            >
              <option value="Ascending">Due Date: Ascending</option>
              <option value="Descending">Due Date: Descending</option>
            </select>
          </div>
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-blue-500 w-full py-2 text-white rounded-lg"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:w-[45%] sm: w-[80%] mt-10">
        <div className="mb-4 text-gray-300">
          {`Showing ${currentTasks.length} of ${filteredTasks.length} task(s)`}
        </div>
        {currentTasks.map((task, index) => {
          // Calculate the global index of the task
          const globalIndex = index + (currentPage - 1) * tasksPerPage;
          return (
            <div
              key={globalIndex}
              className={`p-4 mb-4 border rounded-md shadow-md flex justify-between items-center ${
                task.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-600">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">{task.dueDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskStatus(globalIndex)} // Use globalIndex here
                    className="w-5 h-5 accent-green-500"
                  />
                </label>
                <button
                  onClick={() => setDeleteIndex(globalIndex)}
                  className="bg-red-500 px-4 py-2 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center items-center gap-4 mt-6 mb-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
          >
            Previous
          </button>
          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
