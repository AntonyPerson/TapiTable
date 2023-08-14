/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import "./style.css";

function AppThumnailCard({ image, title, action }) {
  return action.type === "external" ? (
    <MuiLink href={action.route} target="_blank" rel="noreferrer">
      <Card
        className="jello-vertical"
        sx={{
          Width: "15rem",
          height: "15rem",
          marginTop: 3,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <MDBox position="relative" borderRadius="lg" mt={2}>
          <MDBox
            component="img"
            src={image}
            alt={title}
            borderRadius="lg"
            shadow="md"
            width="10rem"
            position="relative"
            zIndex={1}
          />
        </MDBox>
        <MDBox p={3}>
          <MDTypography
            variant="h3"
            textTransform="capitalize"
            fontWeight="bold"
            color="mekatnar"
            verticalAlign="middle"
            textGradient="true"
          >
            {title}
          </MDTypography>
        </MDBox>
      </Card>
    </MuiLink>
  ) : (
    <Link to={action.route}>
      <Card
        className="shadow-inset-center"
        sx={{
          Width: "15rem",
          height: "15rem",
          marginTop: 3,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <MDBox position="relative" borderRadius="lg" mt={2}>
          <MDBox
            component="img"
            src={image}
            alt={title}
            borderRadius="lg"
            shadow="md"
            width="10rem"
            position="relative"
            zIndex={1}
          />
        </MDBox>
        <MDBox p={3}>
          <MDTypography
            variant="h3"
            textTransform="capitalize"
            fontWeight="bold"
            color="mekatnar"
            verticalAlign="middle"
            textGradient="true"
          >
            {title}
          </MDTypography>
        </MDBox>
      </Card>
    </Link>
  );
}

// Typechecking props for the AppThumnailCard
AppThumnailCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    // color: PropTypes.oneOf([
    //   "primary",
    //   "secondary",
    //   "mekatnar",
    //   "success",
    //   "warning",
    //   "error",
    //   "dark",
    //   "light",
    //   "default",
    // ]),
    // label: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppThumnailCard;
