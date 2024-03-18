import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const StyledLink = styled(Link)`
  color: Black;
  text-decoration: none;
  margin-top: 0.5rem;
`;

export const SidebarImage = styled(`img`)`
  width: 55px;
  height: 55px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
`;

export const StyledButton = styled(Button)`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  text-align: center;
  display: inline-block;
  border-radius: 28px;
  width: 85%;
  /*  border: 2px solid dodgerblue;*/
`;
