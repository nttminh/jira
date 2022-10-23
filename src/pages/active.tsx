/* eslint-disable */
import data from "../../public/data.json";
import Column from "../components/Column/Column";
import { Task } from "../interface/Task";
import { GetProjectDetailContent, LstTask } from "../interface/Project";

import { getProject } from "../api/getProject";
import { useEffect, useState } from "react";
import UserList from "../components/User/UserList";
import { any } from "prop-types";

type Props = {};

const Active = (props: Props) => {
  const prjId = localStorage.getItem("activeProject") || 0;
  const [list, setList] = useState({
    lstTask: [],
    projectName: "",
    description: "",
    alias: "",
    projectCategory: {
      name: "",
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

  // setFilteredTasks({
  //   1: null,
  //   2: null,
  //   3: null,
  //   4: null,
  // });

  return (
    <div>
      <h1>Current Active Project</h1>
      <div className="project-info">
        <div className="projectName">
          <span className="font-bold text-base leading-10 mr-2">
            Project Name:
          </span>
          <span>
            {list?.projectName ? list?.projectName : "Not information"}
          </span>
        </div>
        <div className="projectName">
          <span className="font-bold text-base  leading-10 mr-2">
            Description:
          </span>
          <p
            className="  leading-10"
            dangerouslySetInnerHTML={{
              __html: list?.description ? list?.description : "Not information",
            }}
          ></p>
        </div>
        <div className="alias">
          <span className="font-bold text-base  leading-10 mr-2">Alias:</span>
          <span>{list?.alias ? list?.alias : "Not information"}</span>
        </div>
        <div className="projectCategory">
          <span className="font-bold text-base  leading-10 mr-2">
            Project Category:
          </span>
          <span>
            {list?.projectCategory?.name
              ? list?.projectCategory?.name
              : "Not information"}
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        {/* {

        Object.keys(filteredTasks).map((id: string) => (
          <Column list={filteredTasks[+id]} />
        ))} */}
        {Object.keys(filteredTasks).length > 0 ? (
          <>
            <Column list={filteredTasks} id={1} />
            <Column list={filteredTasks} id={2} />
            <Column list={filteredTasks} id={3} />
            <Column list={filteredTasks} id={4} />
          </>
        ) : (
          "Don;t have any task in this project"
        )}
      </div>
      <h1>Members of this project</h1>
      <UserList id={prjId} />
    </div>
  );
};

export default Active;
