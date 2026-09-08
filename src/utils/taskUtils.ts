import type { Task, TaskStatus, TaskPriority } from "../types"; 

// filter task function
export const filterTasks = (
  tasks: Task[],
  filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
  }
): Task[] => {
  return tasks.filter((task) => {
    //check if task match the status selected
    const matchesStatus =
      !filters.status || task.status === filters.status;

// check if task matches priority
    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

  // chek if search text appears
    const searchText = filters.search?.toLowerCase().trim() || "";

    const matchesSearch = 
      !searchText ||
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText);

    return (
      matchesStatus &&
      matchesPriority &&
      matchesSearch
    );    
  });
};

// sorting - here we will sort task based on the option selected
export const sortTasks = (
  tasks: Task[],
  sortBy: "dueDate" | "priority" | "title"
): Task[] => {
  // we don't want to change the orginal task array so we need to create a copy

  const sortedTasks = [...tasks];

  sortedTasks.sort((a, b) => {
    // sort by due date
    if (sortBy === "dueDate") {
      return a.dueDate.localeCompare(b.dueDate);
    }

    // sort by priority

    if (sortBy === "priority") {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };

      return priorityOrder[a.priority] = priorityOrder[b.priority];
    }

    // sort alphabetically by task title

    return a.title.localeCompare(b.title);
  });

  return sortedTasks;
}
