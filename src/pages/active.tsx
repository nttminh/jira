/* eslint-disable */
import data from "../../public/data.json";
import Column from "../components/Column/Column";
import { Task } from "../interface/Task";
import { GetProjectDetailContent, LstTask } from "../interface/Project";

import { getProject } from "../api/getProject";
import { useEffect, useState } from "react";
import UserList from "../components/User/UserList";
import {any} from "prop-types";

type Props = {};

const Active = (props: Props) => {
  const prjId = localStorage.getItem("activeProject") || 0;
  const [list, setList] = useState({
    lstTask: [],
    projectName: '',
    description: '',
    alias:'',
    projectCategory: {
      name: '',
    },
  });
  const [filteredTasks, setFilteredTasks] = useState({});
 
  let info = null;

  const getActive = async () => {
    try {
      const res = await getProject()
        .getProjectDetail(+prjId)
        .then((res) => res.data);
      setList(res?.content || {});
    } catch (e) {}
  };

  useEffect(() => {
    getActive();
  }, []);

  useEffect(() => {
    const listTask = list?.lstTask;
    if (!listTask) {
      return;
    }
    console.log(listTask);

    let filterTasksMap = {};

    listTask.forEach((task: Task) => {
      // filterTasksMap[task.statusId] = task;
      filterTasksMap = { ...filterTasksMap, [task.statusId]: task };
    });
    console.log("filteredTasks", filterTasksMap);

    setFilteredTasks({ ...filterTasksMap });
  }, [list]);
  setFilteredTasks({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  return (
    <div>
      <h1>Project Title</h1>
      <div className="project-info">
        <p>Name: {list?.projectName}</p>
        <p>
          Description:
          <div dangerouslySetInnerHTML={{ __html: list?.description }} />
        </p>
        <p>Alias: {list?.alias}</p>
        <p>Category: {list?.projectCategory?.name}</p>
      </div>
      <div className="flex flex-row">
        {/* {

        Object.keys(filteredTasks).map((id: string) => (
          <Column list={filteredTasks[+id]} />
        ))} */}
      
        <Column list={filteredTasks?[1]: any} />
        <Column list={filteredTasks?[2]: any} />
        <Column list={filteredTasks?[3]: any} />
        <Column list={filteredTasks?[4]: any} />
      </div>
      TEAM MEMBERS
      <UserList id={prjId} />
    </div>
  );
};

export default Active;
