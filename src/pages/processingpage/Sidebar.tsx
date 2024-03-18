import * as React from "react";
import "../../style_components/processingpages/sidebar/Sidebar.css";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  AppBar,
  StyledButton,
  StyledLink,
} from "../../style_components/homepage/sidebar_style";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GradingIcon from "@mui/icons-material/Grading";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import broker_aid_logo from "../../icons/broker-aid-logo.webp";
import { ReactComponent as DsahboardIcon } from "../../icons/Dsahboard.svg";
import { ReactComponent as ESignIcon } from "../../icons/E-Sign.svg";
import { ReactComponent as FileConsoleIcon } from "../../icons/File_Console.svg";
import { ReactComponent as PerformanceReportIcon } from "../../icons/Performance_Report.svg";
import { ReactComponent as QuoteConsoleIcon } from "../../icons/Quote_Console.svg";
import { ReactComponent as TaskConsoleIcon } from "../../icons/Task_Console.svg";
import { ReactComponent as ToolsIcon } from "../../icons/Tools.svg";
import { ReactComponent as ComingCallIcon } from "../../icons/coming_call.svg";
import { ReactComponent as PointIcon } from "../../icons/point.svg";
import { ReactComponent as EsignConnectedIcon } from "../../icons/connected.svg";
import { ReactComponent as EsignNotConnectedIcon } from "../../icons/notconnected.svg";

import LogOutLink from "../auth/LogOut";
import { Badge, BadgeProps, Link } from "@mui/material";
import LiveClock from "../../interfaces/live_clock/liveClock";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { areAllQuotesViewed } from "../../services/quote/quote";
import { areAllViewed } from "../../action_creators/quote/quote_list";

export interface SidebarProp {
  open: boolean;
  setOpen: any;
}

