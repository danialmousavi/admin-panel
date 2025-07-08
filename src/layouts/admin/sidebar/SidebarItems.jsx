import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function SidebarItems({title,icon, active,targetPath}) {
  return (
    <NavLink
    to={targetPath}
      className={`py-1 text-start pe-4 sidebar_menu_item mt-2 ${active?"active":""} siebar_items`}
    >
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap font_08">{title}</span>
    </NavLink>
  );
}
