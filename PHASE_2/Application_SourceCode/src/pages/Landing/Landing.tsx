import { useState } from "react";
import Text from "src/components/common/text/Text";
import { LandingPageBackdrop } from "src/components/common/image/imageIndex";
import LoginDialog from "./LoginDialog/LoginDialog";

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  return (
    <div style={{ backgroundImage: LandingPageBackdrop }}>
      <Text className="landing-page-title">Welcome to Viral Travel</Text>
      <p className="landing-page-welcome">Stay safe while travelling abroad</p>
      <div>
        <button type="button" onClick={() => setIsLoginOpen(true)}>
          Login
        </button>
        <button type="button">Register</button>
      </div>
      <LoginDialog
        isOpen={isLoginOpen}
        toggleOpen={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
