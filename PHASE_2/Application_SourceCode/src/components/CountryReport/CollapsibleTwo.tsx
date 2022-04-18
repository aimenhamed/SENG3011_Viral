import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { CollapsibleButton1 } from "./style";

 type IProps = {
   // open?: boolean;
//    title: string;
   children: any;
 }

const CollapsibleTwo = ({ children }: IProps) => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="card">
        <div>
          <CollapsibleButton1 type="button" className="collapsible" onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? (
              <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faMinus} />
              )}
          </CollapsibleButton1>
        </div>
        <div>{isOpen && <div>{children}</div>}</div>
      </div>
    </>
  );
};

export default CollapsibleTwo;
