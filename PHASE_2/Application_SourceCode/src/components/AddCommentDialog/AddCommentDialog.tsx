import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { postCommentDispatch } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { ICommentPostRequestBody } from "src/interfaces/ResponseInterface";
import Dialog from "../Dialog/Dialog";
import Text from "../common/text/Text";
import { BadText } from "./style";

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
  const [invalidMessage, setInvalidMessage] = useState<boolean>(false);

  const { user } = useAppSelector(selectUser);

  const addComment = () => {
    if (message === "") {
      setInvalidMessage(true);
      return;
    }
    const req: ICommentPostRequestBody = {
      countryId,
      message,
      userId: user!.user.userId!,
    };
    dispatch(postCommentDispatch(req));
    setInvalidMessage(false);
    toggleOpen();
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} title="Add a comment" modalSize="35">
          {invalidMessage && <BadText>Please enter a valid comment.</BadText>}
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
