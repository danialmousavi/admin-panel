import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import useAuthLogin from "../../hooks/useAuthLogin";

export default function AuthLayout() {
  const [isLogin, loading] = useAuthLogin();

  return (
    <>
      {loading ? (
          <>
            <div className="aler alert-info  d-flex justify-content-center align-items-center" style={{height:"100px"}}>
              <h1>لطفا صبر کنید</h1>
            </div>
          </>
      ) : (
        <>
          {!isLogin ? (
            <>
              <Routes>
                <Route path="/auth/login" element={<Login />} />
              </Routes>
            </>
          ) : (
            <Navigate to="/auth/login" />
          )}
        </>
      )}
    </>
  );
}
