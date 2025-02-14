import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import loadingImg from "../assets/loader.gif";

// ✅ Correctly using Vite environment variable
export const URL = import.meta.env.VITE_SERVER_URL || "https://task-management-backend-eu8f.onrender.com/";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fixed API URL for fetching tasks
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
        setTasks(data.tasks);
      
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ✅ Fixed API URL in task creation
  const createTask = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("Task name cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fixed API URL in delete function
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCompletedTasks(tasks.filter((task) => task.completed));
  }, [tasks]);

  const getSingleTask = (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  // ✅ Fixed API URL in update function
  const updateTask = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("Task name cannot be empty.");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, { name: task.name, completed: true });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Task Manager</h2>

      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />

      {tasks.length > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img src={loadingImg} alt="Loading" className="w-25" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-muted mt-4">No tasks added. Please add a task.</p>
      ) : (
        <div className="mt-4">
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
