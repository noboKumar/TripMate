import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const GoogleSignIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      onClick={handleSignIn}
      className="btn btn-outline rounded-xl w-full flex items-center justify-center gap-2"
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignIn;
