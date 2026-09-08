import type { DashboardProps } from "../../types";
import TaskList from '../TaskList/TaskList';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskForm from '../TaskForm/TaskForm';


function Dashboard({
  tasks,
  onSubmit,
  taskToEdit,
  onCancelEdit,
  onFilterChange,
  onSortChange,
  onStatusChange,
  onPriorityChange,
  onDelete,
  onEdit,
}: DashboardProps) {

  // task statistics -- need to count how many tasks are currently in each status

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter (
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <>
      <div className="m-10 p-10">
      <h1 className="text-3xl font-bold">Task Dashboard</h1>

      {/* Shoow sumaary of current task statistics  */}
      <div className="grid gap-4 my-6 md:grid-cols-4">
        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm font-medium">Total Tasks</p>
          <p className="mt-2 text-3xl font-bold">{totalTasks}</p>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm font-medium">Pending</p>
          <p className="mt-2 text-3xl font-bold">{pendingTasks}</p>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm font-medium">In Progress</p>
          <p className="mt-2 text-3xl font-bold">{inProgressTasks}</p>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm font-medium">Completed</p>
          <p className="mt-2 text-3xl font-bold">{completedTasks}</p>
        </div>

      </div>

      {/* //move TaskList, TaskFilter and TaskForm from App to Dashboard  */}
      {/* import TaskForm component */}
          <TaskForm 
          onSubmit={onSubmit}
          taskToEdit={taskToEdit}
          onCancelEdit={onCancelEdit}
         />

        <TaskFilter 
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
        />
         <br />

        

        <TaskList  
          tasks={tasks}  
          onStatusChange={onStatusChange} onPriorityChange={onPriorityChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
    </div>
    </>
    
  );
};

export default Dashboard;