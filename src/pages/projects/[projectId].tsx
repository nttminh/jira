import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import ProjectItem from "../../components/ProjectList/ProjectItem/ProjectItem";
import { getProject } from "../../api/getProject";
import { GetProjectDetailContent } from "../../interface/Project";
import { useRouter } from "next/router";
import ProjectDetail from "../../components/ProjectList/ProjectDetail/ProjectDetail";
type Props = {};

const Project = (props: Props) => {
  const [project, setProject] = useState<GetProjectDetailContent>();
  const router = useRouter();
  const queryParams = router.query;
  const projectId = queryParams.projectId || 0;
  console.log(projectId);

  const getProjects = async () => {
    try {
      const res = await getProject().getAllProject();
      console.log("res", res);
      const pj = res?.data?.content.find((item: GetProjectDetailContent) => {
        console.log("item", item);

        return item.id + "" == projectId;
      });
      setProject(pj);
      console.log("pj", pj);
    } catch (e) {}
  };
  useEffect(() => {
    getProjects();
  }, []);

  return <ProjectDetail project={project} />;
};

export default Project;