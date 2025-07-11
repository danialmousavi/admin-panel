import React from "react";

export default function SidebarGroupTitle({title}) {
  return (
    <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover siebar_items">
      <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
    </li>
  );
}
