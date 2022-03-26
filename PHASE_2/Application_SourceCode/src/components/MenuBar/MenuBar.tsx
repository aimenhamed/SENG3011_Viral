import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		}
	}

	const unHighlight = (id: string) => {
		const menuBtn = document.getElementById(id);
		if (menuBtn != null) {
			menuBtn.style.backgroundColor = '#ffffff';
		}
	} 
	
	/* menuItems.map((itemID, itemIcon, itemName) => 
						<div id={itemID.toString()} onMouseOver={() => highlightOnHover(itemID.toString())} onMouseLeave={() => unHighlight(itemID.toString())} onFocus={() => highlightOnHover(itemID.toString())}>
							{ <FontAwesomeIcon icon={AllIcons{}} /> }
							{itemName}
						</div>
					) */ 

    return (
        <div style={{width: '150px', boxShadow: '-10px 0px 25px'}}>
        	<div>
               
           	</div>
			<div>
				{
					menuItems.map((menuItem) => 
					<div id={menuItem.itemID} onMouseOver={() => highlightOnHover(menuItem.itemID)} onMouseLeave={() => unHighlight(menuItem.itemID)} onFocus={() => highlightOnHover(menuItem.itemID)}>
						<FontAwesomeIcon icon={menuItem.itemIcon} />
						{menuItem.itemName}
					</div>
				)
				}
			</div>
			<div>
				<Icon />
			</div>
        </div>
    )
};

export default MenuBar;
