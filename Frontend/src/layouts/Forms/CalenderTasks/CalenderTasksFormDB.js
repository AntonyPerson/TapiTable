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
import react, { useEffect } from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
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
import { ToastContainer, toast, Icons } from "react-toastify";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Navigate, useParams } from "react-router-dom";
import MDProgress from "components/MDProgress";
import Error404 from "views/Error404";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import FileDownload from "js-file-download";
import Grid from "@mui/material/Grid";
import listOfVisit from "constValue/listOfVisit";

import { signin, authenticate, isAuthenticated } from "auth/index";

const { user } = isAuthenticated();
const FieldReuestFormDB = () => {
  const params = useParams();

  const [formData, setFormData] = useState({});
  const [errorDB, setErrorDB] = useState(false);
  const [error404, setError404] = useState(false);
  const [data, setData] = useState({
    metting_id: "",

    personalnumber: user !== undefined ? user.personalnumber : "",
    fullName: "",
    mail: "",
    phoneNumber: "",
    inspectionByType: "",
    inspectedName: "",
    visitedName: "",
    visited: "",

    dateOfInspection: "",
    dateEndOfmetteng: "",

    addionalInfo: "",

    results: "",
    improvments: "",
    keeping: "",

    aprroved: false,
    grade: 0,
    inspectorsPersonalnumber: "",
    adminReview: "",

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
      .get(`http://localhost:5000/TapiTableApi/InspectionRequest/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(response.data);
        console.log(params.formID);

        setFormData(response.data);
        // setdates({
        //   workGivenDate: response.data.workGivenDate.split("T")[0],
        //   workRecivedDate: response.data.workRecivedDate.split("T")[0],
        // });
        // setClientNote(response.data.clientNote.split("\n"));
        // setPropPrint(JSON.parse(response.data.propPrints));
        // console.log(propPrint);
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

    if (data.personalnumber === "") {
      flag = false;
      ErrorReason.push("מספר אישי לא צויין");
      // toast.error(ErrorReason);
    }
    // if (data.dateOfInspection === "") {
    //   flag = false;
    //   ErrorReason.push("תאריך הפגישה לא צויין ");
    //   // toast.error(ErrorReason);
    // }
    // if (data.dateEndOfmetteng === "") {
    //   flag = false;
    //   ErrorReason.push("תאריך לא צויין");
    //   // toast.error(ErrorReason);
    // }
    // if (data.inspectionByType === "") {
    //   flag = false;
    //   ErrorReason.push("מבצע הביקורת לא צויין");
    //   // toast.error(ErrorReason);
    // }
    if (data.grade === "") {
      flag = false;
      ErrorReason.push("לא צויין ציון");
      // toast.error(ErrorReason);
    }
    // if (data.visited === "") {
    //   flag = false;
    //   ErrorReason.push("המבוקר לא צויין");
    //   // toast.error(ErrorReason);
    // }
    if (data.inspectorsPersonalnumber === "") {
      flag = false;
      ErrorReason.push("הערכה לא צויינה");
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
  };
  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
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
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "נשלח להוצלא";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }

    return [stutus, color];
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
            <MDButton
              variant="outlined"
              onClick={() => {
                setData({ ...data, successmsg: false });
              }}
            >
              סגור
            </MDButton>
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const updateSummaryData = (event) => {
    const updateData = {
      results: data.results,
      improvments: data.improvments,
      keeping: data.keeping,
      grade: data.grade,
      inspectorsPersonalnumber: data.inspectorsPersonalnumber,
    };
    axios
      .post(
        `http://localhost:5000/TapiTableApi/InspectionRequest/updateSammary/${params.formID}`,
        updateData
      )
      .then((response) => {
        // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
        console.log(response.data);
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // console.log(params.formID);

        // setFormData({ ...formData, status: newStatus });
        // console.groupEnd();
      })
      .catch((error) => {
        // console.groupCollapsed(`handleStatusChange -------- Axios.error`);

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

    // axios
    //   .post(`http://localhost:5000/hozlaRequests/statusUpdate/${params.formID}`, {
    //     status: newStatus,
    //   })
    //   .then((response) => {
    //     // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
    //     // console.log(response.data);
    //     // console.log(params.formID);

    //     setFormData({ ...formData, status: newStatus });
    //     // console.groupEnd();
    //   })
    //   .catch((error) => {
    //     // console.groupCollapsed(`handleStatusChange -------- Axios.error`);

    //     // console.error(error);
    //     // console.error(error.code);
    //     if (error.code === "ERR_BAD_REQUEST") {
    //       setError404(true);
    //     } else {
    //       setErrorDB(true);
    //     }
    //     // console.groupEnd();
    //   });
    // console.groupEnd();
  };

  // const updateNameReciver = () => {
  //   const NameReciver = {
  //     fullNameReciver: data.fullNameReciver,
  //   };
  //   axios
  //     .post(`http://localhost:5000/hozlaRequests/updateNameReciver/${params.formID}`, NameReciver)
  //     .then((response) => {
  //       // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
  //       // console.log(response.data);
  //       // console.log(params.formID);
  //       setData({
  //         ...data,
  //         fullNameReciver: response.data.fullNameReciver,
  //         loading: false,
  //         error: false,
  //         successmsg: true,
  //         NavigateToReferrer: false,
  //       });

  //       setFormData({ ...formData, fullNameReciver: response.data.fullNameReciver });
  //       // setFormData({ ...formData, status: newStatus });
  //       console.groupEnd();
  //     })
  //     .catch((error) => {
  //       // console.groupCollapsed(`handleStatusChange -------- Axios.error`);

  //       console.error(error);
  //       console.error(error.code);
  //       if (error.code === "ERR_BAD_REQUEST") {
  //         setError404(true);
  //       } else {
  //         setErrorDB(true);
  //       }
  //       console.groupEnd();
  //     });
  // };
  const Progress = ({ color, value }) => (
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
    // if (CheckSignUpForm(event)) {
    updateSummaryData(event);
    // }
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
                      value={formData.dateOfInspection}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  {/* </Col>
                  <Col> */}
                  {/* <FormGroup>
                    <Label for="dateEndOfmetteng">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="dateEndOfmetteng"
                      type="datetime-local"
                      step="2"
                      value={
                        data.dateEndOfmetteng < data.dateOfInspection
                          ? data.dateOfInspection
                          : data.dateEndOfmetteng
                      }
                      onChange={handleChange}
                      // required
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="inspectionByType">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="inspectionByType"
                      name="inspectionByType"
                      type="select"
                      value={formData.inspectionByType}
                      // onChange={handleChange}
                      disabled
                    >
                      {listOfVisit.map((visitType) => (
                        <option value={visitType.value}>{visitType.visitName}</option>
                      ))}
                    </Input>
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
                      type="select"
                      value={formData.visited}
                      // onChange={handleChange}
                      disabled
                    >
                      {listOfVisit.map((visitType) => (
                        <option value={visitType.value}>{visitType.visitName}</option>
                      ))}
                    </Input>
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

                  <MDTypography variant="h4" fontWeight="small" color="mekatnar">
                    תאריך ביצוע ביקורת
                  </MDTypography>
                  <FormGroup>
                    <Label for="results">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="results"
                      type="textarea"
                      value={formData.results === "" ? data.results : formData.results}
                      onChange={handleChange}
                      // disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="improvments">{textPlaceHolderInputs[8]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="improvments"
                      type="textarea"
                      value={formData.improvments === "" ? data.improvments : formData.improvments}
                      onChange={handleChange}
                      // disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="keeping">{textPlaceHolderInputs[9]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="keeping"
                      type="textarea"
                      value={formData.keeping === "" ? data.keeping : formData.keeping}
                      onChange={handleChange}
                      // disabled
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
                          value={formData.grade === "" ? data.grade : formData.grade}
                          onChange={handleChange}
                          // disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="inspectorsPersonalnumber">{textPlaceHolderInputs[11]}</Label>
                        <Input
                          // placeholder={textPlaceHolderInputs[1]}
                          name="inspectorsPersonalnumber"
                          type="select"
                          value={
                            formData.inspectorsPersonalnumber === ""
                              ? data.inspectorsPersonalnumber
                              : formData.inspectorsPersonalnumber
                          }
                          onChange={handleChange}
                          // disabled
                        >
                          <option value="100-90">הערכה גבוהה 100-90</option>
                          <option value="89-80">הערכה טובה 89-80</option>
                          <option value="79-65">הערכה בינונית 79-65</option>
                          <option value="64-0">הערכה נמוכה 64-0</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <MDButton
                      color="mekatnar"
                      size="large"
                      // onClick={clickSubmit}
                      className="btn-new-blue"
                      type="submit"
                    >
                      שמור
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
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {showSuccess()}
      {NavigateUser()}
      {formTamplate()}
      <Footer />
    </DashboardLayout>
  );
};

export default FieldReuestFormDB;
