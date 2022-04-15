import { useEffect, useState } from "react";
import { Logo } from "src/components/common/image/imageIndex";
import LoadingDialog from "src/components/LoadingDialog/LoadingDialog";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser, UserLoadingStatusTypes } from "src/logic/redux/reducers/userSlice/userSlice";
import LoginDialog from "./LoginDialog/LoginDialog";
import RegisterDialog from "./RegisterDialog/RegisterDialog";

import { FullScreen, Title, WelcomeMessage, MenuButtons, Button, LogoLanding } from './style';

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const { userLoadingStatus } = useAppSelector(selectUser);

  useEffect(()=> {
    if (userLoadingStatus === UserLoadingStatusTypes.POST_REGISTER_LOADING ||
      userLoadingStatus === UserLoadingStatusTypes.POST_LOGIN_LOADING ) {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
        setIsLoadingOpen(true);
      }
    if (userLoadingStatus === UserLoadingStatusTypes.POST_REGISTER_FAILED)  {
      setIsRegisterOpen(true);
      setIsLoadingOpen(false);
    }
    if (userLoadingStatus === UserLoadingStatusTypes.POST_LOGIN_FAILED)  {
      setIsLoginOpen(true);
      setIsLoadingOpen(false);
    }
  }, [userLoadingStatus])
  return (

    <FullScreen>

      <Title><LogoLanding src={Logo} />Welcome to Viral Travel</Title>
      <WelcomeMessage>Stay safe while travelling abroad</WelcomeMessage>
      <MenuButtons>
        <Button onClick={() => setIsLoginOpen(true)}>
          Login
        </Button>
        <Button onClick={() => setIsRegisterOpen(true)}>
          Register
        </Button>
      </MenuButtons>
      <LoginDialog
        isOpen={isLoginOpen}
        toggleOpen={() => setIsLoginOpen(false)}
      />
      <RegisterDialog
        isOpen={isRegisterOpen}
        toggleOpen={() => setIsRegisterOpen(false)}
      />
      <LoadingDialog
        isOpen={isLoadingOpen}
        toggleOpen={()=> setIsLoadingOpen(false)}
      />
    </FullScreen>
  );
};

export default LandingPage;
