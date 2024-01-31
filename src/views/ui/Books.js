import { Button, FormGroup, Input, Label } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import ComponentModal from "../../components/ComponentModal";
import { useContext, useEffect, useRef, useState } from "react";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import Alerts from "./Alerts";
import { LoaderContext } from "../../LoaderContext";
import { errorMsgs, successMsgs } from "../../constants";
import React from "react";

const tableColumns = [
  { path: "coverPic", name: "Cover Image" },
  { path: "bookname", name: "Book Name" },
  { path: "price", name: "Price" },
  { path: "bookpdf", name: "PDF" },
];

const Books = ({ hideAddBtn }) => {
  const url = `${BASEURL}books/`;
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [newBook, setNewBook] = useState({
    price: "",
    bookname: "",
    coverPic: "",
    bookpdf: "",
  });
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

  const toggle = () => {
    setShow(!show);
    setNewBook({ price: "", bookname: "", coverPic: "", bookpdf: "" });
  };

  const resetModalData = () => {
    setNewBook({ price: "", bookname: "", coverPic: "", bookpdf: "" });
  };

  //add new book
  const onAddNewBook = async () => {
    setIsLoading(true);
    setShow(false);
    const imageData = new FormData();
    imageData.append("bookname", newBook.bookname);
    imageData.append("price", newBook.price);
    imageData.append("coverPic", newBook.coverPic);
    imageData.append("bookpdf", newBook.bookpdf);
    await axios
      .post(`${BASEURL}books`, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          loadData();
          resetModalData();
          setShowAlert({
            ...showAlert,
            isOpen: true,
            type: "success",
            message: `Book ${successMsgs.add}`,
          });

          setTimeout(() => {
            setShowAlert({ isOpen: false, type: "", message: "" });
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        resetModalData();
        setShowAlert({
          ...showAlert,
          isOpen: true,
          type: "danger",
          message: errorMsgs.add,
        });
        setTimeout(() => {
          setShowAlert({ isOpen: false, type: "", message: "" });
        }, 2000);
        console.error("POST Error:", error);
      });
  };

  const handlePriceChange = (event) => {
    setNewBook({ ...newBook, price: event.target.value });
  };

  const handleNameChange = (event) => {
    setNewBook({ ...newBook, bookname: event.target.value });
  };

  //pdf
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setNewBook({
      ...newBook,
      bookpdf: file,
    });
  };
  const handlePdfButtonClick = () => {
    // Trigger the click event of the hidden file input
    if (imgFileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (newBook.bookpdf !== "") {
      setNewBook({
        ...newBook,
        bookpdf: selectedFile,
      });
    }
  }, [newBook.bookpdf]);

  //images
  const imgFileInputRef = useRef(null);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    if (imgFileInputRef.current) {
      imgFileInputRef.current.click();
    }
  };

  const handleFileImgChange = (e) => {
    const file = e.target.files[0];
    setSelectedImgFile(file);
    setNewBook({
      ...newBook,
      coverPic: file,
    });
  };
  useEffect(() => {
    if (newBook.coverPic !== "") {
      setNewBook({
        ...newBook,
        coverPic: selectedImgFile,
      });
    }
  }, [newBook.coverPic]);

  return (
    <div>
      <div className="d-flex flex-column mb-3">
        {showAlert.isOpen && (
          <Alerts
            props={{
              isOpen: showAlert.isOpen,
              type: showAlert.type,
              message: showAlert.message,
            }}
          />
        )}
        <div className="p-2 align-self-end">
          {!hideAddBtn ? (
            <Button
              className="btn buttons"
              color="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Add New Book
            </Button>
          ) : null}
          {show ? (
            <ComponentModal
              show={show}
              toggle={toggle}
              title="Add Book"
              submitButtonTitle="Add"
              cancelButtonTitle="Cancel"
              submitButtonClick={() => onAddNewBook()}
              cancelButtonClick={toggle}
              disabled={
                newBook.bookname === "" ||
                newBook.price === "" ||
                newBook.coverPic === "" ||
                newBook.pdf === ""
              }
            >
              <FormGroup>
                <Label
                  for="bookname"
                  size="md"
                  className="form-label modal-body-label"
                >
                  Book Name
                </Label>
                <Input
                  type="text"
                  className="form-control modal-body-input shadow-none"
                  id="bookname"
                  name="bookname"
                  placeholder=""
                  onChange={handleNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  for="coverImage"
                  size="md"
                  className="form-label modal-body-label"
                >
                  Cover Image
                </Label>
                <div
                  className="d-flex custom-file-input-container modal-body-input 
                shadow-none justify-content-between align-items-center py-0"
                >
                  <Label
                    for="coverImage"
                    className="custom-file-input-label py-0 mb-0"
                  >
                    {newBook.coverPic
                      ? newBook.coverPic.name
                      : "Choose image to upload"}
                    <Input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileImgChange}
                      ref={imgFileInputRef}
                    />
                  </Label>
                  <Button className="booksModalbtn" onClick={handleButtonClick}>
                    Browse File
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <Label
                  for="pdf"
                  size="md"
                  className="form-label modal-body-label"
                >
                  PDF
                </Label>
                <div
                  className="d-flex custom-file-input-container modal-body-input 
                shadow-none justify-content-between align-items-center py-0"
                >
                  <Label className="custom-file-input-label modal-body-input py-0 mb-0">
                    {newBook.bookpdf
                      ? newBook.bookpdf.name
                      : "Choose book pdf to upload"}
                    <Input
                      id="pdf"
                      name="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </Label>
                  <Button
                    className="booksModalbtn"
                    onClick={handlePdfButtonClick}
                  >
                    Browse File
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <Label
                  for="price"
                  size="md"
                  className="form-label modal-body-label"
                >
                  Price
                </Label>
                <div
                  className="d-flex form-control modal-body-input 
                shadow-none justify-content-between align-items-center p-0"
                >
                  <Label className="custom-file-input-label modalBookPrice modal-body-input mb-0">
                    Rs
                  </Label>
                  <Input
                    type="number"
                    className="border-0 mx-1 shadow-none"
                    id="price"
                    name="price"
                    placeholder=""
                    onChange={handlePriceChange}
                  />
                </div>
              </FormGroup>
            </ComponentModal>
          ) : null}
        </div>
        <ProjectTables
          title="Books"
          tableData={tableData}
          tableColumns={tableColumns}
        />
      </div>
    </div>
  );
};

export default Books;
