import React from "react";
import { Link, NavLink } from "react-router-dom";
import useHasPermission from "../../../hooks/permissionsHooks";
export default function SidebarItems({title,icon, active,targetPath,pTitle}) {
  const hasPerm = useHasPermission(pTitle)
  
  return hasPerm && (
    <NavLink
    to={targetPath}
      className={`py-1 text-start pe-4 sidebar_menu_item mt-2 ${active?"active":""} siebar_items`}
    >
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap font_08">{title}</span>
    </NavLink>
  );
}
