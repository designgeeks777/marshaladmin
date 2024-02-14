import ProjectTables from "../../components/dashboard/ProjectTable";
import { useContext, useEffect, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import { LoaderContext } from "../../LoaderContext";
import {} from "../../constants";

const tableColumns = [
  { path: "orderid", name: "Order Id" },
  { path: "dateoforder", name: "Order Date" },
  { path: "amount", name: "Amount" },
  { path: "orderedby", name: "Ordered By" },
  { path: "books", name: "Quantity" },
  { path: "paymentscreenshot", name: "Payment Screenshot" },
];
const Orders = () => {
  const url = `${BASEURL}orders/`;
  const [tableData, setTableData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      data = response.data;
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

  return (
    <ProjectTables
      title="Orders"
      tableData={tableData}
      tableColumns={tableColumns}
    />
  );
};

export default Orders;
