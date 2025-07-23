import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import AdminContext, {
  AdminLayoutContainer,
} from "../../context/adminLayoutContext";
import Content from "../../pages/Content";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthLogin from "../../hooks/useAuthLogin";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";

export default function Index() {
  const [isLogin,loading]=useAuthLogin()

  const{roles,error}=useSelector(state=>state.rolesReducer);
  console.log(roles);
  
  return (
    <>
      <AdminLayoutContainer>
        {loading ? (
          <>
            <Loading/>
          </>
        ) : (
          <>
            {isLogin ? (
              <>
                <Navbar />
                <Sidebar />
                <Content />
              </>
            ) : (
              <>
                <Navigate to="/auth/login" />
              </>
            )}
          </>
        )}
      </AdminLayoutContainer>
    </>
  );
}
