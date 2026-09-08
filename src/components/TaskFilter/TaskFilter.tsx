import type { TaskFilterProps, TaskStatus, TaskPriority, TaskSortOption } from "../../types";
import { useState } from "react";

// create the TaskFilter component to recieve onFilterChange 

const TaskFilter: React.FC<TaskFilterProps> = ({onFilterChange, onSortChange}) => {

  // import useState add state to TaskFilter
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
  }>({});

// sort state 
const [sortBy, setSortBy] = useState<TaskSortOption>("dueDate");

// search state
const [search, setSearch] = useState("");

  // function to handle status change

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = e.target.value as TaskStatus | "";

    //update
    const newFilters = {
      ...filters, 
      status: value || undefined,
    };

    // send selected status to parent component
    setFilters(newFilters);

    onFilterChange(newFilters);
  };

  //handle change to priority
  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const value = e.target.value as TaskPriority | "";

    //update
    const newFilters = {
      ...filters,
      priority: value || undefined,
    };

    setFilters(newFilters);

    onFilterChange(newFilters);
  };

  // handle changes to search box
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearch = e.target.value;

    setSearch(newSearch);

    onFilterChange({
      ...filters,
      search: newSearch,
    });
  };

  // handle changes to sort option
const handleSortChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const newSortBy = e.target.value as
   TaskSortOption;

   // keep track of selected sort option
  setSortBy(newSortBy);

  // send the selected sirt option to App
  onSortChange(newSortBy);

};


  // clear all filters and show all task again handle Clear filters

  const handleClearFilters = () => {
    const emptyFilters = {};

    setFilters(emptyFilters);
    setSearch("");

    onFilterChange(emptyFilters);
  };

  return (
    <>
      <div>
      {/* Search */}
        <div>
          <label htmlFor="task-search">
          </label>
          
          <input
            id="task-search"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
          />
        </div>  

        {/* Status */}
        <div>
          <label htmlFor="status-filter">Status:</label>
          <select 
            id="status-filter" 
            value={filters.status || ""}
            onChange={handleStatusChange}
          >
            <option value="">
            All</option>
            <option value="pending">Pending
            </option>
            <option value="in-progress">In-Progress
            </option>
            <option value="completed">Completed
            </option>
          </select>
        </div>

      {/* Priority  */}
        <div>
          <label htmlFor="priority-filter">Priority:</label>
          <select id="priority-filter" 
          value={filters.priority || ""}
          onChange={handlePriorityChange}>
            <option value="">
            All</option>
            <option value="low">Low
            </option>
            <option value="medium">Medium
            </option>
            <option value="high">High
            </option>
          </select>
        </div>

      {/* sort by */}

      <div>
        <label htmlFor="sort-filter">Sort by:</label>

        <select
          id="sort-filter"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Clear Filters Button  */}
      <button
        type="button"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
      </div>
    </>
  );
};

export default TaskFilter;

// const TaskFilter: React.FC<TaskFilterProps> = () => {

// }