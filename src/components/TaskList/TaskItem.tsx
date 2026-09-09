import type { TaskItemProps, TaskStatus, TaskPriority } from "../../types";

// create TaskItem component to render each task 
export function TaskItem({ 
  task, 
  onStatusChange, 
  onPriorityChange, 
  onDelete,
  onEdit,
}: TaskItemProps) {
  
  // return JSx to display task info (title, description, status, priority, due date)
  return(
    <div className="rounded-[18px] mt-6 border border-[#e0e0e0] bg-white p-6 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Task: {task.title}</h2>
      </div>

      <div>
        <p className="mt-2 text-base leadiing-7 text-[#6e6e73]">{task.description}</p>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-sm font-medium text-[#6e6e73]">Status: {task.status}</p>
      <select className="w-full rounded-xl border border-[#d2d2d7] bg-white px-2 py-2 text-[#1d1d1f] outline-none transition fous:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20" value={task.status} onChange={(e) => onStatusChange(
        task.id, e.target.value as TaskStatus
      )} >
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="compleyed">Completed</option>
      </select>

      </div>

      <div className="mt-5 space-y-2">
        <p className="text-sm font-medium text-[#6e6e73]">Priority: {task.priority}</p>

        <select className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] outline-none transition focus:border-[#0071e3] fpcus:ring-2 focus:ring-[#0071e3]/20" value={task.priority} onChange={(e) => onPriorityChange(
          task.id, e.target.value as TaskPriority
        )}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mt-5 text-sm">
        <p className="text-[#6e6e73]">Due: 
          <span className="text-[#1d1d1f]"> {task.dueDate}</span>
        </p>
      </div>

    {/* // add Delete */}
      <div className="mt-6 flex gap-3">
        <button className="rounded-full border border-[#0066cc] px-5 py-2.5 text-sm font-normal text-[#0066cc]" onClick={() => onEdit(task)}>Edit</button>

        <button className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-sm font-normal text-[#6e6e73]" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
