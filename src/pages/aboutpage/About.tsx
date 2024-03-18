import React from "react";
import HomeNavBar from "../homepage/HomeNavBar";
import Footer from "../homepage/Footer";
import AboutWelcome from "./AboutWelcome";
import "../../style_components/aboutpage/aboutpage_style.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../style_components/global_theme_provider";
import Getstarted from "./Getstarted";
import AboutFeatures from "./AboutFeatures";

const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <HomeNavBar />
        <div className="aboutpage_container">
          <AboutWelcome />
          <Getstarted />
          <AboutFeatures />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default About;
