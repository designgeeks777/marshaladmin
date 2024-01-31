import { useRoutes, useLocation } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "./services/AuthService";
import Loader from "./layouts/loader/Loader";

const App = () => {
  const { user, isLoading, isAuthenticating } = useContext(
    AuthenticationContext
  );
  const location = useLocation(); // Use the useLocation hook
  const routes = ThemeRoutes(user, isAuthenticating);
  const routing = useRoutes(routes);
  <div className="dark">{routing}</div>;
  return (isLoading === undefined || isLoading === true) && // Split second login screen appear issue fix while refresh
    location.pathname !== "/" &&
    location.pathname !== "/login" ? (
    <Loader />
  ) : (
    <div className="dark">{routing}</div>
  );
};

export default App;
