import { useEffect, useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import {
  postLoginDispatch,
  selectUserLoadingStatus,
  UserLoadingStatusTypes,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { IUserLoginRequestBody } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { useHistory } from "react-router-dom";
import { sha256 } from 'js-sha256';
import { ModalTitle, LoginModal, GenericLabel, GenericInput, ModalButton, FakeButton, BadText } from '../style';

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
    console.log(`password is ${password}`);
    const req: IUserLoginRequestBody = {
      email,
      password,
    };
    dispatch(postLoginDispatch(req));
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} modalSize="30">
          <LoginModal>
            <ModalTitle>Login</ModalTitle>
            {loadingStatus===UserLoadingStatusTypes.POST_LOGIN_FAILED && (
              <BadText>The email or password was incorrect.</BadText>
            )}
            <GenericLabel>Email</GenericLabel>
            <GenericInput placeholder="Email" type="text" onBlur={(e) => setEmail(e.target.value)} />
            <GenericLabel>Password</GenericLabel>
            <GenericInput
              placeholder="Password"
              type="password"
              onBlur={(e) => setPassword(sha256(e.target.value))}
            />
            <ModalButton type="button" onClick={login}>
              Login!
            </ModalButton>
            <FakeButton type="button">Create an Account</FakeButton>
            <FakeButton type="button">Forgot your password</FakeButton>
          </LoginModal>
          <ModalTitle />

        </Dialog>
      ) : null}
      ;
    </>
  );
};

export default LoginDialog;
