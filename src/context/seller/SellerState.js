import React, { useState } from "react";
import SellerContext from "./SellerContext";

const SellerState = (props) => {
  const [seller, setSeller] = useState({});

  const port = 'http://localHost:5000'

  const fetchSellerDetails = async () => {
    const response = await fetch(`${port}/api/auth/fetchsellerdetails`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('seller', JSON.stringify(json.user))
      console.log(json);
    }
  }

  const deleteSeller = async () => {
    const response = await fetch(`${port}/api/auth/deleteseller`, {
      method: 'GET',
      headers: {
        "Content-type": 'application/json',
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    const json = await response.json();
    if (json.success) {
      console.log(json);
    }
  }
  return (
    <SellerContext.Provider value={{ deleteSeller, fetchSellerDetails }}>
      {props.children}
    </SellerContext.Provider>
  )
}

export default SellerState 