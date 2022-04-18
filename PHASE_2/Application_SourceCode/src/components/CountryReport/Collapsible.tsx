import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import {CollapsibleButton } from "./style";

 type IProps = {
   children: any;
 }

const Collapsible = ({ children }: IProps) => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="card">
        <div>
          <CollapsibleButton type="button" className="collapsible" onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? (
              <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faMinus} />
              )}
          </CollapsibleButton>
        </div>
        <div>{isOpen && <div>{children}</div>}</div>
      </div>
    </>
  );
};

export default Collapsible;

