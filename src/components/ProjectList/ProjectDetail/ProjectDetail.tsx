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
      <div className="id">
        <span className="font-bold text-base">ID:</span>
        <p className="block">{project?.id ? project?.id : "Not information"}</p>
      </div>
      <div className="projectName">
        <span className="font-bold text-base">Name:</span>
        <p className="block">
          {project?.projectName ? project?.projectName : "Not information"}
        </p>
      </div>
      <div className="alias">
        <span className="font-bold text-base">Alias:</span>
        <p className="block">
          {project?.alias ? project?.alias : "Not information"}
        </p>
      </div>
      <div className="description">
        <span className="font-bold text-base">Description:</span>
        <p className="block">
          {project?.description ? project?.description : "Not information"}
        </p>
      </div>
      <div className="category">
        <span className="font-bold text-base">Category:</span>
        <p className="block">
          {project?.projectCategory?.name
            ? project?.projectCategory?.name
            : "Not information"}
        </p>
      </div>
      <div className="creator">
        <span className="font-bold text-base">Creator:</span>
        <p className="block">
          {project?.creator?.name ? project?.creator?.name : "Not information"}
        </p>
      </div>
      <div className="members">
        <span className="font-bold text-base">Members:</span>
        <p className="block">
          {project?.members
            ? project.members.map((mem: any) => (
                <p key={mem.name}>{mem?.name}</p>
              ))
            : "Not information"}
        </p>
      </div>
      {project?.id && (
        <>
          <Button variant="contained" onClick={handleDeleteProject}>
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
