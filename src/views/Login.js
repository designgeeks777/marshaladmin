import { Button, Card, CardTitle } from "reactstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthService";
import React from "react";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthenticationContext);

  return (
    <div className="logincontainer vh-100 bg-white">
      <div className="section">
        <img
          alt="loginLeft"
          src={require("../assets/images/loginLeft.png")}
          width={361}
          height={275}
          // className=""
          className="img-fluid1 mx-auto align-self-start"
        />
      </div>

      <div className="section">
        <Card className="loginCard d-flex align-items-center justify-content-center">
          <CardTitle tag="h4" className="text-white text-center mb-4">
            Hope you are doing well! <br />
            Kindly login to access your dashboard
          </CardTitle>
          <Button className="fw-bold loginButton" onClick={signInWithGoogle}>
            <img
              alt="logo"
              src={require("../assets/images/logos/googleIcon.png")}
              width={40}
              height={40}
              className="mr-2"
            />
            Sign In with Google
          </Button>
        </Card>
      </div>

      <div className="section">
        <img
          alt="loginRight"
          src={require("../assets/images/loginRight.png")}
          width={361}
          height={441}
          className="img-fluid2 mx-auto align-self-end"
        />
      </div>
    </div>
  );
};
export default Login;
