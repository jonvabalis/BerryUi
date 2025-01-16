import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

import { SIDEBAR_DATA } from "./SidebarData";

interface SidebarItemsProps {
  displaySidebar: boolean;
}

const SidebarItems = ({ displaySidebar }: SidebarItemsProps) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <ItemsList>
      {SIDEBAR_DATA.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.link}>
            <ItemWrapper>
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.text}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
