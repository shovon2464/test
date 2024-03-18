import { Button } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import "../../style_components/homepage/welcomeSection.css";
import {
  WelcomeImage
} from "../../style_components/homepage/welcomesection_style";
import "../../style_components/homepage/homepage_style.css";

const WelcomeSection: React.FC = () => {
  return (
    <Grid container>
      <Grid className="welcomeImage_container" item lg={6} sm={6} xs={12}>
        <WelcomeImage />
      </Grid>

      <Grid item lg={6} sm={6} xs={12}>
        <div className="welcomeContent">
          <div className="WelcomeHeader">
            Welcome to
            <span style={{ color: "#A0D229" }}> BrokerAID </span> <br />
            task management system.
          </div>
          <div className="WelcomeInnerContent">
            Guides a smarter business decision support system. <br />
            Direct customer enquiries to concentrate on the profitable.
          </div>
          <Button variant="contained" style={{ backgroundColor: "#000000" }}>
            Learn More
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;
