import { Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import "../../style_components/homepage/welcomeSection.css";
import { AboutWelcomeImage } from "../../style_components/aboutpage/aboutwelcomesection";
import "../../style_components/aboutpage/aboutpage_style.css";

const AboutWelcome: React.FC = () => {
  return (
    <Grid container>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <div className="aboutWelcomeContent">
          <div className="aboutWelcomeHeader">
            <div className="aboutWelcomeHeaderTop">WELCOME TO BROKERAID</div>

            <div className="aboutWelcomeHeaderBot">
              The ultimate task management system
            </div>
          </div>
          <div
            className="aboutWelcomeInnerContent"
            style={{ fontSize: "30px" }}>
            With BrokerAID, you can manage your daily tasks, online quotes, and
            communicate with your colleagues all in one place.
            <br />
          </div>
        </div>
      </Grid>

      <Grid
        className="aboutWelcomeImage_container"
        item
        lg={6}
        md={12}
        sm={12}
        xs={12}>
        <AboutWelcomeImage />
      </Grid>
    </Grid>
  );
};

export default AboutWelcome;
