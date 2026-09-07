import { useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import './App.css';
import type { Task, TaskStatus, TaskPriority, TaskFormData} from './types';
import TaskForm from './components/TaskForm/TaskForm';



function App() {

// create starting task data 
const startingTasks: Task[] = [
    {
      id: "1",
      title: "Finish React + TypeScript Task Dashboard",
      description: "finish building out Task Dashboard SBA project",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-09-04",
    },
    {
      id: "2",
      title: "Apply for 20 new remote Software Engineer roles",
      description: "add jobs to dashboard then apply and update status",
      status: "completed",
      priority: "medium",
      dueDate: "2026-09-13",
    }, 
    {
      id: "3",
      title: "add new projects to portfolio",
      description: "add new projects to portfolio",
      status: "pending",
      priority: "low",
      dueDate: "2026-09-30",
    },
  ];

//   // data array to store task
  const [tasks, setTasks] = useState<Task[]>(startingTasks);

// task currently being edited 
  const [editingTask, setEditingTask] = useState<Task | null>(null);

// // create filter state
 
  const [filter, setFilter] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

// create filter function 
  const handleFilterChange = (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => {setFilter(filters);
  };

const filteredTasks = tasks.filter((task) => {
  if (filter.status && task.status !== filter.status) {
    return false;
  }

  if (filter.priority && task.priority !== filter.priority) {
    return false;
  }

  return true;
});

 
  // status change function
  const handleStatusChange = (
    taskId: string,
    newStatus: TaskStatus
  ) => {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? {
      ...task, status: newStatus } : task
      )
    );
  };

  // change priority function
  const handlePriorityChange = (
    taskId: string,
    newPriority: TaskPriority
    ) => { 
    setTasks((currentTasks) => 
      currentTasks.map((task) => task.id === taskId 
      ? { ...task, priority: newPriority } : task
      )  
    );
  
  };

//   // function to handle delete 
  const handleDelete = (taskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId)
    );
  };

//funtion to handle Edit save the task the user edits
  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

// function to handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null)
  };

  // funciton to handle both creating an ew task and saving an edited task
  const handleTaskSubmit = (formData: TaskFormData) => {
  // if we edit a task ,updtae that exisitng task
  if (editingTask) {
    setTasks((currentTasks) => 
      currentTasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...formData }
          : task
      )
    );
    // clear the editing task after saving 
    setEditingTask(null);

    return;
  }

  // if not editing cerate brand new task
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: formData.title,
    description: formData.description,
    status: formData.status,
    priority: formData.priority,
    dueDate: formData.dueDate,
  };
  // add the new task to our existing list of tasks
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  };


  return (
    <>
      <div className='m-10 p-10 '>
        <h1 className='text-3xl font-bold'>Task Dashboard</h1>

        {/* import TaskForm component */}
         <TaskForm 
          onSubmit={handleTaskSubmit}
          taskToEdit={editingTask}
          onCancelEdit={handleCancelEdit}
         />

         <br></br>

        <TaskList 
          // onFilterChange={handleFilterChange}
          tasks={tasks}  
          onStatusChange={handleStatusChange} onPriorityChange={handlePriorityChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

       
      </div>
      
     
    </>
  );
}

export default App;
