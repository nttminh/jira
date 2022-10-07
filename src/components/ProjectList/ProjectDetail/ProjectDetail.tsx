import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { getProject } from "../../../api/getProject";

import { GetProjectDetailContent } from "../../../interface/Project";

const deleteProject = async (projectId) => {
  try {
    const res = await getProject().deleteProject(projectId);

  } catch (e) {}
};

type Props = {
  project: GetProjectDetailContent | undefined;
};

const ProjectDetail = (props: Props) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const project = props.project;
  const handleDeleteProject = () => {
    deleteProject(project.id);
    alert('Xoa thanh cong');
    router.push('/projects');
  };
  return (
    <Box className="my-2 w-100" onClick={() => setOpened(true)}>
      <Card variant="outlined">
        <div className="id inline-block bg-slate-100">
          <span className="block w-1/4">ID:{project?.id}</span>
        </div>
        <div className="px-5 flex flex-row">
          <div className="content w-2/3">
            <h1 className="block w-1/4">{project?.projectName}</h1>
            <div className="alias">
              <span className="font-bold text-base">Alias: </span>
              <p className="block w-1/4">{project?.alias}</p>
            </div>
            <div className="description">
              <span className="font-bold text-base">Description:</span>
              <p className="block w-1/4">{project?.description}</p>
            </div>
            <div className="category">
              <span className="font-bold text-base">Category:</span>
              <p className="block w-1/4">{project?.projectCategory?.name}</p>
            </div>
          </div>
          <div className="team border-solid w-1/3">
            <div className="creator">
              <span className=" font-bold text-base">Creator:</span>
              <p>{project?.creator?.name}</p>
            </div>
            <div className="members">
              <span className="font-bold text-base">Members:</span>
            </div>
          </div>
        </div>
        {project?.id && (
          <button onClick={handleDeleteProject}>Delete Project</button>
        )}
      </Card>
    </Box>
  );
};

export default ProjectDetail;
