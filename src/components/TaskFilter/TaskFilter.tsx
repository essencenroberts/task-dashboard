import type { TaskFilterProps, TaskStatus, TaskPriority } from "../../types";
import { useState } from "react";

// create the TaskFilter component to recieve onFilterChange 

const TaskFilter: React.FC<TaskFilterProps> = ({onFilterChange, }) => {

  // import useState add state to TaskFilter
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
  }>({});

  // function to handle status change

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    //update
    const newFilters = {
      ...filters, 
      status: e.target.value as TaskStatus,
    };

    // send selected status to parent component
    setFilters(newFilters);
    onFilterChange({
      status: e.target.value as TaskStatus,
    });
  };

  //handle change to priority
  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
  
    //update
    const newFilters = {
      ...filters,
      priority: e.target.value as TaskPriority,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <>
      <div>
        <div>
          <label>Status:</label>
          <select id="status-filter" onChange={{handleStatusChange}}>
            <option value="">
            All</option>
            <option value="pending">Pending
            </option>
            <option value="In-progress">In-Progress
            </option>
            <option value="completed">Completed
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="priority-filter">Priority:</label>
          <select id="priorirty-filter" onChange={handlePriorityChange  }>
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
      </div>
    </>
  );
};

export default TaskFilter;

// const TaskFilter: React.FC<TaskFilterProps> = () => {

// }