import React, { useEffect, useState } from "react";
import { getProject } from "../api/getProject";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import ProjectList from "../components/ProjectList/ProjectList";

type Props = {};

const Projects = (props: Props) => {
  const [list, setList] = useState([]);

  const getProjects = async () => {
    try {
      const res = await getProject().getAllProject();
      console.log("getServerSideProps", res);
      setList(res?.data?.content || []);
    } catch (e) {
      setList([]);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <ProjectList list={list} projectName={""} />
    </div>
  );
};

export default Projects;
