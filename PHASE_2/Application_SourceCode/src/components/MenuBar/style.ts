import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Bar = styled.div`
    width: 180px;
    box-shadow: -10px 0px 50px;
    padding-left: 0px;
    box-sizing: border-box;
    border-radius: 0 5px 5px 0;
    background-color: white;

`;

export const IconSize = styled.div`
    position: absolute;
    bottom: 10px;
`;

export const MenuHeight = styled.div`
  height: 200px;
  padding: -50px;
  //display: flex;
  flex-direction: row;
  width: 100px;
`;

export const MenuWidth = styled.div`
  display: flex;
  flexDirection: row ;
`;

export const MenuButtons = styled.button`
  position: absolute;
  bottom: 115px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #d1d1d1;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

export const MenuSize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  padding-right: 20px;
  height = 80px;

`;

export const MenuStyle = styled.div`
  position: absolute;
  top: 40px;
  left: 60px;
  background-color: #b6b6b6;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  outline: auto;
  outline-color: #b6b6b6;
  margin: auto;
`;

export const LogoutButton = styled.div`
  padding-right: 20px;
  border: none;
  border-radius: 20px;
  background-color: #d1d1d1;
  cursor: pointer;
  width: 20px;
  top:20px;
  
`;

export const ViralIcon = styled.img`
  position: absolute;
  align-items: center;
  height: 30px;
  width: 30px;

  bottom: 30vh;
  background-color: #fff;
  padding: 0rem;
  right: 60px;
  bottom: 5px;
  border-radius: 50%;
  flex-direction: row;
  padding-left: 100px;
`;

export const MenuIcon = styled.div`
  position: absolute;
  bottom:0px;
  left: 60px;
  color: white;
  margin-left: -14px;
  margin-bottom: 10px;
  color: black;
  padding-left: -15px;
  font-size: 40px;
`;

export const UserIcon = styled.div`
  position: absolute;
  top: -2px;
  color: white;
  font-size: 40px;
  width: 10px;
  height: 40px;
  padding-right: 23px;
  
`;


export const Name = styled.div`
  padding-top: 70px;
  width: 150px;
  overflow-wrap: break-word;
  left: 0px;    
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  color: black;

`;

export const NavLinkBtn = styled(NavLink)`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin: 15px 0px;
  text-decoration: none;
  color: black;
  transition: 0.3s;
  a:link {
    text-decoration: none;
    color: black;
    font-size: 14px;
    font-weight: medium;
  }
  a:visited {
    color: black;
  }
  :hover {
    background-color: #52c489;
    border-radius: 100px 0px 0px 100px;
  }  

  &.${props => props.activeClassName} {
    background-color: #52c489;
    border-radius: 100px 0px 0px 100px;
  }
`

export const MenuBarIcon = styled.div`
  color: black;
  font-size: 15px;
  height: 20px;
  margin-left: 15px;
  white-space: nowrap;
  
`;

export const MenuOptionText = styled.div`
  font-weight: bold;
  color: black;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  padding-left: 5px;
`;

export const LogoutStyle = styled.div`
  a:visited {
    color: black;
  }
  a:link {
    text-decoration: none;
    color: black;
  }
  margin-left: 5px;
`;

export const Author = styled.div`
  padding-top: 90px;
  font-size: 24px;
  font-weight: bold;
  margin-left: 30px;
  margin-top: 5px;
`;

export const LogoutIcon = styled.div`
  margin-left: 0px;
  margin-bottom: -5px; 
  padding-bottom: -101px;
`;

export const LogoutText = styled.div`
  padding-left: 25px;
  padding-top: 100px;
  position: absolute;
  bottom: 15px;
  left: 10px;
  font-weight: bold;
`;

export const ProfileFlexBox = styled.div`
display: flex;
text-align: center;
flex-direction: column;
align-items: center;
`;

export const MenuItemsFlexBox = styled.div`
diplay: flex;
align-items: right;
border-radius: 100px 0px 0px 100px;
height: 130px;

`;


