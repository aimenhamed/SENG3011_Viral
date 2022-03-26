import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Icon } from "../common/icon/Icon";

const MenuBar = () => {
	const menuItems = [
		{ itemID: 'homeItem', itemIcon: AllIcons.faHome, itemName: 'Home'},
		{ itemID: 'faveItem', itemIcon: AllIcons.faHeart, itemName: 'Favourites'},
		{ itemID: 'countryItem', itemIcon: AllIcons.faLocationDot, itemName: 'Destinations'},
		{ itemID: 'outbreakItem', itemIcon: AllIcons.faVirus, itemName: 'Known outbreaks'},
		{ itemID: 'profileItem', itemIcon: AllIcons.faPerson, itemName: 'Profile'},
		{ itemID: 'flightItem', itemIcon: AllIcons.faPlane, itemName: 'Flight information'},
		{ itemID: 'settingsItem', itemIcon: AllIcons.faCog, itemName: 'Settings'},
	];

	const highlightOnHover = (id: string) => {
		const menuBtn = document.getElementById(id);
		if (menuBtn != null) {
			menuBtn.style.backgroundColor = '#2a9763';
			menuBtn.style.borderRadius = '10px 0px 0px 10px';
		}
	}

	const unHighlight = (id: string) => {
		const menuBtn = document.getElementById(id);
		if (menuBtn != null) {
			menuBtn.style.backgroundColor = '#ffffff';
		}
	} 

    return (
        <div style={{width: '150px', boxShadow: '-10px 0px 25px', paddingLeft: '20px', boxSizing: 'border-box'}}>
        	<div>
               
           	</div>
			<div>
				{
					menuItems.map((menuItem) => 
					<div id={menuItem.itemID} onMouseOver={() => highlightOnHover(menuItem.itemID)} onMouseLeave={() => unHighlight(menuItem.itemID)} onFocus={() => highlightOnHover(menuItem.itemID)} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', paddingLeft: '10px', paddingRight: '20px'}}>
						<FontAwesomeIcon icon={menuItem.itemIcon} size="sm" />
						<div style={{width: '15px'}}> </div>
						<Link to='/' style={{textDecoration: 'none'}}><p style={{fontSize: 'small', color: 'black'}}>{menuItem.itemName}</p></Link>
					</div>
				)
				}
			</div>
			<div style={{height: '100px'}}></div>
			<div style={{position: 'absolute', bottom: '10px'}}>
				<Icon />
			</div>
        </div>
    )
};

export default MenuBar;
