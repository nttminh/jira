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
  project: GetProjectDetailContent;
};

const ProjectItem = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const project = props.project;
  return (
    <Box className="my-2 w-100" onClick={() => setOpened(true)}>
      <Card variant="outlined">
        <div className="flex flex-row justify-between items-center px-5">
          <span className="block w-1/4">{project?.projectName}</span>
          <span className="block w-1/4">{project?.description}</span>
          <span className="block w-1/4">{project?.id}</span>
          <span className="block w-1/4">{project?.alias}</span>
        </div>
      </Card>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <span className="block w-1/4">{project?.projectName}</span>
          <span className="block w-1/4">{project?.description}</span>
          <span className="block w-1/4">{project?.id}</span>
          <span className="block w-1/4">{project?.alias}</span>
          <Button
            onClick={() => {
              setOpened(false);
            }}
          >
            X
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectItem;
