import React from "react";

export default function SidebarItems({title,icon, active}) {
  return (
    <li
      className={`py-1 text-start pe-4 sidebar_menu_item mt-2 ${active?"active":""}`}
    >
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap font_08">{title}</span>
    </li>
  );
}
