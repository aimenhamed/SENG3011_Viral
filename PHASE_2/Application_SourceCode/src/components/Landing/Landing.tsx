import { FlexLayout } from "../common/layouts/screenLayout";
// import LoginDialog from "./LoginDialog/LoginDialog";
// import { Image } from "../common/image/Image";
// import LandingPageBackdrop from "src/assets/images/LandingPageBackdrop.jpg";
import Text from  "../common/text/Text";
import { BackDrop } from "./style";


const LandingPage = () => {
  return (
    <FlexLayout>
      <BackDrop />
      <img className="logo" alt="Logo" />
      <Text className="landing-page-title">Welcome to Viral Travel</Text>
      <p className="landing-page-welcome">Stay safe while travelling abroad</p>

      <div>
        <button type="button">Login</button>
        <button type="button">Register</button>
      </div>

      {/* <LoginDialog 
        isOpen={}
      /> */}
    </FlexLayout>
  )
}

export default LandingPage;
