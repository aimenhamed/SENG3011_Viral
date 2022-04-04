import { useEffect, useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import {
  postRegisterDispatch,
  selectUserLoadingStatus,
  UserLoadingStatusTypes,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { IUserRegisterRequestBody } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { useHistory } from "react-router-dom";
import { sha256 } from 'js-sha256';
import { ModalTitle, LoginModal, GenericLabel, GenericInput, ModalButton, BadText } from '../style';

type RegisterDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const RegisterDialog = ({ isOpen, toggleOpen }: RegisterDialogProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loadingStatus = useAppSelector(selectUserLoadingStatus);

  const [isError, setIsError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (loadingStatus === UserLoadingStatusTypes.POST_REGISTER_COMPLETED) {
      history.push("/home");
    }
  }, [loadingStatus]);

  const register = () => {
    if (password !== confirmPassword) {
      setIsError(true);
      return;
    }
    setIsError(false);
    const req: IUserRegisterRequestBody = {
      name,
      email,
      password,
    };
    dispatch(postRegisterDispatch(req));
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} modalSize="30">
          <LoginModal>
            <ModalTitle>Enter Register Details</ModalTitle>
            {isError && (
              <BadText>Please ensure both password fields are the same.</BadText>
            )}
            {loadingStatus===UserLoadingStatusTypes.POST_REGISTER_FAILED && (
              <BadText>An account using this email already exists.</BadText>
            )}

            <GenericLabel>Name</GenericLabel>
            <GenericInput
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <GenericLabel>Email</GenericLabel>
            <GenericInput
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <GenericLabel>Password</GenericLabel>
            <GenericInput
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(sha256(e.target.value))}
            />
            <GenericLabel>Confirm Password</GenericLabel>
            <GenericInput
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(sha256(e.target.value))}
            />
            <ModalButton type="button" onClick={register}>
              Sign up
            </ModalButton>
          </LoginModal>
        </Dialog>
      ) : null}
      ;
    </>
  );
};

export default RegisterDialog;
