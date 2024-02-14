import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../APIKey";
import { AuthenticationContext } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Books from "./ui/Books";

const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const ordersUrl = `${BASEURL}orders/`;
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordesResponse = await axios.get(ordersUrl);
        if (ordesResponse.data.length > 0) {
          setOrders(ordesResponse.data.length);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [ordersUrl]);

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Orders"
            s
            count={orders}
            // routeName="/orders"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Earned"
            currency="Rs. "
            count={orders}
            // routeName="/"
          />
        </Col>
      </Row>

      <Books hideAddBtn={true} />
    </div>
  );
};

export default Dashboard;
