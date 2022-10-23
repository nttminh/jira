import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { getProject } from "../../../api/getProject";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { GetProjectDetailContent } from "../../../interface/Project";

const deleteProject = async (projectId: number) => {
  try {
    const res = await getProject().deleteProject(projectId);
  } catch (e) {}
};

type Props = {
  project: any;
  // alias: string  | undefined;
};

const ProjectDetail = (props: Props) => {
  const project = props.project;
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [alias, setAlias] = useState(project?.alias || "");
  const handleDeleteProject = () => {
    deleteProject(project?.id);
    alert("Xoa thanh cong");
    router.push("/projects");
  };
  const activateProject = (e: any) => {
    localStorage.setItem("activeProject", project?.id + "");
    alert(`Project ${project.projectName} is active now!`);
    router.push("/active");
    e.stopPropagation();
  };
  return (
    <Box className="my-2 w-100">
      <h1>Project Detail</h1>
      <div className="id   ">
        <span className="font-bold text-base leading-10 mr-2 ">ID:</span>
        <span>{project?.id ? project?.id : "Not information"}</span>
      </div>
      <div className="projectName   ">
        <span className="font-bold text-base leading-10 mr-2">Name:</span>
        <span>
          {project?.projectName ? project?.projectName : "Not information"}
        </span>
      </div>
      <div className="alias   ">
        <span className="font-bold text-base leading-10 mr-2">Alias:</span>
        <span>{project?.alias ? project?.alias : "Not information"}</span>
      </div>
      <div className="description   ">
        <span className="font-bold text-base leading-10 mr-2">
          Description:
        </span>
        <p
          className="leading-10"
          dangerouslySetInnerHTML={{
            __html: project?.description
              ? project?.description
              : "Not information",
          }}
        ></p>
      </div>
      <div className="category   ">
        <span className="font-bold text-base leading-10 mr-2">Category:</span>
        <span>
          {project?.projectCategory?.name
            ? project?.projectCategory?.name
            : "Not information"}
        </span>
      </div>
      <div className="creator   ">
        <span className="font-bold text-base leading-10 mr-2">Creator:</span>
        <span>
          {project?.creator?.name ? project?.creator?.name : "Not information"}
        </span>
      </div>
      <div className="members   ">
        <span className="font-bold text-base leading-10 mr-2">Members:</span>
        <p className="leading-10">
          {project?.members
            ? project.members.map((mem: any) => (
                <p key={mem.name}>{mem?.name}</p>
              ))
            : "Not information"}
        </p>
      </div>
      {project?.id && (
        <>
          <Button variant="contained" onClick={handleDeleteProject} className="mr-5">
            Delete Project
          </Button>
          <Button variant="contained" onClick={activateProject}>
            Activate Project
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProjectDetail;
