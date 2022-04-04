import { useState } from "react";
import { FlexLayout } from "src/components/common/layouts/screenLayout";
import UnimplementedDialog from "src/components/UnimplementedDialog/UnimplementedDialog";
import Text from "../../components/common/text/Text";
import ChangeSettingsDialog from "./ChangeSettingsDialog/ChangeSettingsDialog";
import  { Banner, SettingsContent, SettingsButton } from "./style";

const SettingsPage = () => {
  const [isChangeNameOpen, setIsChangeName] = useState<boolean>(false);
  const [isUnimplementedOpen, setIsUnimplemented]=useState<boolean>(false);

  return (
    <FlexLayout>
      <Banner>
        <Text bold fontSize="2rem">Settings</Text>
      </Banner>
      <SettingsContent>
        <SettingsButton onClick={()=> setIsChangeName(true)}>
          Change name or password
        </SettingsButton>
        <SettingsButton onClick={()=> setIsUnimplemented(true)}>
          Change profile picture
        </SettingsButton>
        <SettingsButton onClick={()=> setIsUnimplemented(true)}>
          Terms and Conditions
        </SettingsButton>
        <SettingsButton onClick={()=> setIsUnimplemented(true)}>Privacy</SettingsButton>
      </SettingsContent>
      <ChangeSettingsDialog
        isOpen={isChangeNameOpen}
        toggleOpen={() => setIsChangeName(false)}
      />
      <UnimplementedDialog
        isOpen={isUnimplementedOpen}
        toggleOpen={() => setIsUnimplemented(false)}
      />


    </FlexLayout>
)
}


export default SettingsPage;
