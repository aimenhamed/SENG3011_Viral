import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  selectUser,
  clearUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { ViralPage } from "src/pages/Home/Home";
import { Icon } from "../common/icon/Icon";

type MenuBarProps = {
  navigate: (page: ViralPage) => void;
};

const MenuBar = ({ navigate }: MenuBarProps) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);
  const menuItems = [
    {
      itemID: "homeItem",
      itemIcon: AllIcons.faHome,
      itemName: "Home",
      link: "home",
      page: ViralPage.MAP,
    },
    {
      itemID: "faveArticle",
      itemIcon: AllIcons.faAddressBook,
      itemName: "Bookmarked Articles",
      link: "faveArticle",
      page: ViralPage.BOOKMARKED_ARTICLES,
    },
    {
      itemID: "faveCountry",
      itemIcon: AllIcons.faHeart,
      itemName: "Bookmarked Countries",
      link: "faveCountry",
      page: ViralPage.BOOKMARKED_COUNTRIES,
    },
    {
      itemID: "outbreakItem",
      itemIcon: AllIcons.faVirus,
      itemName: "Known outbreaks",
      link: "knownOutbreaks",
      page: ViralPage.ARTICLES,
    },
    {
      itemID: "settingsItem",
      itemIcon: AllIcons.faCog,
      itemName: "Settings",
      link: "settings",
      page: ViralPage.SETTINGS,
    },
  ];

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
    <div
      style={{
        width: "150px",
        boxShadow: "-10px 0px 25px",
        paddingLeft: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ height: "40px" }} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "#b6b6b6",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            outline: "auto",
            outlineColor: "#b6b6b6",
          }}
        >
          <div style={{ margin: "auto" }}>
            <FontAwesomeIcon
              icon={AllIcons.faUser}
              style={{
                color: "white",
                marginLeft: "8px",
                marginTop: "10px",
                fontSize: "40px",
              }}
            />
          </div>
        </div>
        <div style={{ width: "10px" }} />
        <div>
          <p>{user?.user.name}</p>
        </div>
      </div>
      <div style={{ height: "40px" }} />
      <div>
        {menuItems.map((menuItem) => (
          <div
            key={menuItem.itemID}
            role="button"
            tabIndex={0}
            onKeyDown={() => navigate(menuItem.page)}
            onClick={() => navigate(menuItem.page)}
            id={menuItem.itemID}
            onMouseOver={() => highlightOnHover(menuItem.itemID)}
            onMouseLeave={() => unHighlight(menuItem.itemID)}
            onFocus={() => highlightOnHover(menuItem.itemID)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              paddingLeft: "10px",
              paddingRight: "20px",
            }}
          >
            <FontAwesomeIcon icon={menuItem.itemIcon} size="sm" />
            <div style={{ width: "15px" }}> </div>
            <p style={{ fontSize: "small", color: "black" }}>
              {menuItem.itemName}
            </p>
          </div>
        ))}
      </div>
      <div style={{ height: "100px" }} />
      <div style={{ marginLeft: "10px" }}>
        <button
          id="signOutBtn"
          type="button"
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#d1d1d1",
            cursor: "pointer",
          }}
          onMouseOver={() => highlightOnHover("signOutBtn")}
          onMouseLeave={() => unHighlight("signOutBtn")}
          onFocus={() => highlightOnHover("signOutBtn")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
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
            <div style={{ width: "10px" }} />
            <p>Logout</p>
          </div>
        </button>
      </div>

      <div style={{ position: "absolute", bottom: "10px" }}>
        <Icon />
      </div>
    </div>
  );
};

export default MenuBar;
