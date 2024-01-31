import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthService";

const FullLayout = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {user && (
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {user && <Header />}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
