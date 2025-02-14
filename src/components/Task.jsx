import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <div className={`card mb-3 ${task.completed ? "bg-light border-success" : "border-danger"}`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="mb-0">
          <b>{index + 1}. </b> {task.name}
        </p>
        <div className="d-flex gap-3">
          <FaCheckDouble className="text-success cursor-pointer" onClick={() => setToComplete(task)} />
          <FaEdit className="text-primary cursor-pointer" onClick={() => getSingleTask(task)} />
          <FaRegTrashAlt className="text-danger cursor-pointer" onClick={() => deleteTask(task._id)} />
        </div>
      </div>
    </div>
  );
};

export default Task;
