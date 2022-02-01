import { useState, useEffect } from "preact/compat";
import { FunctionalComponent, h } from 'preact';
import React from "preact/compat";

// type Align = "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"; 
type Props = {
  children?: string;
  position: string;
  icons?: Array<Item>
};

import { getFirstFourElements, getRemainingElements, getShareIcon } from "./Util";
import { Item } from "../types";
import EllipsisHIcon from "../icons/EllipsisH";
  
export const ShareIcons: FunctionalComponent<Props> = ({
    children,
    position,
    icons
  }) => {
    const [items, setItems] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);

    const updateItemsList = (iconsList) => {
      let id = 0;
      const updatedIcons = iconsList.map(ic => {
        id += 1
        return {
          id: id,
          name: ic.name,
          link: ic.link,
          icon: getShareIcon(ic.name, ic.link, (id <= 4 ? 58 : 30))
        }
      });

      if (updatedIcons.length < 4) {
        setItems(updatedIcons.slice(0));
      } else {
        setItems(updatedIcons.slice(0, 4));
        setDropdownItems(updatedIcons.slice(4, updatedIcons.length));
      }
    }

   useEffect(() => {
    updateItemsList(icons);
   }, [icons, position]);

  const getAlignClass = () => {
    let alignClass = "";
    if (position === "left") {
      alignClass += "flex-col left-0 top-margin";
    } else if (position === "right") {
      alignClass += "flex-col right-0 top-margin";
    } else if (position === "top") {
      alignClass += "flex top-0 justify-center w-screen";
    } else if (position === "bottom") {
      alignClass += "flex bottom-0 justify-center w-screen";
    } else  if (position === "top-left") {
      alignClass += "flex flex-row-reverse top-0 left-0";
    } else  if (position === "top-right") {
      alignClass += "flex top-0 right-0";
    } else  if (position === "bottom-left") {
      alignClass += "flex flex-row-reverse bottom-0 left-0";
    } else if (position === "bottom-right") {
      alignClass += "flex bottom-0 right-0";
    } else {
      alignClass += "flex-col left-0 top-margin";
    }

    return alignClass;
  }
  
  return (
    <div class={`${"s-soft"} ${getAlignClass()}`} >
      {items.map((item, index) => (
        <div
          class={`${"s-item"} ${item.name} cursor-pointer `}
          target="_blank"
        >
          {item.icon}
        </div>
      ))}
    

      {dropdownItems.length > 0 && (
        <div  class={`relative inline-block ${"dropdown"}`}>
          <a
            class={`${"s-item"} cursor-pointer bg-green-600 `}
          >
            {/* <span class="fa fa-ellipsis-h"></span> */}
            <EllipsisHIcon width="40" height="58" />
          </a>
            <div class={position.indexOf("bottom") !== -1  ? "dropup-content": "dropdown-content"}>
              <ul class="py-1 m-0 px-0 list-none">
                {dropdownItems.map((di, i) => (
                  <li>
                    <div
                      class={`flex cursor-pointer block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                      target="_blank"
                    >
                      {di.icon} 
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      )}
    </div>
  );

   
  };
  