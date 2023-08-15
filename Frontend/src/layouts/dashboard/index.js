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
import NGProjectTemplateLogoPNG from "assets/images/projectLogoImages/NGProjectTemplateLogoPNG.png";
import fileexamplePDF1MB from "../../fileexamplePDF1MB.pdf";
import pdfA14 from "../../Light.pdf";
import logobazak from "assets/images/logobazak.png";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [tabView, setTabView] = useState(0);

  // ? user Choise
  const [selectedVaules, setSelectedVaules] = useState({
    mahlaka: "",
    ploga: "",
    gdod: "",
  });

  function handleChangeSelect(evt) {
    const { value } = evt.target;
    setSelectedVaules({ ...selectedVaules, [evt.target.name]: value });
  }

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

  const massagesClient = [
    {
      title: "$2400 Design changes",
      dateTime: "21/01/2022",
      icon: "notifications",
      color: "success",
      description:
        "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
    },
    {
      title: "$2400 Design changes",
      dateTime: "21/02/2022",
      icon: "notifications",
      color: "error",
      description:
        "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
    },
    {
      title: "$2400 Design changes",
      dateTime: "21/03/2022",
      icon: "notifications",
      color: "mekatnar",
      description:
        "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
    },
    {
      title: "$2400 Design changes",
      dateTime: "21/04/2022",
      icon: "notifications",
      color: "success",
      description:
        "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
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
          {massagesClient.map((message, index) =>
            index === massagesClient.length - 1 ? (
              <TimelineItem
                icon={message.icon}
                title={message.title}
                dateTime={message.dateTime}
                description={message.description}
                color={message.color}
                key={index}
                lastItem
              />
            ) : (
              <TimelineItem
                icon={message.icon}
                title={message.title}
                dateTime={message.dateTime}
                description={message.description}
                color={message.color}
                key={index}
              />
            )
          )}
        </TimelineList>
      </MDBox>
    </>
  );

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <DashboardHeader tabViewValue={tabView} setTabViewValue={setTabView} />
      {/* <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
        {tabView}
      </MDTypography> */}
      {
        tabView === 0 //* mahlaka view
          ? clientView()
          : clientView() //* ploga view
      }
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
