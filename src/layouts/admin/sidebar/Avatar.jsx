import React from "react";
import { useSelector } from "react-redux";

export default function Avatar() {
    const user=useSelector(state=>state.rolesReducer.roles)
    const fullname=`${user.first_name||""} ${user.last_name||""}`.trim() || "ادمین اصلی";
  return (
    <div className="pt-1 pb-2 d-flex flex-column avatar_li position-relative siebar_items">
      <span className="avatar_box">
        <img
          className="w-100 rounded-circle"
          src={user.image || "/assets/images/avatar/user.png"}
        />
      </span>
      <div className="sidebar_avatar_name text-center hiddenable">
        <span className="d-block text-white">
          {fullname}
        </span>
      </div>
    </div>
  );
}
