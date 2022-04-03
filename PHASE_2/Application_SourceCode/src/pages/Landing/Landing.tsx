import { useState } from "react";
import Text from "src/components/common/text/Text";
import { LandingPageBackdrop } from "src/components/common/image/imageIndex";
import LoginDialog from "./LoginDialog/LoginDialog";
import RegisterDialog from "./RegisterDialog/RegisterDialog";

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  return (
    <div style={{ backgroundImage: LandingPageBackdrop }}>
      <Text className="landing-page-title">Welcome to Viral Travel</Text>
      <p className="landing-page-welcome">Stay safe while travelling abroad</p>
      <div>
        <button type="button" onClick={() => setIsLoginOpen(true)}>
          Login
        </button>
        <button type="button" onClick={() => setIsRegisterOpen(true)}>
          Register
        </button>
      </div>
      <LoginDialog
        isOpen={isLoginOpen}
        toggleOpen={() => setIsLoginOpen(false)}
      />
      <RegisterDialog
        isOpen={isRegisterOpen}
        toggleOpen={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
