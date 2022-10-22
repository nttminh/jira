import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import TopicLabel from "../../TaskCard/TopicLabel/TopicLabel";
import Point from "../../TaskCard/Point/Point";
import Priority from "../../TaskCard/Priority/Priority";
import Assignee from "../../TaskCard/Assignee/Assignee";
import { Task } from "../../../interface/Task";

type Props = {
  value: Task;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskItem = (props: Props) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Box className="my-2 w-100" onClick={() => setOpened(true)}>
        <Card variant="outlined">
          <div className="flex flex-row justify-between items-center px-5">
            <span className="block w-3/4">{props.value.taskName}</span>
            <div className="flex flex-row justify-between  items-center w-1/4">
              <TopicLabel value="Topic Label" color="yellow" />
              <Assignee />
              <Priority level={props.value.priorityId} />
              <Point value={props.value.originalEstimate} />
            </div>
          </div>
        </Card>
      </Box>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.value.taskName}
          </Typography>
          <span></span>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.value.description}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default TaskItem;
