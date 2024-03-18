import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../../style_components/homepage/navbar_style";
import pages from "../../style_components/homepage/navbar_style";
import { Route, Routes } from "react-router-dom";

import Login from "../auth/Login";
import Home from "./Home";



const HomeNavBar: React.FC = () => {
  return <ResponsiveAppBar />;
  <Routes>
    <Route path="/" />
    <Route path="/" />
    <Route path="/Login" element={<Login />} />
  </Routes>;
};
export default HomeNavBar;
