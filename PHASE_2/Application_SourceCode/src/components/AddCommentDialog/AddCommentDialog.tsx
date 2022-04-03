import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import Text from "../common/text/Text";

type AddCommentDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const AddCommentDialog = ({ isOpen, toggleOpen }: AddCommentDialogProps) => {
  const [message, setMessage] = useState<string>("");
  console.log(message);
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} title="Add a comment">
          <Text>Please enter a message for your comment:</Text>
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
        </Dialog>
      ) : null}
    </>
  );
};

export default AddCommentDialog;
