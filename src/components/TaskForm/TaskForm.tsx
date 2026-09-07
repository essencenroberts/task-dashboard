import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";


// add new type for form errors
type FormErrors = {
  title?: string;
  description?: string;
  dueDate?: string;
};

// Create TaskForm function/component inputs Title, Description, Priority, Status, Due Date + validation
//add/pass onSubmit 

function TaskForm({ onSubmit, taskToEdit, onCancelEdit }: TaskFormProps) {

  //  create form state - formData will store everything the user types or selects & React will update
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  // when a task is selected for editing we need to fill the form with that task info use useEffect()
  //clear the form when a user cancels editing
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      });
    }
  }, [taskToEdit]);

  // validation errors state
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) { 
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    return newErrors;
  }


  //add handle form submission
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // console.log("FORM SUBMITTED");
    e.preventDefault();

    // check form for error before submmiting it
    const validationErrors = validateForm();
    // console.log("Validation errors:", validationErrors);
    // alert(JSON.stringify(validationErrors));

    // save the errors so they can display on page
    setErrors(validationErrors);

    // if there are errors stop and do not create the task
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // if there ar eno errors send the form data to App
    onSubmit(formData);
  };


  return(
  
  // create the form & make each form field controlled using onChange and the spread operator
    <form onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Edit Task" : "Add New Task"}</h2>

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
         {errors.title && <p>{errors.title}</p>}
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
         {errors.description && <p>{errors.description}</p>}
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
        {errors.dueDate && <p>{errors.dueDate}</p>}
      </label>
    
    {/* button Add Task */}
    <button type="submit">
      {taskToEdit ? "Save Changes" : "Add Task"}
    </button>
    {taskToEdit && (<button type="button" onClick={onCancelEdit}>Cancel</button>)}
    </form>
  );
}

export default TaskForm;
