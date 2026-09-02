// create TypeScript types first + i
export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

// a Task represents one task in the app

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

// define the props that the TaskList, TaskForm, and TaskFilter components will need


export interface TaskListProps {
  tasks: Task[];

  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;

  onPriorityChange: (
    taskId: string,
    newPriority: TaskPriority
  ) => void;
  
  onDelete: (taskId: string) => void;
}


export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void; 
  onPriorityChange: (taskId: string, newPriority: TaskPriority) => void; 
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;
}


// create a new type for form data called TaskFormData
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

// create the TaskForm props

export interface TaskFormProps {
  onSubmit: (formData: TaskFormData) => void;
}