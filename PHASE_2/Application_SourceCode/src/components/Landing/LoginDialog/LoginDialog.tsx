// import { FlexLayout } from "src/components/common/layouts/screenLayout";
import { useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import Text from "../../common/text/Text";
import "./LoginDialog.css";

type LoginDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
}

const LoginDialog = ({isOpen, toggleOpen}: LoginDialogProps) => {
  const [ email, setEmail ] =  useState<string>("");
  const [ pasword, setPassword ] = useState<string>("");
  console.log(email);
  console.log(pasword);
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} title="Login">
          <Text>Enter Login Details</Text>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button type="button">Login!</button>
          <button type="button">Create an Account</button>
          <button type="button">Forgot your password</button>
        </Dialog>
      ): null};
    </>
  )
}

export default LoginDialog;