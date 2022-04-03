import { useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import RegisterDialog from "./RegisterDialog/RegisterDialog";
import { FullScreen, Title, WelcomeMessage, MenuButtons, Button } from './style';

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  return (

    <FullScreen>
      <Title>Welcome to Viral Travel</Title>
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
