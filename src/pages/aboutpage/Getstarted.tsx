import { Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import "../../style_components/homepage/welcomeSection.css";
import { AboutWelcomeImage } from "../../style_components/aboutpage/aboutwelcomesection";
import "../../style_components/aboutpage/aboutpage_style.css";

const Getstarted: React.FC = () => {
  return (
    <Grid container>
      <Grid className="WelcomeMoreInfo" item lg={12} sm={12} xs={12}>
        <div className="Getstarted">
          <div
            style={{
              fontSize: "60px",
            }}>
            <b>Step-by-step tutorial to manage your daily works.</b>
          </div>
          <div style={{ fontSize: "40px" }}>
            To get started, go to the BrokerAID homepage and sign in.
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Getstarted;
