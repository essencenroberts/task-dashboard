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
      <div className="mt-6 border-t border-[#e5e5e7] pt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Filter Tasks</h2>
      {/* Search */}
        <div>
          <label htmlFor="task-search" className="mb-2 block text-sm font-medium text-[#1d1d1f]">Search
          </label>
          
          <input
            id="task-search"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="w-full rounded-full border border-[#d2d2d7] bg-white px-5 py-3 text-[#1d1d1f]"
          />
        </div>  

        {/* Status */}
        <div>
          <label htmlFor="status-filter"
          className="mb-2 block text-sm font-medium text-[#1d1d1f]">Status:</label>
          <select 
            id="status-filter" 
            value={filters.status || ""}
            onChange={handleStatusChange}
            className="w-full rounded-full border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f]"
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
          <label htmlFor="priority-filter"
          className="mb-2 block text-sm font-medium text-[#1d1d1f]"
          >Priority:</label>
          <select id="priority-filter" 
          value={filters.priority || ""}
          onChange={handlePriorityChange}
          className="w-full rounded-full border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f]"
          >
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
        <label htmlFor="sort-filter" 
          className="mb-2 block text-sm font-medium text-[#1d1d1f]"
        >Sort by:</label>

        <select
          id="sort-filter"
          value={sortBy}
          onChange={handleSortChange}
          className="w-full rounded-full border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f]"
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
        className="rounded-full border  border-[#0066cc] px-5 py-3 text-sm font-normal text-[#0066cc]"
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