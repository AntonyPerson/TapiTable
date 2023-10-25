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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import NativeSelect from "@mui/material/NativeSelect";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Dropzone from "react-dropzone-uploader";
import Popup from "reactjs-popup";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Upload } from "antd-upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link, Navigate } from "react-router-dom";
// import { multipleFilesUpload } from "../../data/api";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useDropzone } from "react-dropzone";
import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  // Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

// Material Dashboard 2 React Components
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
} from "@mui/material";
import MDAlert from "components/MDAlert";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { DropzoneArea } from "react-mui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";
// user and auth import
import { TextArea } from "@progress/kendo-react-inputs";
import { authenticate, isAuthenticated, signin } from "auth/index";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

export default function SystemAlertsForm() {
  const [data, setData] = useState({
    personalnumber: user !== undefined ? user.personalnumber : "",
    alertType: "",
    title: "",
    body: "",

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

    if (data.alertType === "") {
      flag = false;
      ErrorReason.push("נא לבחור סוג הודעה");
      // toast.error(ErrorReason);
    }
    // if (data.visited === "") {
    //   flag = false;
    //   ErrorReason.push("המבוקר לא צויין");
    //   // toast.error(ErrorReason);
    // }
    if (data.title === "") {
      flag = false;
      ErrorReason.push("ציין את נושא ההודעה");
      // toast.error(ErrorReason);
    }
    if (data.body === "") {
      flag = false;
      ErrorReason.push("ציין את תוכן ההודעה");
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
    const dataForm = {
      title: data.title,
      body: data.body,
      type: data.alertType,
      personalnumber: data.personalnumber,
    };
    console.log(dataForm);
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    axios
      .post(`http://localhost:5000/TapiTableApi/SystemAlerts/add`, dataForm)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // console.log(response.data);
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
          ההודעה נוספה בהצלחה
        </MDTypography>
        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <MDButton variant="outlined" onClick={handleCloseSuccsecModal}>
              סגור
            </MDButton>
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
          שגיאה בהוספת ההודעה
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
            אנא המתן...
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

  const systemAlertsForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="12" md="12">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={7}
                mt={-3}
                p={3}
                mb={4}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  יצירת הודעה חדשה
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="personalnumber">מספר אישי</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="personalnumber"
                      type="text"
                      value={data.personalnumber}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="alertType">סוג ההודעה</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="alertType"
                      name="alertType"
                      type="select"
                      value={data.alertType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">בחר</option>
                      <option value="00">הודעה כללית</option>
                      <option value="11">הודעה למבקרים</option>
                      <option value="12">הודעה למנהלים - רגילים</option>
                      <option value="22">הודעה למנהלי המערכת</option>
                      <option value="99">הודעת תקלה - כללית</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="title">נושא ההודעה</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="title"
                      type="text"
                      value={data.title}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <Label for="body">תוכן ההודעה</Label>
                  <MDInput
                    label=" "
                    name="body"
                    value={data.body}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    required
                  />

                  <div className="text-center">
                    <MDButton
                      sx={{ mt: 3 }}
                      color="mekatnar"
                      size="large"
                      // onClick={clickSubmit}
                      className="btn-new-blue"
                      type="submit"
                    >
                      צור הודעה
                      <Icon fontSize="small">upload</Icon>&nbsp;
                    </MDButton>
                  </div>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {systemAlertsForm()}
    </>
  );
}
