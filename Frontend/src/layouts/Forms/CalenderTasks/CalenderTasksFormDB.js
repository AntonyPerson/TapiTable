/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
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
import { Autocomplete, Dialog, DialogContent, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axios from "axios";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
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

import GoodEval from "assets/images/GoodEval.svg";
import HighEval from "assets/images/HighEval.svg";
import LowEval from "assets/images/LowEval.svg";
import MidEval from "assets/images/MidEval.svg";

const { user } = isAuthenticated();
const FieldReuestFormDB = () => {
  const params = useParams();

  const [formData, setFormData] = useState({});
  const [inspectorsList, setInspectorsList] = useState([{ info: "", personalnumber: "" }]);
  const [errorDB, setErrorDB] = useState(false);
  const [error404, setError404] = useState(false);
  // const [dates, setdates] = useState({});
  const [data, setData] = useState({
    personalnumber: user !== undefined ? user.personalnumber : "",

    errortype: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const textPlaceHolderInputs = [
    "מספר אישי",
    "תאריך הפגישה (מתוכנן)",
    "תאריך סיום",
    "מבצע הביקורת",
    "שם מסגרת המבקר",
    "המבוקר",
    "שם מסגרת המבוקר",
    "ממצאים",
    "שיפור",
    "שימור",
    "ציון",
    "הערכה",
  ];
  useEffect(() => {
    axios
      .post(`http://localhost:5000/TapiTableApi/getinspectors`)
      .then((response) => {
        // console.log(response.data);
        setInspectorsList(response.data);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          setError404(true);
        } else {
          setErrorDB(true);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TapiTableApi/InspectionRequest/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(response.data);
        console.log(params.formID);

        setFormData(response.data);
        // setClientNote(response.data.clientNote.split("\n"));
        // setPropPrint(JSON.parse(response.data.propPrints));
        // console.log(propPrint);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          setError404(true);
        } else {
          setErrorDB(true);
        }
      });
  }, []);

  function openFileANewWindows(filePath, fileName) {
    const urlPath = filePath;
    const newUrlPath = urlPath.slice(8);
    // console.log(`Frontend ${newUrlPath}`);
    // axios
    //   .get(`http://localhost:5000/api/downloadPDFFile/${newUrlPath}`, { responseType: "blob" })
    //   .then((res) => {
    //     FileDownload(res.data, fileName);
    //   });
  }
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (formData.personalnumber === "") {
      flag = false;
      ErrorReason.push("מספר אישי לא צויין");
    }

    if (formData.dateOfInspection === "") {
      flag = false;
      ErrorReason.push("לא צויין תאריך ביצוע ביקורת");
    }

    if (formData.improvments === "") {
      flag = false;
      ErrorReason.push("לא צויין שיפור");
      // toast.error(ErrorReason);
    }

    if (formData.keeping === "") {
      flag = false;
      ErrorReason.push("לא צויין שימור");
      // toast.error(ErrorReason);
    }

    if (formData.grade === "") {
      flag = false;
      ErrorReason.push("לא צויין ציון");
      // toast.error(ErrorReason);
    }

    if (formData.inspectorsPersonalnumber === "") {
      flag = false;
      ErrorReason.push("לא נבחר מבקר");
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
    if (data.NavigateToReferrer) {
      return <Navigate to="/Table" />;
    }
  };
  function handleChange(evt) {
    const { value } = evt.target;
    setFormData({ ...formData, [evt.target.name]: value });
  }
  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
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
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const getWorkStuts = (value) => {
    let status = "בקשה נשלחה";
    let color = "error";
    if (value === 25) {
      status = "ממתין לאישור";
      color = "error";
    } else if (value === 50) {
      status = "טרם בוצעה";
      color = "warning";
    } else if (value === 75) {
      status = "אושרה אך לא קרתה";
      color = "info";
    } else if (value === 100) {
      status = "בוצעה";
      color = "success";
    }
    return { status, color };
  };

  const inspectorsEval = () => {
    if (formData.grade >= 0 && formData.grade <= 64) {
      return LowEval;
    }
    if (formData.grade >= 65 && formData.grade <= 79) {
      return MidEval;
    }
    if (formData.grade >= 80 && formData.grade <= 89) {
      return GoodEval;
    }
    if (formData.grade >= 90 && formData.grade <= 100) {
      return HighEval;
    }
    return null;
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
          עודכן סיכום ביקורת
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

  const updateSummaryData = (event) => {
    const sTemp = 75;
    // if (user.admin === "2" && user.adminType === "2") {
    //   if (formData.status === 50) {
    //     sTemp = 75;
    //   } else if (formData.status >= 75) {
    //     sTemp = 100;
    //   }
    // }
    const updateData = {
      results: formData.results,
      improvments: formData.improvments,
      keeping: formData.keeping,
      grade: formData.grade,
      inspectorsPersonalnumber: formData.inspectorsPersonalnumber,
      dateOfInspection: formData.dateOfInspection,
      status: sTemp,
    };
    axios
      .post(
        `http://localhost:5000/TapiTableApi/InspectionRequest/updateSammary/${params.formID}`,
        updateData
      )
      .then((response) => {
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
      })
      .catch((error) => {
        // console.error(error);
        // console.error(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          setError404(true);
        } else {
          setErrorDB(true);
        }
        // console.groupEnd();
      });
    // console.groupEnd();
  };
  const handleStatusChange = (event) => {
    // console.groupCollapsed(` -------- handleStatusChange --------`);
    const newStatus = Number(event.target.value);
    console.log(newStatus);
  };

  const Progress = (color, value) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color={color} fontWeight="medium">
        {value}%
      </MDTypography>

      <MDBox ml={0.5} width="60rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      updateSummaryData(event);
    }
  };
  const formTamplate = () => (
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
                <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
                  סיכום ביקורת תפי
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color={getWorkStuts(formData.status).color}
                  mt={1}
                >
                  {getWorkStuts(formData.status).status}
                </MDTypography>
                {Progress(getWorkStuts(formData.status).color, formData.status)}
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="personalnumber">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="personalnumber"
                      type="text"
                      value={formData.personalnumber}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dateOfInspection">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="dateOfInspection"
                      type="date"
                      // step="2"
                      value={formData.dateOfInspection?.split("T")[0]}
                      onChange={handleChange}
                      required
                      disabled={!(user.admin === "2" && user.adminType === "2")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="inspectionByType">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="inspectionByType"
                      name="inspectionByType"
                      type="text"
                      value={formData.inspectionByType}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="inspectedName">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="inspectedName"
                      type="text"
                      value={formData.inspectedName}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="visited">{textPlaceHolderInputs[5]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="visited"
                      name="visited"
                      type="text"
                      value={formData.visited}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="visitedName">{textPlaceHolderInputs[6]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="visitedName"
                      type="text"
                      value={formData.visitedName}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  {formData.status >= 50 && (
                    <>
                      <FormGroup>
                        <Label style={{ color: "#F44335" }} for="inspectorsPersonalnumber">
                          פרטי המבקר
                        </Label>
                        {/* <Autocomplete
                          id="inspectorsPersonalnumber"
                          disablePortal
                          name="inspectorsPersonalnumber"
                          options={inspectorsList}
                          sx={{ width: 300 }}
                          renderInput={(p) => <TextField label={p.info} value={p.personalnumber} />}
                        /> */}
                        <Input
                          // placeholder={textPlaceHolderInputs[0]}
                          id="inspectorsPersonalnumber"
                          name="inspectorsPersonalnumber"
                          type="select"
                          value={formData.inspectorsPersonalnumber}
                          onChange={handleChange}
                          required
                          disabled={!(user.admin === "2" && user.adminType === "2")}
                        >
                          <option value="">בחר</option>
                          {inspectorsList.map((inspector) => (
                            <option value={inspector.personalnumber}>{inspector.info}</option>
                          ))}
                        </Input>
                      </FormGroup>
                      <MDTypography variant="h4" fontWeight="small" color="mekatnar">
                        תאריך ביצוע ביקורת
                      </MDTypography>
                      <FormGroup>
                        <Label for="results">{textPlaceHolderInputs[7]}</Label>
                        <Input
                          // placeholder={textPlaceHolderInputs[1]}
                          name="results"
                          type="textarea"
                          value={formData.results}
                          onChange={handleChange}
                          disabled={
                            !(
                              formData.status === 50 ||
                              (user.admin === "2" && user.adminType === "2")
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="improvments">{textPlaceHolderInputs[8]}</Label>
                        <Input
                          // placeholder={textPlaceHolderInputs[1]}
                          name="improvments"
                          type="textarea"
                          value={formData.improvments}
                          onChange={handleChange}
                          disabled={
                            !(
                              formData.status === 50 ||
                              (user.admin === "2" && user.adminType === "2")
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="keeping">{textPlaceHolderInputs[9]}</Label>
                        <Input
                          // placeholder={textPlaceHolderInputs[1]}
                          name="keeping"
                          type="textarea"
                          value={formData.keeping}
                          onChange={handleChange}
                          disabled={
                            !(
                              formData.status === 50 ||
                              (user.admin === "2" && user.adminType === "2")
                            )
                          }
                        />
                      </FormGroup>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="grade">{textPlaceHolderInputs[10]}</Label>
                            <Input
                              // placeholder={textPlaceHolderInputs[1]}
                              name="grade"
                              type="number"
                              value={formData.grade}
                              min={0}
                              max={100}
                              onChange={handleChange}
                              disabled={
                                !(
                                  formData.status === 50 ||
                                  (user.admin === "2" && user.adminType === "2")
                                )
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <img
                            src={inspectorsEval()}
                            alt="GradeImage"
                            style={{ width: 300, height: 150 }}
                          />
                        </Col>
                      </Row>

                      <MDBox
                        px={5}
                        mt={2}
                        sx={{
                          display: "inline-flex",
                          flexWrap: "wrap",
                          justifyContent: "space-evenly",
                          alignContent: "space-evenly",
                        }}
                      >
                        {user.admin === "2" && user.adminType === "2" && formData.status === 75 && (
                          <>
                            <MDButton
                              color="success"
                              size="large"
                              onClick={() => {
                                axios
                                  .post(
                                    `http://localhost:5000/TapiTableApi/InspectionRequest/statusUpdate/${formData._id}`,
                                    {
                                      status: 100,
                                    }
                                  )
                                  .then((response) => {
                                    setData({
                                      ...data,
                                      loading: false,
                                      error: false,
                                      successmsg: true,
                                      NavigateToReferrer: false,
                                    });
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              }}
                              className="btn-new-blue"
                            >
                              אישור
                              <Icon fontSize="small">done</Icon>&nbsp;
                            </MDButton>
                            <MDButton
                              color="error"
                              size="large"
                              onClick={() => {
                                axios
                                  .post(
                                    `http://localhost:5000/TapiTableApi/InspectionRequest/statusUpdate/${formData._id}`,
                                    {
                                      status: 50,
                                    }
                                  )
                                  .then((response) => {
                                    setData({
                                      ...data,
                                      loading: false,
                                      error: false,
                                      successmsg: true,
                                      NavigateToReferrer: false,
                                    });
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              }}
                              className="btn-new-blue"
                            >
                              דחייה
                              <Icon fontSize="small">clear</Icon>&nbsp;
                            </MDButton>
                          </>
                        )}
                        {(user.admin === "1" &&
                          user.adminType === "1" &&
                          formData.status === 50 &&
                          user.personalnumber === formData.inspectorsPersonalnumber) ||
                        (user.admin === "2" && user.adminType === "2") ? (
                          <MDButton
                            color="mekatnar"
                            size="large"
                            // onClick={clickSubmit}
                            className="btn-new-blue"
                            type="submit"
                          >
                            שמור
                            <Icon fontSize="small">save</Icon>&nbsp;
                          </MDButton>
                        ) : null}
                      </MDBox>
                    </>
                  )}
                </FormGroup>
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
      {NavigateUser()}
      {formTamplate()}
      <Footer />
    </DashboardLayout>
  );
};

export default FieldReuestFormDB;
