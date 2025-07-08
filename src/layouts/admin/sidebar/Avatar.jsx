import React from "react";

export default function Avatar() {
  return (
    <div className="pt-1 pb-2 d-flex flex-column avatar_li position-relative siebar_items">
      <span className="avatar_box">
        <img
          className="w-100 rounded-circle"
          src="/assets/images/avatar/profile.jpg"
        />
      </span>
      <div className="sidebar_avatar_name text-center hiddenable">
        دانیال موسوی
      </div>
    </div>
  );
}
