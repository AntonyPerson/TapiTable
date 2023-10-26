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
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import projectsTable from "layouts/tables/projectsTable";

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
import add from "../../assets/images/add.png";
import RedDot from "../../assets/images/RedDot.png";
import YellowDot from "../../assets/images/YellowDot.png";
import GreenDot from "../../assets/images/GreenDot.png";
import Tigris from "../../assets/images/Tigris.jpg";
import Karakal from "../../assets/images/Karakal.jpg";
import David from "../../assets/images/David.jpg";
import Zehev from "../../assets/images/Zehev.jpg";
import Eitan from "../../assets/images/Eitan.jpg";
import TankMK4 from "../../assets/images/TankMK4.jpg";

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

  const requiredProjects = [
    {
      image: TankMK4,
      label: "טנקים",
      title: "טנק מרכבה סימן 4",
      description:
        "טנק מרכבה סימן 4 הוא הדגם הרביעי מסדרת טנקי המרכבה - טנק מערכה ישראלי שפותח ומיוצר בישראל עבור חיל השריון של צה``ל. המפרט הטכני ויכולותיו של `סימן 4` עולים באופן משמעותי על אלו של קודמיו, וכוללים תותח טנק 120 מ``מ ומנוע דיזל בהספק של 1,500 כוחות סוס.",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: RedDot,
        name: "תפוס",
      },
    },
    {
      image: Eitan,
      label: "טנקים",
      title: "איתן",
      description:
        "איתן הוא נגמ``ש אופני שפותח במנהלת המרכבה והרק``ם (מנת``ק) במשרד הביטחון ועתיד להיקלט בצבא הגנה לישראל ולהחליף את כל הנגמ``שים, למעט הנמ``ר. האיתן, שממנו הוזמנו מאות על ידי צה``ל, יהיה לנגמ``ש האופני הראשון בשירות צה``ל מאז שנות ה-60 של המאה ה-20 שאינו נשק שלל.",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: GreenDot,
        name: "זמין",
      },
    },
    {
      image: Zehev,
      label: "ג'יפים ורכבי שטח",
      title: "זאב",
      description:
        "זאב הוא רכב שטח ישראלי ממוגן. הזאב יכול להחליף כלי רכב קלים לנשיאת לוחמים וציוד כדוגמת האביר ולשפר את בטיחות הנוסעים ואת מיגונם ביחס לכלי רכב אחרים. הרכב פותח על ידי חברת רַפַאֵל – רשות לפיתוח אמצעי לחימה בשיתוף עם חטיבה טכנולוגית ליבשה.",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: GreenDot,
        name: "זמין",
      },
    },
    {
      image: David,
      label: "ג'יפים ורכבי שטח",
      title: "דוד",
      description:
        "דויד הוא רכב שטח קרבי ממוגן שנמצא בשימוש צהל. דויד מחליף את הסופה M-240 הממוגנת כרכב קרבי עירוני לאזורי עימות. הדור השני של הדויד הוחלפו מלאנד רובר דיפנדר לטויוטה היילקס.",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: YellowDot,
        name: "בתפוסה",
      },
    },
    {
      image: Karakal,
      label: "ג'יפים ורכבי שטח",
      title: "קרקל",
      description:
        "הקרקל הוא רכב שטח ממוגן שתוכנן על ידי חברת פלסן סאסא הישראלית. הרכב מבוסס על שלדת רכבי הפורד מסדרה F שקוצרה לבסיס גלגלים באורך 2.84 מטר. קיצור השלדה נעשה בחברה בארצות הברית. לקרקל מיגון מרוכב והוא תוכנן במקור כאפשרות חלופה לרכבי הסופה בצהל. ",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: GreenDot,
        name: "זמין",
      },
    },
    {
      image: Tigris,
      label: "ג'יפים ורכבי שטח",
      title: "טיגריס",
      description:
        "הטיגריס הוא רכב שטח ממוגן ירי תוצרת ישראל שנקלט בצה``ל בתחילת 2023. ייעודו הוא לשמש ככלי בט``ש ביהודה ושומרון ולהחליף את רכב ה``זאב``, שנכנס לשירות ב-2004.",
      action: {
        type: "internal",
        route: "/somewhere",
        color: "mekatnar",
        label: "צפה בפרויקט",
      },
      authors: {
        image: RedDot,
        name: "תפוס",
      },
    },
  ];

  // const massagesClient = [
  //   {
  //     title: "$2400 Design changes",
  //     dateTime: "21/01/2022",
  //     icon: "notifications",
  //     color: "success",
  //     description:
  //       "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
  //   },
  //   {
  //     title: "$2400 Design changes",
  //     dateTime: "21/02/2022",
  //     icon: "notifications",
  //     color: "error",
  //     description:
  //       "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
  //   },
  //   {
  //     title: "$2400 Design changes",
  //     dateTime: "21/03/2022",
  //     icon: "notifications",
  //     color: "mekatnar",
  //     description:
  //       "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
  //   },
  //   {
  //     title: "$2400 Design changes",
  //     dateTime: "21/04/2022",
  //     icon: "notifications",
  //     color: "success",
  //     description:
  //       "People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.",
  //   },
  // ];

  const clientView = () => (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* {requiredProjects.map((app, index) => (
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
          ))} */}

          {requiredProjects.map((TapiProject) => (
            <Grid item xs={12} md={6} lg={3}>
              <DefaultProjectCard
                image={TapiProject.image}
                label={TapiProject.label}
                title={TapiProject.title}
                description={TapiProject.description}
                action={{
                  type: TapiProject.action.type,
                  route: TapiProject.action.type,
                  color: TapiProject.action.color,
                  label: TapiProject.action.label,
                }}
                authors={[{ image: TapiProject.authors.image, name: TapiProject.authors.name }]}
              />
            </Grid>
          ))}
        </Grid>
      </MDBox>
      {projectsTable()}
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
