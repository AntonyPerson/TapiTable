/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/newline-after-import */
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

import { useEffect, useState } from "react";

// react-router-dom components
import { NavLink, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import List from "@mui/material/List";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
import {
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
} from "context";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import NGTeamLogo from "assets/images/NewNGlogoWhite.svg";
import hozlaLogo from "assets/images/hozlaLogo.png";
import mekatnarLogo from "assets/images/unitsimg/mekatnar58.png";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
      return false;
    }

    if (children.constructor !== Array) {
      return false;
    }

    if (children.length === 0) {
      return false;
    }

    return true;
  }

  const getItemOfSidenavMulti = (type, name, icon, title, noCollapse, key, href, route, items) => {
    const [open, setOpen] = useState(false);
    const returnValue = [
      <SidenavCollapse
        name={name}
        icon={
          open ? (
            <Icon fontSize="small">expand_less</Icon>
          ) : (
            <Icon fontSize="small">expand_more</Icon>
          )
        }
        onClick={() => {
          setOpen(!open);
        }}
      />,
    ];
    returnValue.push(
      items !== undefined && items.length > 0 ? (
        items.map((item) => {
          let returnValueItem;

          if (item.type === "collapse") {
            returnValueItem = item.itemHref ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: 1 }}>
                  <Link
                    href={item.href}
                    key={item.key}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ textDecoration: "none" }}
                  >
                    <SidenavCollapse
                      name={item.name}
                      icon={item.icon}
                      active={item.key === collapseName}
                      noCollapse={noCollapse}
                    />
                  </Link>
                </List>
              </Collapse>
            ) : (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: 1 }}>
                  <NavLink key={item.key} to={item.route}>
                    <SidenavCollapse
                      name={item.name}
                      icon={item.icon}
                      active={item.key === collapseName}
                    />
                  </NavLink>
                </List>
              </Collapse>
            );
          } else if (item.type === "title") {
            returnValueItem = (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: 1 }}>
                  <MDTypography
                    key={item.key}
                    color={textColor}
                    display="block"
                    variant="caption"
                    fontWeight="bold"
                    textTransform="uppercase"
                    pl={3}
                    mt={2}
                    mb={1}
                    ml={1}
                  >
                    {item.title}
                  </MDTypography>
                </List>
              </Collapse>
            );
          } else if (item.type === "divider") {
            returnValueItem = (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: 1 }}>
                  <Divider
                    key={item.key}
                    light={
                      (!darkMode && !whiteSidenav && !transparentSidenav) ||
                      (darkMode && !transparentSidenav && whiteSidenav)
                    }
                  />
                </List>
              </Collapse>
            );
          } else if (item.type === "collapseMulti") {
            returnValueItem = (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: 1 }}>
                  {getItemOfSidenavMulti(
                    item.type,
                    item.name,
                    item.icon,
                    item.title,
                    item.noCollapse,
                    item.key,
                    item.href,
                    item.route,
                    item.items
                  )}
                </List>
              </Collapse>
            );
          }

          return returnValueItem;
        })
      ) : href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      )
    );
    return returnValue;
  };

  const getItemOfSidenav = (type, name, icon, title, noCollapse, key, href, route, items) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    } else if (type === "collapseMulti") {
      returnValue = getItemOfSidenavMulti(
        type,
        name,
        icon,
        title,
        noCollapse,
        key,
        href,
        route,
        items
      );
    }
    return returnValue;
  };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, items }) =>
      getItemOfSidenav(type, name, icon, title, noCollapse, key, href, route, items)
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>

        {/* //!your logo goes here */}
        <MDBox component={NavLink} to="/" display="flex">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="10.5rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            {/* <MDTypography component="h3" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography> */}
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox
        component="img"
        src={mekatnarLogo}
        alt="mekatnarLogo"
        width="70px"
        alignSelf="center"
        sx={{
          marginTop: "auto",
          marginBottom: "2rem",
        }}
      />
      {/* <MDBox
        component="img"
        src={NGTeamLogo}
        alt="NGTeamLogo"
        width="50px"
        alignSelf="center"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      /> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "mekatnar",
  brand: "ffff",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "mekatnar",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
