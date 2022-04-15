import { ViralPage } from "src/pages/Home/Home";
import * as AllIcons from "@fortawesome/free-solid-svg-icons";

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

  export default menuItems;
