import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reciveRolesResponse } from '../redux/roles/rolesActions';

export default function useAuthLogin() {
    const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch(); 
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
          setIsLogin(true);
          setLoading(false);
          dispatch(reciveRolesResponse(res.data))
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
