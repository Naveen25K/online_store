import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Cards from "../Cards";

const Login = () => {
  const [value, setValue] = useState(``);
  const singnInGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem(`email`));
  });

  // console.log(value);

  return (
    <>
      <h1 style={{ marginTop: "100px" }}>Login With Email</h1>
      {value ? (
        <Cards />
      ) : (
        <button variant="contained" onClick={singnInGoogle}>
          Sign In With Google
        </button>
      )}
    </>
  );
};

export default Login;
