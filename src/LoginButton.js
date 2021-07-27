import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

// this code is from the auth0 quick start guide
class LoginButton extends React.Component {
  render(){
    const { loginWithRedirect } = this.props.auth0;
    return(
      <button onClick={() => loginWithRedirect()}>Log In</button>
    )
  }
}

export default withAuth0(LoginButton);