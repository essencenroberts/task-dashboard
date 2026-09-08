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

  // for editing task 
  onEdit: (task: Task) => void;
}


export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void; 
  onPriorityChange: (taskId: string, newPriority: TaskPriority) => void; 
  onDelete: (taskId: string) => void;

  onEdit: (task: Task) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string; // search filter
  }) => void;

  onSortChange: (sortBy: TaskSortOption) => void;
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
  taskToEdit?: Task | null;
  onCancelEdit?: () => void; //recieve a cancel function
}

// optiona for sorting task list
export type TaskSortOption = "dueDate" | "priority" | "title";

// Props Dashboards needs from App

export interface DashboardProps {
  tasks: Task[];

  onSubmit: (formData: TaskFormData) => void;

  taskToEdit: Task | null;

  onCancelEdit: () => void;

  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
  }) => void;

  onSortChange: (sortBy: TaskSortOption) => void;

  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus
  ) => void;

  onPriorityChange: (
    taskId: string,
    newPriority: TaskPriority
  ) => void;

  onDelete: (taskId: string) => void;

  onEdit: (task: Task) => void;
}