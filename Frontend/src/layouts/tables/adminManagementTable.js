/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import adminManagementData from "layouts/tables/data/adminManagementTable";
import { useEffect, useState } from "react";

import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

const adminManagementTable = () => {
  const tableTittle = "ניהול משתמשים";

  const [dbError, setDbError] = useState(false);
  //   const { columns, rows } = authorsTableData();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isAuthenticated()) {
      return <Navigate to="/dashboard" />;
    }
  }, []);

  const {
    columns: pColumns,
    rows: pRows,
    dbError: dbe,
    setDBerror: setDbe,
    changeRoleW,
    setChangeRoleW,
    pressedID,
  } = adminManagementData();
  const handleErrorClose = () => {
    setDbError(true);
    setDbe(false);
  };
  const showError = () => (
    <Dialog
      open={dbe}
      onClose={handleErrorClose}
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
  const handlechangeRoleWClose = () => {
    setChangeRoleW(false);
  };
  const showChangeRoleW = () => (
    <Dialog
      open={changeRoleW}
      onClose={handleErrorClose}
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
          בחר את התפקיד החדש
        </MDTypography>

        <DialogContent>
          <MDBox mb={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-autowidth-label">בחר סוג משתמש</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                name="userType"
                id="demo-simple-select-autowidth"
                value={() => {
                  axios
                    .post(`http://localhost:5000/TapiTableApi/user/getuserbyid`, {
                      userid: pressedID,
                    })
                    .then(
                      (response) =>
                        `${response.datadata.user.admin}${response.datadata.user.adminType}`
                    )
                    .catch((error) => {
                      console.log(error);
                      return "00";
                    });
                }}
                onChange={() => {
                  axios
                    .put(`http://localhost:5000/TapiTableApi/user/update/${pressedID}`, {
                      admin: "00",
                      adminType: "00",
                    })
                    .then((response) => {
                      setChangeRoleW(false);
                      window.location.reload(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                autoWidth
                label="בחר סוג משתמש"
                sx={{ height: 50, minWidth: 150 }}
              >
                <MenuItem value="">בחר</MenuItem>
                <MenuItem value="00">משתמש רגיל</MenuItem>
                <MenuItem value="11">מבקר</MenuItem>
                <MenuItem value="12">מנהל מערכת</MenuItem>
                <MenuItem value="22">מנהל מערכת ראשי</MenuItem>
              </Select>
            </FormControl>
          </MDBox>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const table = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                {tableTittle}
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              {pRows.length !== 0 ? (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder={false}
                />
              ) : dbError || dbe ? (
                <MDTypography mx={30} variant="h3" color="error" textGradient={true}>
                  תקלת שרת{" "}
                </MDTypography>
              ) : (
                <MDTypography mx={30} variant="h3" color="mekatnar" textGradient={true}>
                  לא קיימים משתמשים במערכת
                </MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {table()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default adminManagementTable;
