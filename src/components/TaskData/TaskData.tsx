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
      <section className="mt-16 border-t border-[#e5e5e7] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Import and Export Tasks</h2>

  

        <div>
          <button type="button" onClick={handleExport} className="rounded-full bg-[#0066cc] px-5 py-2 text-sm font-normal text-white">
          Export Tasks
        </button>

          <label className="cursor-pointer rounded-full border border-[#0066cc] px-5 py-2 text-center text-sm font-normal text-[#0066cc]"> Impory Tasks
            <input 
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="sr-only"
            />
          </label>
          
        </div>
        
      </section>
    </>
  );
}

export default TaskData;