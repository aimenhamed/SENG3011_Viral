import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import Dialog from "src/components/Dialog/Dialog";
import {
  UpdateUserInterface,
  putUserUpdateDispatch,
  selectUserLoadingStatus,
  UserLoadingStatusTypes,
  selectUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import {
  BadText,
  GenericInput,
  GenericLabel,
  GoodText,
  LoginModal,
  ModalButton,
  ModalTitle,
} from "src/pages/Landing/style";
import { sha256 } from "js-sha256";
import Text from "src/components/common/text/Text";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const ChangeSettingsDialog = ({ isOpen, toggleOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const loadingStatus = useAppSelector(selectUserLoadingStatus);

  const [newName, setNewName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [isNotMatching, setIsNotMatching] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser);

  const update = () => {
    if (!user) {
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setIsNotMatching(true);
      return;
    }
    const req: UpdateUserInterface = {
      userId: user.user.userId,
      body: {
        name: newName.length > 0 ? newName : undefined,
        password: newPassword.length > 0 ? sha256(newPassword) : undefined,
      },
    };
    dispatch(putUserUpdateDispatch(req));
    setNewName("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsNotMatching(false);
  };

  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} modalSize="30">
          <LoginModal>
            <ModalTitle>Change Details</ModalTitle>
            <Text>Empty fields will not be changed.</Text>
            {isNotMatching && <BadText>Passwords do not match.</BadText>}
            {loadingStatus ===
              UserLoadingStatusTypes.PUT_USER_UPDATE_COMPLETED && (
              <GoodText>Your details has been updated.</GoodText>
            )}
            <GenericLabel>New Name</GenericLabel>
            <GenericInput
              placeholder="New name"
              type="text"
              onChange={(e) => setNewName(e.target.value)}
            />
            <GenericLabel>New Password</GenericLabel>
            <GenericInput
              placeholder="New password"
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <GenericLabel>Confirm New Password</GenericLabel>
            <GenericInput
              placeholder="Confirm New password"
              type="text"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <ModalButton type="button" onClick={update}>
              Submit
            </ModalButton>
          </LoginModal>
          <ModalTitle />
        </Dialog>
      ) : null}
    </>
  );
};

export default ChangeSettingsDialog;
