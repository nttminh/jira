import React from "react";
import TaskItem from "./TaskItem/TaskItem";
import { Task } from "../../interface/Task";
type Props = {
  list: Task[];
  title?: string;
};
const TaskList = (props: Props) => {
  return (
    <div>
      {props.list.map((task) => (
        <TaskItem key={task.taskName} value={task} />
      ))}
    </div>
  );
};

export default TaskList;
