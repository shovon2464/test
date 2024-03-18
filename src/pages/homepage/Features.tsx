import { CoPresent } from "@mui/icons-material";
import React from "react";
import Grid from "@mui/material/Grid";
import {
  TaskIcon,
  CommunicationIcon,
  QualityControlIcon,
  ConvenienceIcon,
  FeaturesContainer,
  FeaturesContent,
  FeatureCard,
  CardHeader,
  CardContent,
} from "../../style_components/homepage/features_style";

const Features: React.FC = () => {
  return (
    <FeaturesContainer>
      <Grid container spacing={2}>
        
          <Grid item lg={3} sm={6} xs={12}>
            <FeatureCard>
              <TaskIcon />
              <CardHeader>Task Tracking</CardHeader>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item lg={3} sm={6} xs={12}>
            <FeatureCard>
              <CommunicationIcon />
              <CardHeader>Communication Improvement</CardHeader>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item lg={3} sm={6} xs={12}>
            <FeatureCard>
              <QualityControlIcon />
              <CardHeader>Quality Control</CardHeader>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item lg={3} sm={6} xs={12}>
            <FeatureCard>
              <ConvenienceIcon />
              <CardHeader>Convenience</CardHeader>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </FeatureCard>
          </Grid>
        
      </Grid>
    </FeaturesContainer>
  );
};

export default Features;
