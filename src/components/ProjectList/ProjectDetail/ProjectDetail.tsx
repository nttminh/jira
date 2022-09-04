import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GetProjectDetailContent } from "../../../interface/Project";

type Props = {
  project: GetProjectDetailContent | undefined;
};

const ProjectDetail = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const project = props.project;
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
      </Card>
    </Box>
  );
};

export default ProjectDetail;
