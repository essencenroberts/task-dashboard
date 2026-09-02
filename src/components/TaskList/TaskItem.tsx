import type { TaskItemProps, TaskStatus, TaskPriority } from "../../types";

// create TaskItem component to render each task 
export function TaskItem({ task, onStatusChange, onPriorityChange, onDelete}: TaskItemProps) {
  
  // return JSx to display task info (title, description, status, priority, due date)
  return(
    <div>
      <div>
        <h2>Task:{task.title}</h2>
      </div>

      <div>
        <p>{task.description}</p>
      </div>

      <div>
        <p>Status: {task.status}</p>
      <select value={task.status}onChange={(e) => onStatusChange(
        task.id, e.target.value as TaskStatus
      )} >
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="compleyed">Completed</option>
      </select>

      </div>

      <div>
        <p>Priority: {task.priority}</p>

        <select value={task.priority} onChange={(e) => onPriorityChange(
          task.id, e.target.value as TaskPriority
        )}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <p>Due:
          <span>{task.dueDate}</span>
        </p>
      </div>

    {/* // add Delete */}
      <div>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
