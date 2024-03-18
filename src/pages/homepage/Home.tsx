import React from "react";
import HomeNavBar from "./HomeNavBar";
import Footer from "./Footer";
import WelcomeSection from "./WelcomeSection";
import Features from "./Features";
import "../../style_components/homepage/homepage_style.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../style_components/global_theme_provider";

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <HomeNavBar />
        <div className="homepage_container">
          <WelcomeSection />
          <Features />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
