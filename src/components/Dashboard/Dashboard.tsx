import type { DashboardProps } from "../../types";
import TaskData from "../TaskData/TaskData";
import TaskList from '../TaskList/TaskList';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskForm from '../TaskForm/TaskForm';


function Dashboard({
  tasks,
  displayedTasks,
  onSubmit,
  taskToEdit,
  onCancelEdit,
  onFilterChange,
  onSortChange,
  onStatusChange,
  onPriorityChange,
  onDelete,
  onEdit,
  onImport,
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
      <div className="min-h-screen bg-white md:p-10">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
          <h1 className="text-4xl font-semibold  tracking-tight text-[#1d1d1f] md:text-5xl">Task Dashboard</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">Manage your tasks, track your progress, and stay organized</p>

        {/* Shoow sumaary of current task statistics  */}
        <div className="my-12 grid gap-8 border-y border-[#e5e5e7] py-8 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#6e6e73]">Total Tasks</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f]">{totalTasks}</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#6e6e73]">Pending</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f]">{pendingTasks}</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#6e6e73]">In Progress</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f]">{inProgressTasks}</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#6e6e73]">Completed</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f]">{completedTasks}</p>
          </div>

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

        <TaskData 
          tasks={tasks}
          onImport={onImport}
        />

        <TaskList  
          tasks={displayedTasks}  
          
          onStatusChange={onStatusChange} onPriorityChange={onPriorityChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
    </div>
    </>
    
  );
};

export default Dashboard;