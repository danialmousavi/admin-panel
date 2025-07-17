import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrevBtn() {
    const navigate = useNavigate();
  return <button type="button" className="btn btn-secondary" onClick={()=>navigate(-1)}>بازگشت</button>;
}
