import { Col, Row } from "reactstrap";
import TopCards from "../components/dashboard/TopCards";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../APIKey";
import { AuthenticationContext } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Books from "./ui/Books";

const Dashboard = () => {
  const [downloads, setDownloads] = useState(0);
  const booksUrl = `${BASEURL}books/`;
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
        const booksResponse = await axios.get(booksUrl);
        if (booksResponse.data.length > 0) {
          let bookData = booksResponse.data;
          // Calculate the sum of all age values
          const totalCount = bookData.reduce(
            (accumulator, record) => accumulator + record.downloadCount,
            0
          );
          setDownloads(totalCount);
        } else {
          setDownloads(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [booksUrl]);

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Downloads"
            s
            count={downloads}
            // routeName="/"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Earned"
            currency="Rs. "
            count={downloads}
            // routeName="/"
          />
        </Col>
      </Row>

      <Books hideAddBtn={true} />
    </div>
  );
};

export default Dashboard;
