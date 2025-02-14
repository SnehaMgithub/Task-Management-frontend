const TaskForm = ({ createTask, name, handleInputChange, isEditing, updateTask }) => {
    return (
      <form className="mb-4" onSubmit={isEditing ? updateTask : createTask}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a Task"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-primary"}`}>
            {isEditing ? "Edit Task" : "Add Task"}
          </button>
        </div>
      </form>
    );
  };
  
  export default TaskForm;
  