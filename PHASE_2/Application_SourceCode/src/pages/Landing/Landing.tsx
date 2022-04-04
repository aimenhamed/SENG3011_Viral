import { useState } from "react";
import { Logo } from "src/components/common/image/imageIndex";
import LoginDialog from "./LoginDialog/LoginDialog";
import RegisterDialog from "./RegisterDialog/RegisterDialog";

import { FullScreen, Title, WelcomeMessage, MenuButtons, Button, LogoLanding } from './style';

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
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
    </FullScreen>
  );
};

export default LandingPage;