export const MiniDrawer = (prop: SidebarProp) => {
  const open = prop.open;
  const setOpen = prop.setOpen;
  const theme = useTheme();
  const location = useLocation();
  const [listSelected, setListSelected] = React.useState(0);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (location.pathname === "/Dashboard") {
      setListSelected(0);
    }

    if (location.pathname === "/ComingCall") {
      setListSelected(1);
    }

    if (location.pathname === "/CreateJob") {
      setListSelected(2);
    }

    if (location.pathname === "/TaskConsole") {
      setListSelected(3);
    }

    if (location.pathname === "/FileConsole") {
      setListSelected(4);
    }

    if (location.pathname === "/QcConsole") {
      setListSelected(5);
    }

    if (location.pathname === "/QuoteConsole") {
      setListSelected(6);
    }

    if (location.pathname === "/AppointmentConsole") {
      setListSelected(7);
    }

    if (location.pathname === "/Tools") {
      setListSelected(8);
    }

    if (location.pathname === "/PerformanceReport") {
      setListSelected(9);
    }

    if (location.pathname === "/Evaluation") {
      setListSelected(11);
    }
  }, [location]);

  const [badgeShow, setBadgeShow] = React.useState(false);
  const areAllQuoteViewed = useAppSelector(
    (state) => state.quoteList.areAllQuotesViewed
  );
  React.useEffect(() => {
    const checkAllQuotesViewed = async () => {
      dispatch(areAllViewed({}));
      if (areAllQuoteViewed === true) {
        setBadgeShow(false);
      } else {
        setBadgeShow(true);
      }
    };
    checkAllQuotesViewed();
  }, [areAllQuoteViewed]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleListItemButtonClick = (event: any, index: number) => {
    setListSelected(index);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -1,
      top: 20,
    },
  }));

  const connectionStatus = useAppSelector(
    (state) => state.syncEsign.connection
  );
  return (
    <Box className="sidebar-box" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="sidebar-appbar"
        position="fixed"
        open={open}
        elevation={0}
      >
        <Toolbar className="top-nav-toolbar">
          <IconButton
            className="top-nav-icon-button"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {open === false && <MenuIcon sx={{ marginRight: -1.4 }} />}
            {open === true ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            {open === true && <MenuIcon sx={{ marginLeft: -1.4 }} />}
          </IconButton>
          <img
            className="top-navbar-logo"
            src={broker_aid_logo}
            alt="broker aid logo"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className="sidebar-drawer"
        variant="persistent"
        anchor="left"
        open={open}
      >
        <LiveClock />
        <StyledLink
          to="/VehicleQuestionnaire"
          className="sidebar-item-container"
        >
          <StyledButton
            className="create-job-button"
            variant="outlined"
            hidden={!open}
          >
            + New Job
          </StyledButton>
        </StyledLink>
        <List>
          <StyledLink to="/Dashboard" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 0}
              onClick={(event) => handleListItemButtonClick(event, 0)}
            >
              <ListItemIcon>
                <DsahboardIcon className="sidebar-icons" />
              </ListItemIcon>
              Dashboard
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/ComingCall" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 1}
              onClick={(event) => handleListItemButtonClick(event, 1)}
            >
              <ListItemIcon>
                <ComingCallIcon className="sidebar-icons" />
              </ListItemIcon>
              Incoming Call
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/CreateJob" className="sidebar-item-container">
            <ListItemButton
              hidden={true}
              className="drawer-list-item-button"
              selected={listSelected === 2}
              onClick={(event) => handleListItemButtonClick(event, 2)}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              Create Job
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/TaskConsole" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 3}
              onClick={(event) => handleListItemButtonClick(event, 3)}
            >
              <ListItemIcon>
                <TaskConsoleIcon className="sidebar-icons" />
              </ListItemIcon>
              Task Console
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/FileConsole" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 4}
              onClick={(event) => handleListItemButtonClick(event, 4)}
            >
              <ListItemIcon>
                <FileConsoleIcon className="sidebar-icons" />
              </ListItemIcon>
              File Console
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/QcConsole" className="sidebar-item-container">
            <ListItemButton
              hidden={true}
              className="drawer-list-item-button"
              selected={listSelected === 5}
              onClick={(event) => handleListItemButtonClick(event, 5)}
            >
              <ListItemIcon>
                <GradingIcon />
              </ListItemIcon>
              QC Console
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/QuoteConsole" className="sidebar-item-container">
            <StyledBadge
              variant="dot"
              badgeContent=""
              color="error"
              invisible={areAllQuoteViewed}
            >
              <ListItemButton
                className="drawer-list-item-button"
                selected={listSelected === 6}
                onClick={(event) => handleListItemButtonClick(event, 6)}
              >
                <ListItemIcon>
                  <QuoteConsoleIcon className="sidebar-icons" />
                </ListItemIcon>
                Quote Console
              </ListItemButton>
            </StyledBadge>
          </StyledLink>
          <Link
            className="sidebar-item-container drawer-link-to-uw-esign"
            onClick={() => {
              window.open("https://esign.uwinsure.com/login");
            }}
          >
            {connectionStatus ? (
              <ListItemButton
                className="drawer-list-item-button"
                selected={listSelected === 10}
                onClick={(event) => handleListItemButtonClick(event, 10)}
              >
                <ListItemIcon>
                  <EsignConnectedIcon className="sidebar-icons connected" />
                </ListItemIcon>
                UWESign
              </ListItemButton>
            ) : (
              <ListItemButton
                className="drawer-list-item-button"
                selected={listSelected === 10}
                onClick={(event) => handleListItemButtonClick(event, 10)}
              >
                <ListItemIcon>
                  <EsignNotConnectedIcon className="sidebar-icons not-connected" />
                </ListItemIcon>
                UWESign
              </ListItemButton>
            )}
          </Link>
          <StyledLink
            to="/PerformanceReport"
            className="sidebar-item-container"
          >
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 9}
              onClick={(event) => handleListItemButtonClick(event, 9)}
            >
              <ListItemIcon>
                <PerformanceReportIcon className="sidebar-icons" />
              </ListItemIcon>
              Performance Report
            </ListItemButton>
          </StyledLink>
          <StyledLink
            to="/AppointmentConsole"
            className="sidebar-item-container"
          >
            <ListItemButton
              hidden={true}
              className="drawer-list-item-button"
              selected={listSelected === 7}
              onClick={(event) => handleListItemButtonClick(event, 7)}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              Appointment Console
            </ListItemButton>
          </StyledLink>
          <StyledLink to="/Tools" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 8}
              onClick={(event) => handleListItemButtonClick(event, 8)}
            >
              <ListItemIcon>
                <ToolsIcon className="sidebar-icons" />
              </ListItemIcon>
              Tools
            </ListItemButton>
          </StyledLink>

          <StyledLink to="/evaluation" className="sidebar-item-container">
            <ListItemButton
              className="drawer-list-item-button"
              selected={listSelected === 11}
              onClick={(event) => handleListItemButtonClick(event, 11)}
            >
              <ListItemIcon>
                <PointIcon className="sidebar-icons" />
              </ListItemIcon>
              Evaluation
            </ListItemButton>
          </StyledLink>

          <ListItemButton className="drawer-list-log-out-button">
            <LogOutLink />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default MiniDrawer;
