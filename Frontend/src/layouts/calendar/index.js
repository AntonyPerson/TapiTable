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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
// import { multipleFilesUpload } from "../../data/api";
import Grid from "@mui/material/Grid";
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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

export default function HozlaPrintRequestForm() {
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    work_id: "",
    unit: "",
    anaf: "",
    mador: "",
    phoneNumber: "",

    workName: "",
    workClearance: "1",
    bindingType: "0",
    bindingTypeOther: "",
    copyType: "b&w2",
    numOfCopyies: 1,

    fullNameAsker: "",
    fullNameTakein: "",
    workGivenDate: dateString,

    fullNameReciver: "",
    workRecivedDate: minDateString,

    personalnumber: user.personalnumber,
    id_files: "",
    // role: "",

    files_id: "",

    pageType: "A4",

    ordernum: "",
    clientNote: "",

    errortype: "",
    // propPrint: {
    //   nameFile: "",
    //   props: {
    //     propPageType: "A4",
    //     propCopyType: "b&w2",
    //   },
    // },
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [propPrint, setPropPrint] = useState([]); // {
  // nameFile: ``,
  // props: {
  // propPageType: "A4",
  // propCopyType: "b&w2",
  // },
  // },
  // const [textArea, setTextArea] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const inputRef = React.useRef(null);

  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מזמין העבודה",
    "תאריך הזמנת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך נדרש לקבלת העבודה",
    "שם אוסף העבודה",
  ];
  useEffect(() => {
    // Update the document title using the browser API
    console.log(`You upload ${files.length} files`);
  });

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
    if (data.workName === "") {
      flag = false;
      ErrorReason.push("שם העבודה לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.bindingType === "3") {
      if (data.bindingTypeOther === "") {
        flag = false;
        ErrorReason.push("השיטת הכריכה לא צויינה ");
        // toast.error(ErrorReason);
      }
    }

    if (data.numOfCopyies === "") {
      flag = false;
      ErrorReason.push("כמות העותקים לא צויינה ");
      // toast.error(ErrorReason);
    }
    if (data.fullNameAsker === "") {
      flag = false;
      ErrorReason.push("לא צויין שם מוסר העבודה");
      // toast.error(ErrorReason);
    }
    if (data.workGivenDate === "") {
      flag = false;
      ErrorReason.push("לא צויין תאריך מסירת העבודה");
      // toast.error(ErrorReason);
    }
    propPrint.forEach((prop) => {
      if (prop.propCopyType === "---" || prop.propPageType === "---") {
        flag = false;
        ErrorReason.push("פרטי הדפסה חסרים");
      }
    });
    if (Date.parse(data.workRecivedDate) < dateString) {
      flag = false;
      ErrorReason.push("תאריך קבלת העבודה לא תיקני");
      // toast.error(ErrorReason);
    }
    if (data.workRecivedDate === "") {
      flag = false;
      ErrorReason.push("לא צויין תאריך נדרש לקבלת העבודה ");
      // toast.error(ErrorReason);
    }
    if (files.length === 0) {
      flag = false;
      ErrorReason.push("קובץ לא הועלה");
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
    // CreateAssessmentData();
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    console.log(`files: ${files}`);
    //* Sending only the files to the DB
    //! the separating code lines from singlefile to multifiles
    const formFilesData = new FormData();
    Object.keys(files).forEach((key) => {
      formFilesData.append("files", files[key]);
    });
    // for (const key of Object.keys(files)) {
    //   formFilesData.append("files", files[key]);
    // }
    axios.post("http://localhost:5000/api/multipleFiles", formFilesData, {}).then((res) => {
      console.log("from the file axios");
      console.log(res.data);
      const requestData = {
        typeRequest: "HozlaRequest",
        unit: data.unit,
        anaf: data.anaf,
        mador: data.mador,

        workName: data.workName,
        workClearance: data.workClearance,
        bindingType: data.bindingType,
        bindingTypeOther: data.bindingTypeOther,
        // copyType: data.copyType,
        numOfCopyies: data.numOfCopyies,

        phoneNumber: data.phoneNumber,
        fullNameAsker: data.fullNameAsker,
        workGivenDate: data.workGivenDate,

        fullNameReciver: data.fullNameReciver,
        fullNameTakein: data.fullNameTakein,
        workRecivedDate: data.workRecivedDate,

        personalnumber: data.personalnumber,
        // role: data.role,

        // files: data.files,
        files_id: res.data,
        propPrints: JSON.stringify(propPrint),
        // pageType: data.pageType,
        ordernum: data.ordernum,
        clientNote: data.clientNote,
      };
      console.log(requestData);
      axios
        .post(`http://localhost:5000/hozlaRequests/add`, requestData)
        .then((response) => {
          setData({
            ...data,
            work_id: res.data,
            loading: false,
            error: false,
            successmsg: true,
            NavigateToReferrer: false,
          });
          // toast.success(`הטופס נשלח בהצלחה`);
          // history.push(`/signin`);
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
      return <Navigate to="/userRequestsTable" />;
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
          הבקשה נשלחה להוצל"א
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא: {/* {data.work_id} */} {parseInt(data.work_id.slice(-4), 36)}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <Link style={{ color: "white" }} to="/userRequestsTable">
              למעקב אחר סטטוס העבודה לחץ כאן
            </Link>
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

  const hozlaPrintRequestForm = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                לוח רישומים
              </MDTypography>
            </MDBox>

            <MDBox pt={3} px={30} py={5}>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                locale="he"
                themeSystem="bootstrap5"
                timeZone="local"
                initialView="dayGridMonth"
                events={[
                  { title: "event 1", date: "2023-04-01" },
                  { title: "event 2", date: "2023-04-02" },
                ]}
                selectable="true"
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );

  return <>{hozlaPrintRequestForm()}</>;
}
