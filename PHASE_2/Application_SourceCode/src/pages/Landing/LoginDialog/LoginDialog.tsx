import { useEffect, useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import Text from "src/components/common/text/Text";
import { useDispatch } from "react-redux";
import {
  postLoginDispatch,
  selectUserLoadingStatus,
  UserLoadingStatusTypes,
} from "src/logic/redux/reducers/userSlice.ts/userSlice";
import { IUserLoginRequestBody } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { useHistory } from "react-router-dom";

type LoginDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const LoginDialog = ({ isOpen, toggleOpen }: LoginDialogProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loadingStatus = useAppSelector(selectUserLoadingStatus);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (loadingStatus === UserLoadingStatusTypes.POST_LOGIN_COMPLETED) {
      history.push("/home");
    }
  }, [loadingStatus]);

  const login = () => {
    const req: IUserLoginRequestBody = {
      email,
      password,
    };
    dispatch(postLoginDispatch(req));
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} title="Login">
          <Text>Enter Login Details</Text>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={login}>
            Login!
          </button>
          <button type="button">Create an Account</button>
          <button type="button">Forgot your password</button>
        </Dialog>
      ) : null}
      ;
    </>
  );
};

export default LoginDialog;
