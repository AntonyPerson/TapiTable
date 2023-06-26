/* eslint-disable no-self-assign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// TODO check mult-files
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import Dropzone from "react-dropzone-uploader";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import {
  // Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  FormText,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ToastContainer, toast, Icons } from "react-toastify";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { DropzoneAreaBase } from "material-ui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

export default function CalenderTasksForm() {
  const currentDate = new Date();
  console.log(currentDate);
  let dateString = "";
  let minDateString = "";
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  } else {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  }
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() + 1 >= 10) {
      minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
        currentDate.getDate() + 1
      }`;
    } else {
      minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-0${
        currentDate.getDate() + 1
      }`;
    }
  } else {
    if (currentDate.getDate() + 1 >= 10) {
      minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${
        currentDate.getDate() + 1
      }`;
    } else {
      minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-0${
        currentDate.getDate() + 1
      }`;
    }
  }
  const [data, setData] = useState({
    metting_id: "",

    personalnumber: user !== undefined ? user.personalnumber : "",
    fullName: "",
    mail: "",
    phoneNumber: "",

    unit: "",
    anaf: "",
    mador: "",

    dateOfmetteng: "",

    addionalInfo: "",

    aprroved: false,
    grade: 0,
    adminReview: "",

    errortype: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const inputRef = React.useRef(null);

  const textPlaceHolderInputs = [
    "מספר אישי",
    "שם מלא",
    "מייל",
    "נייד",
    "יחידה",
    "ענף",
    "מדור",
    "תאריך הפגישה",
    "הערות",
  ];

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (data.unit === "") {
      flag = false;
      ErrorReason.push("יחידה לא צויין");
      // toast.error(ErrorReason);
    }
    if (data.anaf === "") {
      flag = false;
      ErrorReason.push("ענף לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.mador === "") {
      flag = false;
      ErrorReason.push("מדור לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.phoneNumber === "") {
      flag = false;
      ErrorReason.push("נייד לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.fullName === "") {
      flag = false;
      ErrorReason.push("שם מלא לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.mail === "") {
      flag = false;
      ErrorReason.push("מייל לא צויין ");
      // toast.error(ErrorReason);
    }

    if (data.dateOfmetteng === "") {
      flag = false;
      ErrorReason.push("תאריך הפגישה לא צויין ");
      // toast.error(ErrorReason);
    }
    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    axios
      .post(`http://localhost:5000/hozlaRequests/add`, data)
      .then((response) => {
        setData({
          ...data,
          metting_id: response.data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setData({
          ...data,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      // return <Navigate to="/userRequestsTable" />;?\
      window.location.href = window.location.href;
    }
  };

  const showSuccess = () => (
    <Dialog
      open={data.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          הפגישה נקבע בהצלחה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא: {data.metting_id}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            שימו לב שעליכם לבדוק שהפגשיה אחר אושרה על ידי צוות תפ"י, אישור יכול לקחת עד שלושה ימי
            עבודה.
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={data.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בשליחת הבקשה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={data.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            שליחת הטופס תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const handleClickOpen = (evt) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleAdd = () => {
    setFiles([...files]);
  };
  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  const calenderTasksForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס קביעת פגישה
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="personalNumber">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="personalNumber"
                      type="text"
                      value={data.personalnumber}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="fullName">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="fullName"
                      type="text"
                      value={data.fullName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="mail">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="mail"
                      type="email"
                      value={data.mail}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phoneNumber">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[3]}
                      name="phoneNumber"
                      type="text"
                      value={data.phoneNumber}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="unit">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="unit"
                      name="unit"
                      type="text"
                      value={data.unit}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="anaf">{textPlaceHolderInputs[5]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="anaf"
                      type="text"
                      value={data.anaf}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mador">{textPlaceHolderInputs[6]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[2]}
                      name="mador"
                      type="text"
                      value={data.mador}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="meetingDate">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="meetingDate"
                      type="date"
                      value={data.dateOfmetteng}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="addionalInfo">{textPlaceHolderInputs[8]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="addionalInfo"
                      type="textarea"
                      value={data.addionalInfo}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormGroup>

                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    שלח בקשה
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* //! fot the pop up warning windoes */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {showError()}
        {showSuccess()}
        {showLoading()}
        {NavigateUser()}

        {calenderTasksForm()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
