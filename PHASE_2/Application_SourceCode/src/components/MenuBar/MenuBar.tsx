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
import {Author, Bar, Highlight, LogoutButton, LogoutIcon, LogoutStyle, LogoutText, MenuBarIcon, MenuButtons, MenuHeight, MenuIcon, MenuOptionText, MenuStyle, Name, UserIcon, ViralIcon} from "./style";


const MenuBar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);
  
  const Logout = () => {
    dispatch(clearUser());
  }

  return (
    <Bar>
      <MenuHeight>
        <MenuStyle>
          <UserIcon> <FontAwesomeIcon icon={AllIcons.faUser} /> </UserIcon>
          <Name>{user?.user.name}</Name>
        </MenuStyle>

        </MenuHeight>
            <MenuBarIcon>
              <div>
              <div style={{ height: "130px" }} />
                <Highlight>
                  <FontAwesomeIcon icon={AllIcons.faHome} />
                  <MenuOptionText><NavLink to="/home"> Home </NavLink></MenuOptionText>
                </Highlight>
              </div>

              <div>
                <Highlight>
                  <FontAwesomeIcon icon={AllIcons.faVirus} />
                  <MenuOptionText><NavLink to="/search"> Search Outbreaks </NavLink></MenuOptionText>
                </Highlight>
              </div>
              
              <div>
                <Highlight>
                  <FontAwesomeIcon icon={AllIcons.faHeart} />
                  <MenuOptionText><NavLink to="/favourites/articles"> Favourite Articles </NavLink></MenuOptionText>
                </Highlight>
              </div>

              <div>
                <Highlight>
                  <FontAwesomeIcon icon={AllIcons.faAddressBook} />
                  <MenuOptionText><NavLink to="/favourites/countries"> Favourite Countries </NavLink></MenuOptionText>
                </Highlight>
              </div>

              <div>
                <Highlight>
                  <FontAwesomeIcon icon={AllIcons.faCog} />
                  <MenuOptionText><NavLink to="/settings"> Settings</NavLink></MenuOptionText>
                </Highlight>
              </div>

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
