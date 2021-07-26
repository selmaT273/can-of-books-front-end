import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// this code is from the auth0 quick start guide
const LoginButton = () => {
  const loginWithRedirect = useAuth0().loginWithRedirect;

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;