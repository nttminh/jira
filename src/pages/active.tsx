import data from "../../public/data.json";
import Column from "../components/Column/Column";
import { Task } from "../interface/Task";
import { GetProjectDetailContent } from "../interface/Project";

import { getProject } from "../api/getProject";
import { useEffect, useState } from "react";
import UserList from "../components/User/UserList";

type Props = {};

const Active = (props: Props) => {
  const prjId = localStorage.getItem("activeProject") || 0;
  const [list, setList ] =useState({});
  const [filteredTasks, setFilteredTasks ] =useState({
    1: [],
    2: [],
    3:[],
    4: [],
  });

  let info = null;
  const getActive = async () => {
    try {
      const res = await getProject().getProjectDetail(prjId).then(res => res.data);
      console.log("dataaaaa", res.content, prjId);
      setList(res?.content || {});
    } catch (e) {
    }
  };
  useEffect(() => {
    getActive();
  },[]);

  useEffect(() => {
    const listTask = list?.lstTask;
    if (!listTask) {
      return;
    }
    listTask.forEach((task: Task) => {
      // console.log("list task. tastusid" , filteredTasks[+task.statusId]);
      filteredTasks[+task.statusId].push(task);
    })
    // console.log('---', listTask);
  },[list])
  return (
    <div>
      <h1>Project Title</h1>
      <div className="project-info">
        <p>Name: {list?.projectName}</p>
        <p>Description: {list?.description}</p>
        <p>Alias: {list?.alias}</p>
        <p>Category: {list?.projectCategory?.name}</p>
      </div>
      <div className="flex flex-row">
        <Column title="TO DO" list={filteredTasks[1]} />
        <Column title="DOING" list={filteredTasks[2]} />
        <Column title="TESTING" list={filteredTasks[3]} />
        <Column title="DONE" list={filteredTasks[4]} />
      </div>
      TEAM MEMBERS
      <UserList id={prjId} />
    </div>
  );
};

export default Active;
