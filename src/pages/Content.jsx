import React, { useContext } from "react";
import AdminContext from "../context/adminLayoutContext";
import Category from "./Category/Category";
import Products from "./Products/Products";
import { useRoutes } from "react-router-dom";
import Routes from "../router";

export default function Content() {
  const admincontext = useContext(AdminContext);
  const router=useRoutes(Routes);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${
        admincontext.showSidebar ? "with_sidebar" : ""
      }`}
    >
      {router}
    </section>
  );
}
