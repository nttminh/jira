import { TextField } from "@mui/material";
import React, { useState } from "react";
import { getComment } from "../../api/getComment";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const TaskComment = ({ commentList, taskId }) => {
  const [comments, setComments] = useState(commentList);

  const [commentString, setCommentString] = useState("");

  const insertComment = async () => {
    const data = {
      taskId,
      contentComment: commentString,
    };

    const res = await getComment().insertComment(data);
    if (res?.data?.statusCode === 200) {
      const { contentComment = "", taskId } = res?.data?.content;
      setComments([...comments, { contentComment, taskId }]);
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <TextField
          style={{ width: "100%" }}
          key={comment?.contentComment}
          label="Comment"
          variant="standard"
          defaultValue={comment.contentComment}
        />
      ))}

      <TextField
        value={commentString}
        onChange={(e) => setCommentString(e.target.value)}
      />
      <IconButton onClick={insertComment}>
        <SendIcon size="small" />
      </IconButton>
    </div>
  );
};

export default TaskComment;
