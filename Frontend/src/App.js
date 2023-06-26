/* eslint-disable import/no-named-default */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-duplicates */
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
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
// react-router components
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Configurator from "examples/Configurator";
import Alerts from "examples/Alerts";
import Messages from "examples/Messages";
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

// Material Dashboard 2 React routes
import AdminRoutes from "routes/AdminRoutes";
import { default as UserRoutes } from "routes/userRoutes";

// Material Dashboard 2 React contexts
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";

// ! ---------------Project Brand Images and info---------------------------
import {
  default as brandDark,
  default as brandWhite,
} from "assets/images/projectLogoImages/NGProjectTemplateLogoSVG.svg";
// ! ------------------------------------------

import WebsiteLoader from "components/WebsiteLoader/WebsiteLoader";
import FieldReuestFormDB from "layouts/Forms/FieldReuestFormDB";
import Error404 from "views/Error404";
// import SignIn from "layouts/authentication/sign-in";
// import SignInURL from "layouts/authentication/sign-in/sign-in-URLs/urlLayout";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import { authenticate, isAuthenticated, signin, updateRefreshCount } from "auth/index";

import sidenav from "assets/theme/components/sidenav";
import AboutPage from "views/aboutpage/AboutPage";

export default function App() {
  const brandName = 'תפ"י';

  const params = useParams();

  const [user, setUser] = useState(isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(!(user.admin === "0"));
  // console.log("User in App");
  // console.log(user);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  // const handleOnMouseEnter = () => {
  //   if (miniSidenav && !onMouseEnter) {
  //     setMiniSidenav(dispatch, false);
  //     setOnMouseEnter(true);
  //   }
  // };

  // Close sidenav when mouse leave mini sidenav
  // const handleOnMouseLeave = () => {
  //   if (onMouseEnter) {
  //     setMiniSidenav(dispatch, true);
  //     setOnMouseEnter(false);
  //   }
  // };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleConfiguratorOpenNotifications = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleConfiguratorOpenMessage = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, ["rtl"]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useMemo(() => {
    if (localStorage.getItem("RefreshCount") === "1") {
      const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
      updateRefreshCount(count);
      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href;
    }
  }, [localStorage.getItem("RefreshCount")]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="20%"
      position="fixed"
      top="20px"
      right="2rem"
      // bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  const AlertsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="20%"
      top="80px"
      position="fixed"
      right="2rem"
      // bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpenNotifications}
    >
      <Icon fontSize="small" color="inherit">
        notifications_none
      </Icon>
    </MDBox>
  );
  const MassagesButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="20%"
      top="140px"
      position="fixed"
      right="2rem"
      // bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpenMessage}
    >
      <Icon fontSize="small" color="inherit">
        message
      </Icon>
    </MDBox>
  );
  // for the user
  useEffect(() => {
    // setIsAdmin(() => {
    //   if (user) {
    //     if (user.admin !== "0") {
    //       return true;
    //     }
    //   }
    //   return false;
    // });
    setUser(isAuthenticated());
    // console.groupCollapsed("User in App useEffect function");
    // console.log(user.user);
    // console.groupEnd();
    if (user.user === "DoNotExist" || user.user === "undefined") {
      return <Navigate to="/authentication/sign-in" />;
    }
    return <Navigate to="/" />;
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <>
      {loading ? (
        <WebsiteLoader />
      ) : (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {/* {layout === "dashboard" && user.user !== undefined ? (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName={brandName}
                  // hozla
                  // routes={user.user.admin !== "0" ? AdminRoutes : routes}
                  // tora heilit
                  routes={user.user.admin === "0" ? UserRoutes : AdminRoutes}
                  // routes={user.user.admin !== "0" ? AdminRoutes : routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                
              </>
            ) : null} */}
            <Configurator />
            {configsButton}
            <Alerts />
            {AlertsButton}
            <Messages />
            {MassagesButton}

            {/* {layout === "vr" && <Configurator />} */}
            {user.user !== undefined ? (
              user.user.admin === "1" ? (
                <Routes>
                  {getRoutes(AdminRoutes)}
                  <Route path="/" element={<Navigate to="/Dashboard" />} />
                  {/* <Route path="/" element={<Navigate to="/authentication/sign-in" />} /> */}
                  <Route path="/Error404" element={<Error404 />} />
                  {/* <Route path="/adminForm" element={<HozlaAdminPrintInfoForm />} /> */}
                  {/* <Route path="/adminFieldReuestFormDB" element={<AdminFieldReuestFormDB />} /> */}
                  <Route path="/RequestForm">
                    <Route path=":formID" element={<FieldReuestFormDB />} />
                  </Route>
                  <Route path="*" element={<Error404 />} />
                </Routes>
              ) : null
            ) : (
              <Routes>
                {getRoutes(UserRoutes)}
                {/* <Route path="/authentication/sign-in" element={<SignIn />} /> */}
                {/* <Route path="/authentication/sign-up" element={<SignUp />} /> */}
                <Route path="/Error404" element={<Error404 />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
                {/* <Route path="/" element={<Navigate to="/about-us" />} /> */}
                {/* <Route path="*" element={<Navigate to="/Error404" />} /> */}
              </Routes>
            )}
          </ThemeProvider>
        </CacheProvider>
      )}
    </>
  );
}
