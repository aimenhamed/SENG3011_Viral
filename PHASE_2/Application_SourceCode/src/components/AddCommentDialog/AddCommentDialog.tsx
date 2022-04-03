import { useState } from "react";
import { useDispatch } from "react-redux";
import { postCommentDispatch } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { ICommentPostRequestBody } from "src/interfaces/ResponseInterface";
import Dialog from "../Dialog/Dialog";
import Text from "../common/text/Text";

type AddCommentDialogProps = {
  countryId: string;
  isOpen: boolean;
  toggleOpen: () => void;
};

const AddCommentDialog = ({
  countryId,
  isOpen,
  toggleOpen,
}: AddCommentDialogProps) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");

  const addComment = () => {
    const req: ICommentPostRequestBody = {
      countryId,
      message,
      userId: "", // TODO: get from redux store
    };
    dispatch(postCommentDispatch(req));
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} title="Add a comment" modalSize="35">
          <Text>Please enter a message for your comment:</Text>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", height: "4rem" }}
          />
          <button type="button" onClick={addComment}>
            Comment
          </button>
        </Dialog>
      ) : null}
    </>
  );
};

export default AddCommentDialog;
