import { TextField } from "@mui/material";
import React, { useState } from "react";
import { getComment } from "../../api/getComment";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
type Props = {
  commentList: any;
  taskId: any;

};
const TaskComment = (props: Props) => {
  const [comments, setComments] = useState(props.commentList);

  const [commentString, setCommentString] = useState("");

  const insertComment = async () => {
    const data = {
      taskId: props.taskId,
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
      {comments.length > 0 ? comments.map((comment: {contentComment: unknown;}) => (
        <TextField
          style={{ width: "100%" }}
          key={`${comment?.contentComment}key`}
          label="Comment"
          variant="standard"
          defaultValue={comment.contentComment}
        />
      )) : 'Not have any comment'}

      <TextField
        value={commentString}
        onChange={(e) => setCommentString(e.target.value)}
      />
      <IconButton onClick={insertComment}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default TaskComment;
