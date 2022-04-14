import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useAppSelector } from "src/logic/redux/hooks";
import { Logo } from "src/components/common/image/imageIndex";
import {
  selectUser,
  clearUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import {Author, Bar, Highlight, LogoutButton, LogoutIcon, LogoutStyle, LogoutText, MenuBarIcon, MenuButtons, MenuHeight, MenuIcon, MenuItemsFlexBox, MenuOptionText, MenuStyle, Name, ProfileFlexBox, UserIcon, ViralIcon} from "./style";


const MenuBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);

  const Logout = () => {
    dispatch(clearUser());
  }

  return (
    <Bar>
      <MenuHeight>
        <MenuStyle>
          <ProfileFlexBox>
            <UserIcon> <FontAwesomeIcon icon={AllIcons.faUser} /> </UserIcon>
            <Name>{user?.user.name}</Name>
          </ProfileFlexBox>
        </MenuStyle>

      </MenuHeight>
      <MenuBarIcon>
        <MenuItemsFlexBox>
          <div>
            <Highlight onClick={()=> history.push("/home")}>
              <FontAwesomeIcon icon={AllIcons.faHome} size="sm" />
              <MenuOptionText><NavLink to="/home">  Home </NavLink></MenuOptionText>
            </Highlight>
          </div>

          <div>
            <Highlight onClick={()=> history.push("/search")}>
              <FontAwesomeIcon icon={AllIcons.faVirus} />
              <MenuOptionText><NavLink to="/search"> Search Outbreaks</NavLink></MenuOptionText>
            </Highlight>
          </div>

          <div>
            <Highlight onClick={()=> history.push("/favourites/articles")}>
              <FontAwesomeIcon icon={AllIcons.faHeart} />
              <MenuOptionText><NavLink to="/favourites/articles"> Favourite Articles</NavLink></MenuOptionText>
            </Highlight>
          </div>

          <div>
            <Highlight onClick={()=> history.push("/favourites/countries")}>
              <FontAwesomeIcon icon={AllIcons.faAddressBook} />
              <MenuOptionText><NavLink to="/favourites/countries"> Favourite Countries </NavLink></MenuOptionText>
            </Highlight>
          </div>

          <div>
            <Highlight onClick={()=> history.push("/settings")}>
              <FontAwesomeIcon icon={AllIcons.faCog} />
              <MenuOptionText><NavLink to="/settings"> Settings</NavLink></MenuOptionText>
            </Highlight>
          </div>
        </MenuItemsFlexBox>
      </MenuBarIcon>

      <MenuButtons>
        <LogoutStyle>
          <LogoutIcon><FontAwesomeIcon icon={AllIcons.faSignOut} /></LogoutIcon>
          <LogoutText><LogoutButton><NavLink to="/"> Logout</NavLink></LogoutButton></LogoutText>
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
