import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Text from "../common/text/Text";
import { AdviceIcon, CollapsibleButton } from "./style";

type IProps = {
  icon?: string;
  aIcon?: IconProp;
  title: string;
  children: ReactNode;
};

const Collapsible = ({ children, icon, aIcon, title }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {icon && <AdviceIcon src={icon} />}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "1rem",
          }}
        >
          {aIcon && <FontAwesomeIcon icon={aIcon} size="3x" />}
        </div>
        <Text fontSize="1.75rem">{title}</Text>
        <CollapsibleButton
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {!isOpen ? (
            <FontAwesomeIcon icon={faPlus} />
          ) : (
            <FontAwesomeIcon icon={faMinus} />
          )}
        </CollapsibleButton>
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
};

export default Collapsible;
