import type { TaskDataProps } from "../../types";


// TaskData component to handle import export 
function TaskData({ tasks, onImport }: TaskDataProps) {

  // export button
  const handleExport = () => {
    //turn task data into JSON text
    const taskData = JSON.stringify(tasks, null, 2);

    // create a file from the JSON text
    const blob = new Blob([taskData], {
      type: "application/json",
    });

    // create temporary link for downloading the file
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";

    // click link automatically to start download
    link.click();

    
    URL.revokeObjectURL(url);
  };

  // import 
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // stop if user doesnt select 
    if (!file) {
      return;
    }

   //create a reader to read selected file
    const reader = new FileReader();

   //
   reader.onload = (event) => {
    const fileContent = event.target?.result;

    if (typeof fileContent !== "string") {
      return;
    }
   } 

   // turn the JSOn text back into JavaScript data
   const importedTasks = JSON.parse(fileContent);

   // send imported tasks back to App
    onImport(importedTasks)
   // read selected file as text 
   reader.readAsText(file);
  }
  
  return(
    <>
      <div>
        <h2>Import and Export Tasks</h2>

        <p>Total tasks: {tasks.length}</p>

        <button type="button" onClick={handleExport}>
          Export Tasks
        </button>

        <input 
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
        />
      </div>
    </>
  );
}

export default TaskData;