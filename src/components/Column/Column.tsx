import React from "react";
import Box from "@mui/material/Box";
import { Task } from "../../interface/Task";
import TaskCard from "../TaskCard/TaskCard";
type Props = {
  list: Task[];
  title: string;
};

const Column = (props: Props) => {
  return (
    <div className="m-2">
      <Box className="bg-slate-100 text-center my-2 h-10 leading-10">
        <h3>{props.title}</h3>
      </Box>
      <div className="flex flex-col px-2 py-3 bg-slate-100">
        {props.list.map((task) => (
          <TaskCard key={task.taskName} value={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
