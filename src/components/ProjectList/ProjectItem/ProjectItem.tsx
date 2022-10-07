import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRouter } from 'next/router';
import { GetProjectDetailContent } from "../../../interface/Project";

type Props = {
  project: GetProjectDetailContent;
  id: number;
};

const ProjectItem = (props: Props) => {
	const router = useRouter();
  const [opened, setOpened] = useState(false);
  const project = props.project;
  const activateProject = (e: any) => {
    localStorage.setItem("activeProject", project?.id + "");
    alert(`Project ${project.projectName} is active now!` );
    router.push('/active');
    e.stopPropagation();
  }
  return (
    <Link href={`projects/${props.id}`}>
      <Box
        className="my-2 w-100 cursor-pointer"
        onClick={() => {
          setOpened(true);
        }}
      >
        <Card variant="outlined">
          <div className="flex flex-row justify-between items-center px-5 h-12">
            <span className="block w-1/4">{project?.id}</span>
            <span className="block w-1/4">{project?.projectName}</span>
            <span className="block w-1/4">{project?.alias}</span>
            <span className="block w-1/4">{project?.description}</span>
            <button
              type="button"
              onClick={activateProject}
              >
              <CheckCircleIcon />
            </button>
          </div>
        </Card>
      </Box>
    </Link>
  );
};

export default ProjectItem;
