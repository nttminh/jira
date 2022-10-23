import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { getComment } from '../../api/getComment';
type Props = {
  commentList: any;
  taskId: any;
};
const TaskComment = (props: Props) => {
  const [comments, setComments] = useState(props.commentList);

  const [commentString, setCommentString] = useState('');

  const insertComment = async () => {
    const data = {
      taskId: props.taskId,
      contentComment: commentString,
    };

    const res = await getComment().insertComment(data);
    if (res?.data?.statusCode === 200) {
      if (res?.data?.content) {
        const { contentComment = '', taskId } = res.data.content;
        setComments([...comments, { contentComment, taskId }]);
      }
    }
  };

  return (
    <div>
      {comments.length > 0
        ? comments.map((comment: { contentComment: unknown }) => (
            <TextField
              style={{ width: '100%' }}
              key={`${comment?.contentComment}key`}
              label="Comment"
              variant="standard"
              defaultValue={comment.contentComment}
            />
          ))
        : 'Not have any comment'}

      <br />
      <TextField
        style={{ width: '90%' }}
        value={commentString}
        placeholder="Add your comment"
        onChange={(e) => setCommentString(e.target.value)}
      />
      <IconButton onClick={insertComment}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default TaskComment;
