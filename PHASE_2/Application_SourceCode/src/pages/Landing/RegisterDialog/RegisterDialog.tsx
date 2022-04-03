import { useEffect, useState } from "react";
import Dialog from "src/components/Dialog/Dialog";
import Text from "src/components/common/text/Text";
import { useDispatch } from "react-redux";
import {
  postRegisterDispatch,
  selectUserLoadingStatus,
  UserLoadingStatusTypes,
} from "src/logic/redux/reducers/userSlice.ts/userSlice";
import { IUserRegisterRequestBody } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { useHistory } from "react-router-dom";

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
        <Dialog close={toggleOpen} title="Login">
          <Text>Enter Register Details</Text>
          {isError && (
            <Text>Please ensure both password fields are the same.</Text>
          )}
          <input
            placeholder="Username"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={register}>
            Sign up
          </button>
        </Dialog>
      ) : null}
      ;
    </>
  );
};

export default RegisterDialog;
