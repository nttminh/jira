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
  const [list, setList] = useState(null);
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

    const filterTasksMap = {};

    listTask.forEach((task: Task) => {
      filterTasksMap[task.statusId] = task;
    });

    setFilteredTasks(filterTasksMap);
  }, [list]);

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
        <Column list={filteredTasks[1]} />
        <Column list={filteredTasks[2]} />
        <Column list={filteredTasks[3]} />
        <Column list={filteredTasks[4]} />
      </div>
      TEAM MEMBERS
      <UserList id={prjId} />
    </div>
  );
};

export default Active;
