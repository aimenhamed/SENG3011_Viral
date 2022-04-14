import styled from "styled-components";

export const Bar = styled.div`
    width: 180px;
    box-shadow: -10px 0px 50px;
    padding-left: 0px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: white;

`;

export const IconSize = styled.div`
    position: absolute;
    bottom: 10px;
`;

export const MenuHeight = styled.div`
  height: 90px;
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
  margin-left: 17px;
  left: 15px;
  

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

export const Iconalign = styled.div`
  position: flex;
  top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 20px;
  padding-bottom: 15px;

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
  padding-left: 12px;
  
`;

export const MenuText = styled.div`
  position: flex;
  bottom: 200px;
  width: 90px;
  height: 60px;
  font-size: small;
  color: black;
  padding-left: 1px;
  padding-top: 25px;
  align-items: center;
  height: 90px;
`;

export const Name = styled.div`
  position: absolute;
  top: 80px;
  left: -5px;
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  color: black;

`;

export const Highlight = styled.div`
  a:link {
    text-decoration: none;
    color: black;
  }
  :hover {
    background-color: #52c489;
    border-radius: 5px;
    filter = brightness(1.1);
  }
  text-decoration: none;
  a:visited {
    color: black;
  }
`;


export const MenuBarIcon = styled.div`
  margin-left: 1rem;
  color: black;
  font-size: 20px;
  height: 20px;
  margin-bottom: 19px;
`;

export const MenuOptionText = styled.div`
  font-weight: bold;
  color: black;
  margin-left: 35px;
  width: 45px;
  margin-top: -26px;
  font-size: 20px;
  text-decoration: none;
  height: 70px;

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
