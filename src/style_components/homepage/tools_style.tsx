import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import autoCoverage from "../../icons/auto_coverage_type.webp";
import autoUsage from "../../icons/auto_usage_type.webp";
import autoPayoff from "../../icons/auto_payoff_mode.webp";
import autoStatus from "../../icons/auto_status.webp";
import taskSource from "../../icons/task_source.webp";
import taskJob from "../../icons/task_job_type.webp";
import taskPriority from "../../icons/task_priority.webp";
import userManagement from "../../icons/user_Management.webp";
import roleManagement from "../../icons/role_management.webp";
import autoDelete from "../../icons/auto_delete.webp";

export const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

export const Element = styled("div")`
  max-height: 250px;
  width: 100%;
  max-width: 250px;
  text-align: center;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row dense;
  grid-gap: 0.5rem;
  background-color: #f7f7f7;
  color: Black;
  &:hover {
    background-color: #dedede;
    color: Black;
  }
`;

export const StyledCard = styled(Card)`
  border: 0;
  max-width: 1200px;
  margin-top: 6%;
`;

export const AutoUsage = styled.img.attrs({
  src: `${autoUsage}`,
  alt: "Auto Usage icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const AutoCoverage = styled.img.attrs({
  src: `${autoCoverage}`,
  alt: "Auto Coverage icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const AutoPayoff = styled.img.attrs({
  src: `${autoPayoff}`,
  alt: "Auto Pay Off icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const AutoStatus = styled.img.attrs({
  src: `${autoStatus}`,
  alt: "Auto Status icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const TaskSource = styled.img.attrs({
  src: `${taskSource}`,
  alt: "Task Source icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const TaskJob = styled.img.attrs({
  src: `${taskJob}`,
  alt: "Task Job icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const TaskPriority = styled.img.attrs({
  src: `${taskPriority}`,
  alt: "Task Priority icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const UserManagement = styled.img.attrs({
  src: `${userManagement}`,
  alt: "User management icon",
})`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

export const RoleManagement = styled.img.attrs({
  src: `${roleManagement}`,
  alt: "Role management icon",
})`
width: 75%;
margin-left: auto;
margin-right: auto;
`;

export const AutoDelete = styled.img.attrs({
  src: `${autoDelete}`,
  alt: "Auto delete tasks",
})`
width: 75%;
margin-left: auto;
margin-right: auto;
`;
