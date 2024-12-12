import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = ({ onSave, showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date().toISOString().split("T")[0];

    if (!formData.title.trim()) {
      newErrors.title = "Title cannot be empty.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description cannot be empty.";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    } else if (formData.dueDate < currentDate) {
      newErrors.dueDate = "Due date cannot be in the past.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      setShowModal(!showModal);
    }
  };

  return (
    <div className="absolute h-full w-full flex justify-center items-center backdrop-blur-sm">
      <div className="h-auto bg-white lg:w-[35%] sm: w-[80%] text-gray-800 p-4 pl-6 pr-6 flex flex-col gap-6 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-xl">Add New Task</p>
          <div className="border-[1px] flex justify-center items-center p-1 rounded-full border-gray-500 cursor-pointer hover:bg-gray-100">
            <CloseRoundedIcon
              style={{ fontSize: "15px" }}
              onClick={() => setShowModal(!showModal)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-between items-start gap-2">
          <p className="font-semibold text-sm">Title</p>
          <input
            type="text"
            name="title"
            placeholder="Search Task..."
            value={formData.title}
            onChange={handleInputChange}
            className="border-[2px] border-gray-400 rounded-md p-2 w-[100%] focus:outline-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 font-semibold text-sm">{errors.title}</p>
          )}
        </div>

        <div className="flex w-full flex-col justify-between items-start gap-2">
          <p className="font-semibold text-sm">Description</p>
          <textarea
            name="description"
            placeholder="Search Task..."
            value={formData.description}
            onChange={handleInputChange}
            className="border-[2px] border-gray-400 rounded-md p-2 w-[100%] focus:outline-blue-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col justify-between items-start gap-2">
          <p className="font-semibold text-sm">Add due date</p>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="border-[2px] border-gray-400 rounded-md p-2 w-[100%] focus:outline-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.dueDate}
            </p>
          )}
        </div>

        <div className="h-14 flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 pl-6 pr-6 pt-2 pb-2 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
