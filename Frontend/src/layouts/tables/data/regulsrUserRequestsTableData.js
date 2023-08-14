/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import listOfVisit from "constValue/listOfVisit";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// const { user } = isAuthenticated();
// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
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
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TapiTableApi/InspectionRequest/`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
  // useEffect(() => {
  //   console.log(user.personalnumber);
  //   axios
  //     .get(`http://localhost:5000/TapiRequests/requestByPersonalnumber/${user.personalnumber}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  // const projectOptions = ["א", "ב", "ג", "ד", "ה", "ו"];
  const getWorkStuts = (value) => {
    let stutus = "בקשה נשלחה";
    let color = "error";
    if (value === 25) {
      stutus = "ממתין לאישור";
      color = "error";
    } else if (value === 50) {
      stutus = "טרם בוצעה";
      color = "warning";
    } else if (value === 75) {
      stutus = "אושר אך לא קרתה";
      color = "info";
    } else if (value === 100) {
      stutus = "בוצעה";
      color = "success";
    }
    return [stutus, color];
  };

  const dbRows = requestDB.map((Tapi, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    author: <Author name={Tapi.fullName} email={Tapi.email} />,
    function: <Job title="Manager" description={Tapi.workName} />,
    // status: (
    //   <MDBox ml={-1}>
    //     <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //   </MDBox>
    // ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {`${Tapi.dateOfInspection.split("T")[0]}`}
      </MDTypography>
    ),
    // visit: (
    //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //     {`${listOfVisit.value[Tapi.dateOfmetteng]} - ${Tapi.dateEndOfmetteng.split("T")[0]}`}
    //   </MDTypography>
    // ),
    summary: (
      <Link to={`/adminSummary/${Tapi._id}`} key={Tapi._id}>
        <MDButton
          variant="gradient"
          color="mekatnar"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>edit</Icon>
        </MDButton>
      </Link>
    ),
    personalNumber: <MDTypography variant="caption">{Tapi.personalnumber}</MDTypography>,
    // fileID: parseInt(Tapi._id.slice(-4), 36),
    // project: Tapi.workName,
    // clearance:
    //   // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //   clearanceOptions[parseInt(Tapi.workClearance, 10)],
    // // </MDTypography>
    // typeRequest: (
    //   <>
    //     <MDBadge
    //       badgeContent={setTypeRequest(Tapi.typeRequest)[0]}
    //       color={setTypeRequest(Tapi.typeRequest)[1]}
    //       size="sm"
    //       container
    //     />
    //   </>
    // ),
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(Tapi.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(Tapi.status)[1]}
          value={Tapi.status >= 125 ? 100 : Tapi.status}
        />
      </>
    ),
    // NameRequester: Tapi.fullNameAsker,
    // diliveryDate: Tapi.workRecivedDate.split("T")[0],
    // startDate: Tapi.workGivenDate.split("T")[0],
    // additionalInfo: (
    //   <Link to={`/${setTypeRequest(Tapi.typeRequest)[2]}/${Tapi._id}`} key={Tapi._id}>
    //     <MDButton
    //       variant="gradient"
    //       color="mekatnar"
    //       // onClick={() => {
    //       //   // setIsInfoPressed(true);
    //       //   // setpressedID(Tapi._id);

    //       // }}
    //       circular="true"
    //       iconOnly="true"
    //       size="medium"
    //     >
    //       <Icon>info</Icon>
    //     </MDButton>
    //   </Link>
    // ),
    // TapiInfo: (
    //   <Link to={`/adminFeild/${Tapi._id}`} key={Tapi._id}>
    //     <MDButton
    //       variant="gradient"
    //       color="mekatnar"
    //       // onClick={() => {
    //       //   // setIsInfoPressed(true);
    //       //   // setpressedID(Tapi._id);
    //       // }}
    //       circular="true"
    //       iconOnly="true"
    //       size="medium"
    //     >
    //       <Icon>edit</Icon>
    //     </MDButton>
    //   </Link>
    // ),
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      // { Header: "שם ואימייל", accessor: "author", width: "40%", align: "left" },
      { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
      { Header: "הביקורת", accessor: "d", align: "left" },
      { Header: "ss", accessor: "c", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "סיכום ביקורת", accessor: "summary", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
