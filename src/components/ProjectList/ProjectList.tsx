import React from "react";
import ProjectItem from "./ProjectItem/ProjectItem";
import { GetProjectDetailContent } from "../../interface/Project";
type Props = {
  list: GetProjectDetailContent[];
  title?: string;
  projectName: string;
};

const ProjectList = (props: Props) => {
  console.log("list", props.list);
  return (
    <div>
      {props?.list?.map((project) => (
        <ProjectItem key={project.alias} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
