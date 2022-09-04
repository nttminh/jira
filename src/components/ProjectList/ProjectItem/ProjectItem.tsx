import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GetProjectDetailContent } from "../../../interface/Project";

type Props = {
  project: GetProjectDetailContent;
  id: number;
};

const ProjectItem = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const project = props.project;
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
          </div>
        </Card>
      </Box>
    </Link>
  );
};

export default ProjectItem;
