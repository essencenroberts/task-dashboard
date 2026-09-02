import { useState } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";

// Create TaskForm function/component inputs Title, Description, Priority, Status, Due Date + validation
//add/pass onSubmit 

function TaskForm({ onSubmit }: TaskFormProps) {

  //  create form state - formData will store everything the user types or selects & React will update
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });


  //add handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(formData);
  };


  return(
  
  // create the form & make each form field controlled using onChange and the spread operator
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      {/* //title - make it controlled */}
      <label> Title
         <input 
          type="text"
          value={formData.title}
          onChange={(e) => 
            setFormData({
            ...formData,
              title: e.target.value,
            })
          }
         />
      </label>
     
     {/* description */}
      <label> Description
         <textarea
          value={formData.description}
          onChange={(e) => 
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
         />
      </label>

     {/* priority */}
      <label>
        Priority
        <select 
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value as TaskFormData["priority"],
            })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

     {/* status */}
      <label>Status
         <select 
          value={formData.status}
          onChange={(e) => 
            setFormData({
              ...formData,
              status: e.target.value as TaskFormData["status"],
            })
          }
         >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
       
      </label>
    
     {/* due date */}
      <label>Due Date:
        <input 
          type="date" 
          value={formData.dueDate}
          onChange={(e) => 
            setFormData({
              ...formData,
              dueDate: e.target.value,
            })
          }
        />
      </label>
    
    {/* button Add Task */}
    <button type="submit">
      Add Task
    </button>
    </form>
  );
}

export default TaskForm;
