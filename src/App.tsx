import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
// import TaskList from './components/TaskList/TaskList';
// import TaskFilter from './components/TaskFilter/TaskFilter';
import './App.css';
import type { Task, TaskStatus, TaskPriority, TaskFormData, TaskSortOption } from './types';
// import TaskForm from './components/TaskForm/TaskForm';
import { filterTasks, sortTasks } from './utils/taskUtils';




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
  const [tasks, setTasks] = useState<Task[]>(() => {
    // get saved taks from localStorage
    const savedTasks = localStorage.getItem("tasks");

    // if saved task exists, turn them into JavaScript data using JSON.parse
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    // if no saved tasks use starting tasks
    return startingTasks;
  });

// useEffect - save the tasks to localStorage whenever the task change

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

// task currently being edited 
  const [editingTask, setEditingTask] = useState<Task | null>(null);

// // create filter state to track filter the user selects
 
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
  }>({});

// state to keep track of how user wants the tasks sorted
  const [sortBy, setSortBy] = useState<TaskSortOption>("dueDate");

// create filter function 
  const handleFilterChange = (newFilters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
  }) => {setFilters(newFilters);
  };

// function to handle sort change  + save sorting option selected by 
  const handleSortChange = (newSortBy: TaskSortOption) => {
    setSortBy(newSortBy);
  };

  // filter the tasks then sort the tasks
  const filteredTasks = filterTasks(tasks, filters);

  const sortedTasks = sortTasks(filteredTasks, sortBy);
 
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

  // replace current tasks with task imported from JSON file
  const handleImport = (importedTasks: Task[]) => {setTasks(importedTasks)};

  return (
    <>
    

        {/* import TaskForm component */}
         {/* <TaskForm 
          onSubmit={handleTaskSubmit}
          taskToEdit={editingTask}
          onCancelEdit={handleCancelEdit}
         />

        <TaskFilter 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
         <br></br>

        

        <TaskList  
          tasks={sortedTasks}  
          onStatusChange={handleStatusChange} onPriorityChange={handlePriorityChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
        /> */}
        
        {/* // import Dashboard component */}
        <Dashboard 
          tasks={sortedTasks}
          displayedTasks={sortedTasks}
          onSubmit={handleTaskSubmit}
          taskToEdit={editingTask}
          onCancelEdit={handleCancelEdit}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onStatusChange={handleStatusChange} onPriorityChange={handlePriorityChange}
          onDelete={handleDelete}
          onEdit={handleEdit} 
          onImport={handleImport}
        />      
    
    </>
  );
}

export default App;
