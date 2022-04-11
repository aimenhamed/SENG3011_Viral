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
import {Bar, LogoutButton, MenuButtons, MenuHeight, MenuIcon, MenuSize, MenuStyle, Name, UserIcon, ViralIcon} from "./style";


const MenuBar = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);
  
  

 
  const highlightOnHover = (id: string) => {
    const btn = document.getElementById(id);

    if (btn != null && id !== "signOutBtn") {
      btn.style.backgroundColor = "#2a9763";
      btn.style.borderRadius = "10px 0px 0px 10px";
    } else if (btn != null && id === "signOutBtn") {
      btn.style.filter = "brightness(1.1)";
    }
  };

  const unHighlight = (id: string) => {
    const btn = document.getElementById(id);

    if (btn != null && id !== "signOutBtn") {
      btn.style.backgroundColor = "#ffffff";
    } else if (btn != null && id === "signOutBtn") {
      btn.style.filter = "brightness(1.0)";
    }
  };

  return (
    <Bar>
      <MenuHeight>
        <MenuStyle>
          <UserIcon> <FontAwesomeIcon icon={AllIcons.faUser} /> </UserIcon>
          <Name>{user?.user.name}</Name>
        </MenuStyle>
          
        </MenuHeight>
          <div style={{ height: "100px" }} />
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/search">Search Known Outbreaks</NavLink>
          <NavLink to="/favourites/articles">Favourite Articles</NavLink>
          <NavLink to="/favourites/countries">Favourite Countries</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        
        <MenuButtons
          id="signOutBtn"
          type="button"
          onMouseOver={() => highlightOnHover("signOutBtn")}
          onMouseLeave={() => unHighlight("signOutBtn")}
          onFocus={() => highlightOnHover("signOutBtn")}
        >
          <MenuSize
            role="button"
            tabIndex={0}
            onKeyDown={() => {
              dispatch(clearUser());
            }}
            onClick={() => {
              dispatch(clearUser());
            }}
          >
            <FontAwesomeIcon icon={AllIcons.faSignOut} />
            <LogoutButton>Logout</LogoutButton>
          </MenuSize>
        </MenuButtons>
      <MenuIcon>
        <ViralIcon src={Logo} /> Viral
      </MenuIcon>
    </Bar>
    
    
  );
};

export default MenuBar;
