/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import { ConstructionOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, Icon, Tab } from "@mui/material";
import axios from "axios";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
// import { mainExample } from "merageJasonExcelFiels";
import AppThumnailCard from "examples/Cards/AppThumnailCard";
import AppThumnailCardBack from "examples/Cards/AppThumnailCardBack";
import TimelineItem from "examples/Timeline/TimelineItem";
import TimelineList from "examples/Timeline/TimelineList";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
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
import DashboardHeader from "./components/DashboardHeader";

// ? images for the thumnails
import PDFdownloadImage from "assets/images/PDFdownloadImage.png";
import logobazak from "assets/images/logobazak.png";
import NGProjectTemplateLogoPNG from "assets/images/projectLogoImages/NGProjectTemplateLogoPNG.png";
import { isAuthenticated } from "auth";
import pdfA14 from "../../Light.pdf";
import fileexamplePDF1MB from "../../fileexamplePDF1MB.pdf";

const { user } = isAuthenticated();
function Dashboard() {
  // const [tabView, setTabView] = useState(0);
  const [massagesClient, setMassagesClient] = useState([]);

  const getFilterByAdmin = (admin, type, messageType) => {
    let array = ["00", "99"];
    if (admin !== "-1" && type !== "-1") {
      if (admin === "0") {
        array = ["00", "99"];
      } else if (admin === "1") {
        if (type === "1") {
          array = ["00", "11", "99"];
        } else if (type === "2") {
          array = ["00", "12", "99"];
        }
      } else if (admin === "2") {
        array = ["00", "11", "12", "22", "99"];
      }
    }
    return array.includes(messageType);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TapiTableApi/SystemAlerts`)
      .then((response) => {
        const admin = user !== undefined ? user.admin : "-1";
        const type = user !== undefined ? user.adminType : "-1";
        setMassagesClient(
          response.data.filter((message) => getFilterByAdmin(admin, type, message.type)).slice(0, 5)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getTypeALertIconColor = (type) => {
    let icon = "notifications";
    let color = "mekatnar";
    if (type === "00") {
      icon = "notifications";
      color = "mekatnar";
    } else if (type === "11") {
      icon = "notifications";
      color = "warning";
    } else if (type === "12") {
      icon = "notifications";
      color = "info";
    } else if (type === "22") {
      icon = "notifications";
      color = "error";
    } else if (type === "99") {
      icon = "priority_highIcon";
      color = "error";
    }
    return [icon, color];
  };
  const tableApps = [
    {
      name: "ע' 14",
      link: pdfA14,
      linkType: "external",
      image: PDFdownloadImage,
    },
    {
      name: 'תפ"י ממוחשב',
      link: "https://www.google.com/",
      linkType: "external",
      image: NGProjectTemplateLogoPNG,
    },
    {
      name: "יומן רישומים",
      link: "/Table",
      linkType: "internal",
      image: NGProjectTemplateLogoPNG,
    },
    {
      name: "פרויקטים נדרשים",
      link: "/requiredProjects",
      linkType: "internal",
      image: NGProjectTemplateLogoPNG,
    },
    {
      name: "בזכ",
      link: "https://www.google.com/",
      linkType: "external",
      image: logobazak,
    },
    {
      name: "מערכת Y",
      link: "https://www.google.com/",
      linkType: "external",
      image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    },
  ];

  const clientView = () => (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {tableApps.map((app, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <AppThumnailCard
                color="mekatnar"
                title={app.name}
                image={app.image}
                action={{
                  type: app.linkType,
                  route: app.link,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <MDBox
        sx={{
          width: "50%",
          justifyItems: "center",
        }}
        py={3}
      >
        <TimelineList title="הודעות מערכת">
          {massagesClient.length !== 0 ? (
            massagesClient.map((message, index) =>
              index === massagesClient.length - 1 ? (
                <TimelineItem
                  icon={getTypeALertIconColor(message.type)[0]}
                  title={message.title}
                  dateTime={message.updatedAt.split("T")[0].split("-").reverse().join("/")}
                  description={message.body}
                  color={getTypeALertIconColor(message.type)[1]}
                  key={index}
                  lastItem
                />
              ) : (
                <TimelineItem
                  icon={getTypeALertIconColor(message.type)[0]}
                  title={message.title}
                  dateTime={message.updatedAt.split("T")[0].split("-").reverse().join("/")}
                  description={message.body}
                  color={getTypeALertIconColor(message.type)[1]}
                  key={index}
                />
              )
            )
          ) : (
            <MDTypography variant="h4" fontWeight="medium" color="error" mt={1}>
              אין הודעות מערכת
            </MDTypography>
          )}
          {massagesClient.length !== 0 ? (
            <Link to="/systemAlerts">
              <MDButton variant="outlined" color="info">
                ראה את כל ההודעות
              </MDButton>
            </Link>
          ) : null}
        </TimelineList>
      </MDBox>
    </>
  );

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <DashboardHeader />
      {/* <DashboardHeader tabViewValue={tabView} setTabViewValue={setTabView} /> */}
      {/* <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
        {tabView}
      </MDTypography> */}
      {/* {
        tabView === 0 //* mahlaka view
          ? clientView()
          : clientView() //* ploga view
      } */}
      {clientView()}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
