import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "src/logic/redux/hooks";
import { Logo } from "src/components/common/image/imageIndex";
import {
  selectUser,
  clearUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import {
  Author,
  Bar,
  LogoutButton,
  LogoutIcon,
  LogoutStyle,
  LogoutText,
  MenuBarIcon,
  MenuButtons,
  MenuHeight,
  MenuIcon,
  MenuItemsFlexBox,
  MenuOptionText,
  MenuStyle,
  Name,
  NavLinkBtn,
  ProfileFlexBox,
  UserIcon,
  ViralIcon,
} from "./style";

const MenuBar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);

  const Logout = () => {
    dispatch(clearUser());
  };

  return (
    <Bar>
      <MenuHeight>
        <MenuStyle>
          <ProfileFlexBox>
            <UserIcon>
              <FontAwesomeIcon icon={AllIcons.faUser} />
            </UserIcon>
            <Name>{user?.user.name}</Name>
          </ProfileFlexBox>
        </MenuStyle>
      </MenuHeight>
      <MenuBarIcon>
        <MenuItemsFlexBox>
          <NavLinkBtn to="/home" activeClassName="selected">
            <FontAwesomeIcon icon={AllIcons.faHome} size="sm" />
            <MenuOptionText>Home</MenuOptionText>
          </NavLinkBtn>

          <NavLinkBtn to="/search" activeClassName="selected">
            <FontAwesomeIcon icon={AllIcons.faVirus} />
            <MenuOptionText>Search Outbreaks</MenuOptionText>
          </NavLinkBtn>

          <NavLinkBtn to="/favourites/countries" activeClassName="selected">
            <FontAwesomeIcon icon={AllIcons.faHeart} />
            <MenuOptionText>Favourites</MenuOptionText>
          </NavLinkBtn>

          <NavLinkBtn to="/settings" activeClassName="selected">
            <FontAwesomeIcon icon={AllIcons.faCog} />
            <MenuOptionText>Settings</MenuOptionText>
          </NavLinkBtn>
        </MenuItemsFlexBox>
      </MenuBarIcon>

      <MenuButtons>
        <LogoutStyle>
          <LogoutIcon>
            <FontAwesomeIcon icon={AllIcons.faSignOut} />
          </LogoutIcon>
          <LogoutText>
            <LogoutButton>
              <NavLink to="/"> Logout</NavLink>
            </LogoutButton>
          </LogoutText>
          {Logout}
        </LogoutStyle>
      </MenuButtons>
      <MenuIcon>
        <ViralIcon src={Logo} /> <Author>Viral</Author>
      </MenuIcon>
    </Bar>
  );
};

export default MenuBar;
