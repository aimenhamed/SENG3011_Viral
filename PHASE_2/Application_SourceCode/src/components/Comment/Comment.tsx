import { Comment } from "src/interfaces/ViralInterface";
import Text from "../common/text/Text";

type CommentProps = {
  comment: Comment;
};
const CommentCard = ({ comment }: CommentProps) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
      }}
    >
      <div style={{ paddingRight: "1rem" }}>
        <Text bold noMargin>
          {comment.createdBy.name}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {comment.message}
      </div>
    </div>
  );
};

export default CommentCard;
