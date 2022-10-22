import React from "react";
import Box from "@mui/material/Box";
import { GetProjectDetailContent, LstTask } from "../../interface/Project";
import TaskCard from "../TaskCard/TaskCard";
import { Tooltip } from "@mui/material";
type Props = {
  list: GetProjectDetailContent;
};

const Column = (props: Props) => {
  const listTask = props.list;

  return (
    <div className="m-2 w-full">
      <Tooltip title={listTask?.alias}>
        <Box className="bg-slate-100 text-center my-2 leading-10">
          <h3 className="my-1">{listTask?.statusName}</h3>
        </Box>
      </Tooltip>
      <div className="flex flex-col px-2 py-3 bg-slate-100">
        {listTask?.lstTaskDeTail?.length > 0 ? (
          <>
            {listTask.lstTaskDeTail.map((task: any) => (
              <TaskCard key={task.taskId} value={task} />
            ))}
          </>
        ) : (
          <>No tasks</>
        )}
      </div>
    </div>
  );
};

export default Column;
