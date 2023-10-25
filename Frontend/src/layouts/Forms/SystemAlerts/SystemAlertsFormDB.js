/* eslint-disable no-self-assign */
/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import { Dialog, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from "axios";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import listOfVisit from "constValue/listOfVisit";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FileDownload from "js-file-download";
import react, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Icons, ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import Error404 from "views/Error404";

import { authenticate, isAuthenticated, signin } from "auth/index";
import MDInput from "components/MDInput";

const { user } = isAuthenticated();
const SystemAlertsFromDB = (props) => {
  const params = useParams();

  const [formData, setFormData] = useState({});
  const [errorDB, setErrorDB] = useState(false);
  const [error404, setError404] = useState(false);
  const [dates, setdates] = useState({});
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TapiTableApi/SystemAlerts/${props.alertID}`)
      .then((response) => {
        // console.log(`the object data`);

        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          setError404(true);
        } else {
          setErrorDB(true);
        }
      });
  }, []);

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (formData.alertType === "") {
      flag = false;
      ErrorReason.push("נא לבחור סוג הודעה");
      // toast.error(ErrorReason);
    }
    // if (data.visited === "") {
    //   flag = false;
    //   ErrorReason.push("המבוקר לא צויין");
    //   // toast.error(ErrorReason);
    // }
    if (formData.title === "") {
      flag = false;
      ErrorReason.push("ציין את נושא ההודעה");
      // toast.error(ErrorReason);
    }
    if (formData.body === "") {
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

  const NavigateUser = () => {
    if (error404) {
      return <Navigate to="/Error404" />;
    }
    if (formData.NavigateToReferrer) {
      window.location.reload(false);
    }
  };
  function handleChange(evt) {
    const { value } = evt.target;
    setFormData({ ...formData, [evt.target.name]: value });
  }
  const handleCloseSuccsecModal = () => {
    setFormData({
      ...formData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };
  const showError = () => (
    <Dialog
      open={errorDB}
      onClose={() => setErrorDB(false)}
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
          שגיאה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const showSuccess = () => (
    <Dialog
      open={formData.successmsg}
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
          ההודעה נערכה בהצלחה
        </MDTypography>
        {/* <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          {data.fullNameReciver}
        </MDTypography> */}

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
  const updateAlertData = (event) => {
    event.preventDefault();
    const updateData = {
      title: formData.title,
      body: formData.body,
      type: formData.type,
      personalnumber: formData.personalnumber,
    };
    axios
      .post(
        `http://localhost:5000/TapiTableApi/SystemAlerts/update/updateAlertByID/${props.alertID}`,
        updateData
      )
      .then((response) => {
        setFormData({
          ...formData,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setFormData({
          ...formData,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      updateAlertData(event);
    }
  };
  const formTamplate = () => (
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
                  עדכון הודעה
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
                      value={formData.personalnumber}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="type">סוג ההודעה</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="type"
                      name="type"
                      type="select"
                      value={formData.type}
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
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <Label for="body">תוכן ההודעה</Label>
                  <MDInput
                    label=" "
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    required
                  />

                  <div className="text-center">
                    <MDButton
                      sx={{ mt: 3 }}
                      color="success"
                      size="large"
                      // onClick={clickSubmit}
                      className="btn-new-blue"
                      type="submit"
                    >
                      עדכן
                      <Icon fontSize="small">done_icon</Icon>&nbsp;
                    </MDButton>
                    <MDButton
                      sx={{ mt: 3, ml: 2 }}
                      color="error"
                      size="large"
                      // onClick={clickSubmit}
                      className="btn-new-blue"
                      type="outlined"
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:5000/TapiTableApi/SystemAlerts/remove/${props.alertID}`
                          )
                          .then((response) => {
                            window.location.reload(false);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      מחק
                      <Icon fontSize="small">clear</Icon>&nbsp;
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
    <Card
      sx={{
        position: "relative",
        mt: -8,
        mx: 3,
        py: 2,
        px: 2,
      }}
    >
      <MDBox
        height="100%"
        mt={0.5}
        lineHeight={1}
        sx={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
          display: "flex",
        }}
      >
        {showError()}
        {showSuccess()}
        {NavigateUser()}
        {formTamplate()}
      </MDBox>
    </Card>
  );
};

export default SystemAlertsFromDB;
