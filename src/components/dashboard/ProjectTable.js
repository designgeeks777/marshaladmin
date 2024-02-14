import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../../LoaderContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ComponentModal from "../ComponentModal";
import NestedTable from "../NestedTable";

const ProjectTables = ({
  children,
  parentCallback,
  tableData,
  tableColumns,
  title,
}) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const navigate = useNavigate();

  // get table heading book
  const thData = (path, name) => {
    return (
      <th key={path} className="nowrap">
        {capitalize(name)}
      </th>
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = (filePath) => {
    setSelectedFile(filePath);
    setIsModalOpen(true);
  };
  const confirmDownload = () => {
    const url = selectedFile;
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").pop();
    axios
      .get(selectedFile, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        const blobUrl = URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  const [selectedId, setSelectedId] = useState(null);
  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

  // get table row book
  const tdData = () => {
    let paginatedTableData = tableData.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
    return paginatedTableData.map((book, index) => {
      return (
        <tr key={index} className="border-top">
          {tableColumns.map(({ path }) => {
            return (
              <td className="py-3" key={path}>
                {path === "coverPic" ? (
                  <div className="ms-3 d-flex align-items-center py-2">
                    {book[path].length !== 0 && (
                      <div className="bookImgContainer">
                        <img alt={`Book ${book._id}`} src={book[path]} />
                      </div>
                    )}
                  </div>
                ) : path === "price" ? (
                  <div>Rs {book[path]}</div>
                ) : path === "bookpdf" || path === "paymentscreenshot" ? (
                  <>
                    <div className="d-flex align-items-center text-primary">
                      <i className="bi bi-filetype-pdf fs-2 text-danger"></i>
                      <p
                        className="text-decoration-underline mb-0 ps-1"
                        onClick={() => {
                          handleDownload(book[path]);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Download
                        <i className="bi bi-download ps-1"></i>
                      </p>
                    </div>
                    {isModalOpen ? (
                      <ComponentModal
                        show={isModalOpen}
                        toggle={closeModal}
                        title=""
                        submitButtonTitle="Yes"
                        submitButtonClick={confirmDownload}
                        cancelButtonTitle="No"
                        cancelButtonClick={closeModal}
                      >
                        <h5 className="text-center">
                          Are you sure you want to download?
                        </h5>
                      </ComponentModal>
                    ) : null}
                  </>
                ) : path === "books" ? (
                  <span className="ps-4">
                    {book[path].length === 0 ? null : (
                      <i
                        className={`bi ${
                          selectedId === index
                            ? "bi-chevron-down"
                            : "bi-chevron-right"
                        } text-primary`}
                        style={{ paddingRight: 6, cursor: "pointer" }}
                        onClick={() => {
                          onSelectItem(index);
                        }}
                      />
                    )}
                    {book[path].length}
                    {selectedId === index ? (
                      <NestedTable tableData={book[path]} />
                    ) : null}
                  </span>
                ) : (
                  <>
                    {typeof book[path] === "string"
                      ? capitalize(book[path])
                      : book[path]}
                  </>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <>
            {isLoading ? (
              <div style={{ height: 250 }}>
                <Spinner color="primary" className="table-spinner" />
              </div>
            ) : tableData.length === 0 ? (
              <div style={{ height: 250 }}>No {title}</div>
            ) : (
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    {tableColumns.map(({ path, name }) =>
                      path === "action" ? null : thData(path, name)
                    )}
                  </tr>
                </thead>
                <tbody>{tdData()}</tbody>
              </Table>
            )}
            {tableData.length !== 0 && (
              <Pagination className="d-flex justify-content-end">
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    onClick={(e) => handleClick(e, currentPage - 1)}
                    previous
                    href="#"
                  />
                </PaginationItem>

                {[...Array(pagesCount)].map((page, i) => (
                  <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                  <PaginationLink
                    onClick={(e) => handleClick(e, currentPage + 1)}
                    next
                    href="#"
                  />
                </PaginationItem>
              </Pagination>
            )}
          </>
        </CardBody>
      </Card>
    </>
  );
};

ProjectTables.propTypes = {
  tableData: PropTypes.any,
};

export default ProjectTables;
