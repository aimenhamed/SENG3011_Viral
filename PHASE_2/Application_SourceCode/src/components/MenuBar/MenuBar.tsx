import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Icon } from "../common/icon/Icon";

const MenuBar = () => {
	const menuItems = [
		{ itemID: 'homeItem', itemIcon: AllIcons.faHome, itemName: 'Home', link: 'home'},
		{ itemID: 'faveItem', itemIcon: AllIcons.faHeart, itemName: 'Favourites', link: 'favourites'},
		{ itemID: 'outbreakItem', itemIcon: AllIcons.faVirus, itemName: 'Known outbreaks', link: 'knownOutbreaks'},
		{ itemID: 'profileItem', itemIcon: AllIcons.faPerson, itemName: 'Profile', link: 'profile'},
		{ itemID: 'flightItem', itemIcon: AllIcons.faPlane, itemName: 'Flight information', link: 'flightInfo'},
		{ itemID: 'settingsItem', itemIcon: AllIcons.faCog, itemName: 'Settings', link: 'settings'},
	];

	const highlightOnHover = (id: string) => {
		const btn = document.getElementById(id);

		if (btn != null && id !== 'signOutBtn') {
			btn.style.backgroundColor = '#2a9763';
			btn.style.borderRadius = '10px 0px 0px 10px';
		} else if (btn != null && id === 'signOutBtn') {
			btn.style.filter = 'brightness(1.1)';
		}
	}

	const unHighlight = (id: string) => {
		const btn = document.getElementById(id);
		
		if (btn != null && id !== 'signOutBtn') {
			btn.style.backgroundColor = '#ffffff';
		} else if (btn != null && id === 'signOutBtn') {
			btn.style.filter = 'brightness(1.0)'
		}
	} 

    return (
        <div style={{width: '150px', boxShadow: '-10px 0px 25px', paddingLeft: '20px', boxSizing: 'border-box', height: '100vh'}}>
        	<div style={{height: '40px'}}></div>
			<div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{backgroundColor: '#b6b6b6', borderRadius: '50%', width: '50px', height: '50px', outline: 'auto', outlineColor: '#b6b6b6'}}>
				<div style={{margin: 'auto'}}>
					<FontAwesomeIcon icon={AllIcons.faUser} style={{color: 'white', marginLeft: '8px', marginTop: '10px', fontSize: '40px'}} />
			  	</div>
			  </div>
			  <div style={{width: '10px'}}></div>
			  <div>
				  <p>Person</p>
			  </div>
           	</div>
			<div style={{height: '40px'}}></div>
			<div>
				{
					menuItems.map((menuItem) => 
					<div id={menuItem.itemID} onMouseOver={() => highlightOnHover(menuItem.itemID)} onMouseLeave={() => unHighlight(menuItem.itemID)} onFocus={() => highlightOnHover(menuItem.itemID)} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', paddingLeft: '10px', paddingRight: '20px'}}>
						<FontAwesomeIcon icon={menuItem.itemIcon} size="sm" />
						<div style={{width: '15px'}}> </div>
						<Link to={`/${menuItem.link}`} style={{textDecoration: 'none'}}><p style={{fontSize: 'small', color: 'black'}}>{menuItem.itemName}</p></Link>
					</div>
					)
				}
			</div>
			<div style={{height: '100px'}}></div>
			<div style={{marginLeft: '10px'}}>
				<button id='signOutBtn' type='button' style={{paddingLeft: '10px', paddingRight: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#d1d1d1', cursor: 'pointer'}} onMouseOver={() => highlightOnHover('signOutBtn')} onMouseLeave={() => unHighlight('signOutBtn')} onFocus={() => highlightOnHover('signOutBtn')}>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<FontAwesomeIcon icon={AllIcons.faSignOut} />
						<div style={{width: '10px'}}></div>
						<p>Logout</p>
					</div>
				</button>
			</div>

			<div style={{position: 'absolute', bottom: '10px'}}>
				<Icon />
			</div>
        </div>
    )
};

export default MenuBar;
