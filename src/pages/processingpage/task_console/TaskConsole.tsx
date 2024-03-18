import React from "react";
import TaskTable from "./TasksTable/index";
import '../../../style_components/processingpages/task_console/TaskConsole.css';

export const TaskConsole: React.FC = () => {
  return (
    <div>
      <TaskTable />
    </div>
  );
};
