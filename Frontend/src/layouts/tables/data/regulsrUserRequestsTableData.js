/* eslint-disable no-nested-ternary */
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
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import axios from "axios";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import listOfVisit from "constValue/listOfVisit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const { user } = isAuthenticated();
// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data(viewOption) {
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

  const MINUTE_MS = 100000;

  useEffect(() => {
    let axiosStr = "http://localhost:5000/TapiTableApi/InspectionRequest/";

    if (
      viewOption === "CalenderView" ||
      (user.admin === "2" && user.adminType === "2") ||
      (user.admin === "1" && user.adminType === "2")
    ) {
      axiosStr = "http://localhost:5000/TapiTableApi/InspectionRequest/";
    } else if (viewOption === "PersonalView" && user.admin === "0" && user.adminType === "0") {
      axiosStr = `http://localhost:5000/TapiTableApi/InspectionRequest/requestByPersonalnumber/${user.personalnumber}`;
    } else if (viewOption === "PersonalView" && user.admin === "1" && user.adminType === "1") {
      axiosStr = `http://localhost:5000/TapiTableApi/InspectionRequest/requestByPersonalnumberInspector/${user.personalnumber}`;
    }
    axios
      .get(axiosStr)
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
      stutus = "אושרה אך לא קרתה";
      color = "info";
    } else if (value === 100) {
      stutus = "בוצעה";
      color = "success";
    }
    return [stutus, color];
  };

  const getTableColumns = () => {
    let arr = [
      { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
      { Header: "הביקורת", accessor: "d", align: "left" },
      { Header: "ss", accessor: "c", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "תאריך ביקורת", accessor: "appoinmentDate", align: "center" },
      { Header: "סיכום ביקורת", accessor: "summary", align: "center" },
    ];
    if (user !== undefined) {
      if (user.admin === "2" && user.adminType === "2") {
        arr = [
          { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
          { Header: "הביקורת", accessor: "d", align: "left" },
          { Header: "ss", accessor: "c", align: "left" },
          { Header: "function", accessor: "function", align: "left" },
          { Header: "סטטוס", accessor: "status", align: "center" },
          { Header: "תאריך ביקורת", accessor: "appoinmentDate", align: "center" },
          { Header: "פעולות הנהלה", accessor: "summary", align: "center" },
        ];
      } else if (user.admin === "1") {
        if (user.adminType === "1") {
          arr = [
            { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
            { Header: "הביקורת", accessor: "d", align: "left" },
            { Header: "ss", accessor: "c", align: "left" },
            { Header: "function", accessor: "function", align: "left" },
            { Header: "סטטוס", accessor: "status", align: "center" },
            { Header: "תאריך ביקורת", accessor: "appoinmentDate", align: "center" },
            { Header: "סיכום ביקורת", accessor: "summary", align: "center" },
          ];
        } else if (user.adminType === "2") {
          arr = [
            { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
            { Header: "הביקורת", accessor: "d", align: "left" },
            { Header: "ss", accessor: "c", align: "left" },
            { Header: "function", accessor: "function", align: "left" },
            { Header: "סטטוס", accessor: "status", align: "center" },
            { Header: "תאריך ביקורת", accessor: "appoinmentDate", align: "center" },
            { Header: "סיכום ביקורת", accessor: "summary", align: "center" },
          ];
        }
      }
    }
    return arr;
  };

  const dbRows = requestDB.map((Tapi, index) => ({
    author: <Author name={Tapi.fullName} email={Tapi.email} />,
    function: <Job title="Manager" description={Tapi.workName} />,

    appoinmentDate: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {`${Tapi.dateOfInspection.split("T")[0]}`}
      </MDTypography>
    ),

    summary:
      user.admin === "2" && user.adminType === "2" ? (
        Tapi.status === 25 ? (
          <MDBox
            px={5}
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <MDBox mr={2}>
              <MDButton
                variant="gradient"
                color="success"
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:5000/TapiTableApi/InspectionRequest/statusUpdate/${Tapi._id}`,
                      {
                        status: 50,
                      }
                    )
                    .then((response) => {
                      window.location.reload(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                circular="true"
                iconOnly="true"
                size="medium"
              >
                <Icon>done</Icon>
              </MDButton>
            </MDBox>
            <MDBox>
              <MDButton
                item
                variant="gradient"
                color="error"
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:5000/TapiTableApi/InspectionRequest/remove/${Tapi._id}`
                    )
                    .then((response) => {
                      window.location.reload(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                circular="true"
                iconOnly="true"
                size="medium"
              >
                <Icon>clear</Icon>
              </MDButton>
            </MDBox>
          </MDBox>
        ) : (
          <MDBox
            px={5}
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <MDBox mr={2}>
              <MDButton
                item
                variant="gradient"
                color="error"
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:5000/TapiTableApi/InspectionRequest/remove/${Tapi._id}`
                    )
                    .then((response) => {
                      window.location.reload(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                circular="true"
                iconOnly="true"
                size="medium"
              >
                <Icon>clear</Icon>
              </MDButton>
            </MDBox>
            <MDBox>
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
            </MDBox>
          </MDBox>
        )
      ) : (
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
  }));
  console.log(`isError ${isError}`);

  return {
    //* the tables headers
    columns: getTableColumns(),

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
