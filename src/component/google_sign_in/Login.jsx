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
        <div className="container">
          <div className="login_bg">
            <h1>Welcome To Store</h1>

            <Button
              sx={{ marginTop: 3 }}
              variant="contained"
              onClick={singnInGoogle}
            >
              Sign In With Google
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
