/* eslint-disable react/jsx-curly-brace-presence */
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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="mekatnar"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {'ברוך הבא למערכת תפ"י'}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            משתמש יואשר עד כ72 שעות לאחר ההרשמה
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="שם מלא" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="מספר אישי" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="סיסמא" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="mekatnar" fullWidth>
                הירשם
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                רשום כבר?
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="mekatnar"
                  fontWeight="medium"
                  textGradient
                >
                  התחבר כאן
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
