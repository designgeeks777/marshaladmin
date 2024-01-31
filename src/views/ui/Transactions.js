import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { useContext, useEffect, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../LoaderContext";
import {} from "../../constants";

const tableColumns = [
  { path: "transactionid", name: "Transaction Id" },
  { path: "dateoftransaction", name: "Date of Transaction" },
  { path: "amount", name: "Amount" },
  { path: "status", name: "Status" },
  { path: "action", name: "Initiate Refund?" },
];
const Transactions = () => {
  const url = `${BASEURL}transactions/`;
  const [tableData, setTableData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      data = response.data;
      data.forEach((object) => {
        object["action"] = "Initiate Refund?";
      });
      setTableData(data.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  //initiate refund
  const handleCallback = (selectedTransaction) => {
    setIsLoading(true);
    console.log("selectedTransaction", selectedTransaction);
    // initiate refund
    // axios
    //   .patch(url + childData._id)
    //   .then((res) => {
    //     // setIsLoading(false);
    //     loadData();
    //     setShowAlert({
    //       ...showAlert,
    //       isOpen: true,
    //       type: "success",
    //       message: `Prayer ${successMsgs.deleted}`,
    //     });

    //     setTimeout(() => {
    //       setShowAlert({ isOpen: false, type: "", message: "" });
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setShowAlert({
    //       ...showAlert,
    //       isOpen: true,
    //       type: "danger",
    //       message: errorMsgs.deleted,
    //     });
    //     setTimeout(() => {
    //       setShowAlert({ isOpen: false, type: "", message: "" });
    //     }, 2000);
    //     console.error(error);
    //   });
  };

  return (
    <ProjectTables
      title="Transaction History"
      tableData={tableData}
      tableColumns={tableColumns}
      parentCallback={handleCallback}
    />
  );
};

export default Transactions;
