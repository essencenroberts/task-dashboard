import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";


// create TaskList component , it will recive the tasks array and the functions needed to update or delete and give it props so it can recieve the list of task, a status change function and delete function
function TaskList({ 
  tasks, 
  onStatusChange, onPriorityChange,
  onDelete, }: TaskListProps) {
  // return JSX to display task list using .map()
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <h2>My tasks</h2>

      {/* // use .map() to create one TaskItem component for every task */}
      {tasks.map((task) => (
        <TaskItem 
          key={task.id}
          task={task}

          // pass the action function down to each Taskitem
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onDelete={onDelete}
        />
      ))}
    </div>

  );
}

export default TaskList;