import React from "react";
import Grid from "@mui/material/Grid";
import {
  Element,
  StyledLink,
  StyledCard,
  AutoCoverage,
  AutoUsage,
  AutoPayoff,
  AutoStatus,
  TaskSource,
  TaskJob,
  TaskPriority,
  UserManagement,
  RoleManagement,
  AutoDelete,
} from "../../../style_components/homepage/tools_style";
import "../../../style_components/processingpages/tools.css";

const tools = [
  {
    link: "/AutoUsageType",
    icon: <AutoUsage />,
    label: "Auto Usage Type",
  },
  {
    link: "/AutoCoverage",
    icon: <AutoCoverage />,
    label: "Auto Coverage Type",
  },
  {
    link: "/AutoPayOffMode",
    icon: <AutoPayoff />,
    label: "Auto Pay Off Mode",
  },
  {
    link: "/AutoStatus",
    icon: <AutoStatus />,
    label: "Auto Status",
  },
  {
    link: "/TaskSource",
    icon: <TaskSource />,
    label: "Task Source",
  },
  {
    link: "/TaskJobType",
    icon: <TaskJob />,
    label: "Task Job Type",
  },
  {
    link: "/TaskPriority",
    icon: <TaskPriority />,
    label: "Task Priority",
  },
  {
    link: "/UserManagement",
    icon: <UserManagement />,
    label: "User Management",
  },
  {
    link: "/RoleManagement",
    icon: <RoleManagement />,
    label: "Role Management",
  },
  {
    link: "/AutoDelete",
    icon: <AutoDelete />,
    label: "Auto Delete",
  },
  // {
  //   link: "/ThirdPartyIntegration",
  //   icon: <AutoDelete />,
  //   label: "Third Party Integration",
  // },
];

export const Tools = () => {
  const card = (
    <Grid container spacing={2}>
      {tools.map((tool) => (
        <Grid key={tool.link} item lg={3} md={6} xs={6}>
          <StyledLink to={tool.link}>
            <Element>
              {tool.icon}
              <p>{tool.label}</p>
            </Element>
          </StyledLink>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="cards-container">
      <StyledCard className="square" variant="outlined">
        {card}
      </StyledCard>
    </div>
  );
};
