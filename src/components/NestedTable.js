import { Table } from "reactstrap";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const NestedTable = ({ children, id, tableData }) => {
  var filteredTableColumns = [];

  const tableColumnsCount = useRef(0);

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const camelToFlat = (c) => {
    c = c.replace(/[A-Z]/g, " $&");
    c = c[0].toUpperCase() + c.slice(1);
    return c;
  };

  // get table tableColumns
  const tableColumns = Object.keys(tableData[0]);
  filteredTableColumns = tableColumns.filter((key) => key !== "uid");

  useEffect(() => {
    tableColumnsCount.current = filteredTableColumns.length;
  }, [filteredTableColumns.length]);

  // get table heading data
  const thData = () => {
    return filteredTableColumns.map((data) => {
      return (
        <th key={data} className="text-primary nowrap">
          {camelToFlat(data)}
        </th>
      );
    });
  };

  // get table row data
  const tdData = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index} className={`rowSpan=${tableColumnsCount}`}>
          {filteredTableColumns.map((item) => {
            return (
              <td key={item}>
                {item === "bookname" ? (
                  capitalize(data[item])
                ) : (
                  <>{data[item]}</>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <Table
      className={`no-wrap my-0 align-middle custom-table`}
      responsive
      borderless
    >
      <thead>
        <tr>{thData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </Table>
  );
};

NestedTable.propTypes = {
  // tableData: PropTypes.any,
};

export default NestedTable;
