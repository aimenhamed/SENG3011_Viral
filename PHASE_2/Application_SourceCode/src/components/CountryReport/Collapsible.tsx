import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import {CollapsibleButton, TitleText } from "./style";

 type IProps = {
   // open?: boolean;
   title: string;
   children: any;
 }

const Collapsible = ({ title, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

    // const Expand = () => {
    //   setIsOpen((prev) => !prev);
    // };

  return (
    <>
      <div className="card">
        <div>
          {/* <div className="p-3 border-bottom d-flex justify-content-between"> */}
            
            <TitleText>{title}</TitleText>
             <CollapsibleButton type="button" className="collapsible" onClick={() => setIsOpen((prev) => !prev)}> 
            {/* <button type='button' className='button' onClick={setIsOpen(!isOpen)}> </button> */}
              {!isOpen ? (
                <FontAwesomeIcon icon={faChevronDown} /> 
              ) : (
                <FontAwesomeIcon icon={faChevronUp} />
              )}
             </CollapsibleButton> 
          {/* </div> */}
        </div>

        {/* <div className="border-bottom"> */}
         <div>{isOpen && <div>{children}</div>}</div> 
        {/* <div className={isOpen ? 'content show' : 'content'}>{children}</div> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default Collapsible;
