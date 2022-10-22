import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TopicLabel from "./TopicLabel/TopicLabel";
import Point from "./Point/Point";
import Priority from "./Priority/Priority";
import Assignee from "./Assignee/Assignee";
import { LstTask } from "../../interface/Project";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Task } from "../../interface/Task";
import TaskComment from "./TaskComment";

type Props = {
  value: any;
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

const TaskCard = (props: Props) => {
  const task = props.value;
  const [opened, setOpened] = useState(false);

  console.log({ task });

  return (
    <>
      <Box
        sx={{ minWidth: 275 }}
        className="my-2"
        onClick={() => setOpened(true)}
      >
        <Card variant="outlined" className="p-5">
          <p>{task?.alias}</p>
          <TopicLabel value={task.taskTypeDetail.taskType} color="yellow" />
          <div className="flex flex-row justify-between items-center mt-5">
            <Point value={task?.originalEstimate} />
            <Priority level={task?.priorityId} />
            <Assignee />
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
            {props.value?.taskName}
          </Typography>
          <span></span>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              dangerouslySetInnerHTML={{ __html: props.value?.description }}
            />
          </Typography>
          <TaskComment commentList={task?.lstComment} taskId={task?.taskId} />
        </Box>
      </Modal>
    </>
  );
};

export default TaskCard;
