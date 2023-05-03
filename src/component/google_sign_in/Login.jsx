import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Cards from "../Cards";

const Login = () => {
  const [value, setValue] = useState(``);
  const [userData, setUserData] = useState([]);
  const singnInGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      setUserData(data.user);
      localStorage.setItem("email", data.user.email);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem(`email`));
  });

  return (
    <>
      {value ? (
        <Cards userData={userData} />
      ) : (
        <div>
          <h1 style={{ marginTop: "100px" }}>Login With Email</h1>
          <button variant="contained" onClick={singnInGoogle}>
            Sign In With Google
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
