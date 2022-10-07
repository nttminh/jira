import React from "react";
import Box from "@mui/material/Box";
import { GetProjectDetailContent, LstTask } from "../../interface/Project";
import TaskCard from "../TaskCard/TaskCard";
type Props = {
  list: GetProjectDetailContent;
  title: string;
};

const Column = (props: Props) => {
  const project = props.list;
  const listTask: LstTask[] = props.list;
  // console.log('====', props.list);
  return (
  
    <div className="m-2">
      <Box className="bg-slate-100 text-center my-2 h-10 leading-10">
        <h3>{props.title}</h3>
      </Box>
      <div className="flex flex-col px-2 py-3 bg-slate-100">
        {listTask?.map((task) => (
          <TaskCard key={task.statusId} value={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
