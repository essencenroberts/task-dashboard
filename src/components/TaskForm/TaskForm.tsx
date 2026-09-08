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
    <form 
      onSubmit={handleSubmit}
      className="mt-1 border-t border-[#e5e5e7] pt-10"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">{taskToEdit ? "Edit Task" : "Add New Task"}</h2>

      {/* //title - make it controlled */}
      <label
        htmlFor="title"
        className="mb-2 block text-sm font-medium text-[#1d1d1f]"
      > Title
         <input 
          type="text"
          className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline:none transition focus:border-[#0071e3] focus:ring-[#0071e3]/20]"
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
      <label
        htmlFor="description"
        className="mb-2 block text-sm font-medium text-[#1d1d1f]"
      > Description
         <textarea
          value={formData.description}
          className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline:none transition focus:border-[#0071e3] focus:ring-[#0071e3]/20"
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
      <label 
        htmlFor="priority"
        className="mb-2 block text-sm font-medium text-[#1d1d1f]"
      >
        Priority
        <select 
          value={formData.priority}
          className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline:none transition focus:border-[#0071e3] focus:ring-[#0071e3]/20"
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
      <label
        htmlFor="status"
        className="mb-2 block text-sm font-medium text-[#1d1d1f]"
      >Status
         <select 
          value={formData.status}
          className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline:none transition focus:border-[#0071e3] focus:ring-[#0071e3]/20"
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
      <label
        htmlFor="dueDate"
        className="mb-2 block text-sm font-medium text-[#1d1d1f]"
      >Due Date:
        <input 
          type="date" 
          className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline:none transition focus:border-[#0071e3] focus:ring-[#0071e3]/20"
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
    <button type="submit"
      className="mt-6 rounded-full bg-[#0066cc] px-6 py-3 text-base font-normal text-white"
    >
      {taskToEdit ? "Save Changes" : "Add Task"}
    </button>
    {taskToEdit && (<button 
      type="button"
      onClick={onCancelEdit}
      className="mt-6 rounded-full border border-[#0066cc] px-6 py-3 text-base font-normal text-[#0066cc]">Cancel</button>)}
    </form>
  );
}

export default TaskForm;
