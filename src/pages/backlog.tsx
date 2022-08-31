import React from "react";
import data from "../../public/data.json";
import TaskList from "../components/TaskList/TaskList";
import { Task } from "../interface/Task";
type Props = {};

const backlog = (props: Props) => {
  const list: Task[] = data.tasks;

  return (
    <div>
      <h1>Backlog</h1>
      <TaskList list={list} />
    </div>
  );
};

export default backlog;
