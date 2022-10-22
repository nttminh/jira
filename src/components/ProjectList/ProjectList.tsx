import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ProjectItem from "./ProjectItem/ProjectItem";
import { GetProjectDetailContent } from "../../interface/Project";

type Props = {
  list: GetProjectDetailContent[];
  title?: string;
  projectName: string;
};




const ProjectList = (props: Props) => {

  return (
    <div className="my-8">
      <Box className="my-2 w-100 cursor-pointer ">
        <Card variant="outlined" className="bg-gray-100 ">
          <div className="flex flex-row justify-between  items-center px-5 font-bold h-12">
            <span className="block w-1/4">ID</span>
            <span className="block w-1/4">Project Name</span>
            <span className="block w-1/4">Alias</span>
            <span className="block w-1/4">Description</span>
          </div>
        </Card>
      </Box>
      {props?.list?.map((project) => (
        <ProjectItem key={project.id} id={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
