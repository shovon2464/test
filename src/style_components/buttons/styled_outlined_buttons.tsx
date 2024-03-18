import { styled, SxProps, Theme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { string } from "yup";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "small" | "medium" | "large" | undefined;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  hidden?: boolean;
  fullWidth?: boolean;
  href?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  "aira-label"?: string;
}

// export const OutlinedPrimaryButton = styled(Button)(() => ({
//   color: "#57413A",
//   border: "2px solid",
//   padding: "5px 15px",
//   ":hover": {
//     color: "#2E221F"
//   }
// }));

export function OutlinedPrimaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledPrimaryButton = styled(Button)(() => ({
      ":hover": {
        color: "#2E221F"
      }
    }));
  return (
    <StyledPrimaryButton
      variant="outlined"
      color="primary"
      {...other}
    >
      {children}
    </StyledPrimaryButton>
  )
};

export function OutlinedSecondaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSecondaryButton = styled(Button)(() => ({
    ":hover": {
      color: "#86715F"
    }
  }));
  return (
    <StyledSecondaryButton
      variant="outlined"
      color="secondary"
      {...other}
    >
      {children}
    </StyledSecondaryButton>
  )
};

export function OutlinedSuccessButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSuccessButton = styled(Button)(() => ({
    ":hover": {
      color: "#143923"
    }
  }));
  return (
    <StyledSuccessButton
      variant="outlined"
      color="success"
      {...other}
    >
      {children}
    </StyledSuccessButton>
  )
};

export function OutlinedErrorButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledErrorButton = styled(Button)(() => ({
    color: "#853037",
    border: "2px solid",
    padding: "5px 15px",
    ":hover": {
      color: "#BB444E"
    }
  }));
  return (
    <StyledErrorButton
      variant="outlined"
      color="error"
      {...other}
    >
      {children}
    </StyledErrorButton>
  )
};

export function OutlinedWarningButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledWarningButton = styled(Button)(() => ({
    ":hover": {
      color: "#E67E00"
    }
  }));
  return (
    <StyledWarningButton
      variant="outlined"
      color="warning"
      {...other}
    >
      {children}
    </StyledWarningButton>
  )
};

export function OutlinedInfoButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledInfoButton = styled(Button)(() => ({
    color: "#57413A",
    border: "2px solid #F7EDD4",
    ":hover": {
      border: "2px solid #F3E4BE",
    }
  }));
  return (
    <StyledInfoButton
      variant="outlined"
      color="info"
      {...other}
    >
      {children}
    </StyledInfoButton>
  )
};

export function OutlinedLogoGreenButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledLogoGreenButton = styled(Button)(() => ({
    ":hover": {
      color: "#81AA22"
    }
  }));
  return (
    <StyledLogoGreenButton
      variant="outlined"
      color="logogreen"
      {...other}
    >
      {children}
    </StyledLogoGreenButton>
  )
};

export function OutlinedSolidBlackButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSolidBlackButton = styled(Button)(() => ({
    ":hover": {
      color: "#262626"
    }
  }));
  return (
    <StyledSolidBlackButton
      variant="outlined"
      color="solidblack"
      {...other}
    >
      {children}
    </StyledSolidBlackButton>
  )
};

