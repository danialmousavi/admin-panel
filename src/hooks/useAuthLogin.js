import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function useAuthLogin() {
    const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    
    if (userToken) {
      axios
        .get("https://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsLogin(true);
          setLoading(false);
        })
        .catch((err) => {
          setIsLogin(false);
          setLoading(false);
          localStorage.removeItem("loginToken");
        });
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);
  return [isLogin,loading]
}
