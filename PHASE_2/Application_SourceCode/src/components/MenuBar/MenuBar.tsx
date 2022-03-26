import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "../common/icon/Icon";

const MenuBar = () => {
	const menuItems = [['homeItem', 'faHome', 'Home']]
	// const menuItems = ['homeItem', 'faveItem', 'countryItem', 'outbreakItem', 'profileItem', 'flightItem', 'settingsItem'];
	// const menuIcons = ['faHome', 'faHeart', 'faLocationDot', 'faVirus', 'faPerson', 'faPlane', 'faCog'];

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

    return (
        <div style={{width: '150px', boxShadow: '-10px 0px 25px'}}>
        	<div>
               
           	</div>
			<div>
				{
					menuItems.map((itemID, itemIcon, itemName) => 
						<div id={itemID} onMouseOver={() => highlightOnHover(itemID)} onMouseLeave={() => unHighlight(itemID)} onFocus={() => highlightOnHover(itemID)}>
							<FontAwesomeIcon icon={AllIcons.itemIcon} />
							{itemName}
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