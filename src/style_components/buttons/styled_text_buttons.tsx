import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { ButtonProps } from "./styled_outlined_buttons";

// export const TextPrimaryButton = styled(Button)(() => ({
//   color: "#57413A",
//   ":hover": {
//     color: "#2E221F",
//   }
// }));

export function TextPrimaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledPrimaryButton = styled(Button)(() => ({
      ":hover": {
        color: "#2E221F"
      }
    }));
  return (
    <StyledPrimaryButton
      variant="text"
      color="primary"
      {...other}
    >
      {children}
    </StyledPrimaryButton>
  )
};

export function TextSecondaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSecondaryButton = styled(Button)(() => ({
      ":hover": {
        color: "#86715F"
      }
    }));
  return (
    <StyledSecondaryButton
      variant="text"
      color="secondary"
      {...other}
    >
      {children}
    </StyledSecondaryButton>
  )
};

export function TextSuccessButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSuccessButton = styled(Button)(() => ({
      ":hover": {
        color: "#143923"
      }
    }));
  return (
    <StyledSuccessButton
      variant="text"
      color="success"
      {...other}
    >
      {children}
    </StyledSuccessButton>
  )
};

export function TextErrorButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledErrorButton = styled(Button)(() => ({
      ":hover": {
        color: "#BB444E"
      }
    }));
  return (
    <StyledErrorButton
      variant="text"
      color="error"
      {...other}
    >
      {children}
    </StyledErrorButton>
  )
};

export function TextWarningButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledWarningButton = styled(Button)(() => ({
      ":hover": {
        color: "#E67E00"
      }
    }));
  return (
    <StyledWarningButton
      variant="text"
      color="warning"
      {...other}
    >
      {children}
    </StyledWarningButton>
  )
};

export function TextInfoButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledInfoButton = styled(Button)(() => ({
      ":hover": {
        color: "#F3E4BE",
        background: "none"
      }
    }));
  return (
    <StyledInfoButton
      variant="text"
      color="info"
      {...other}
    >
      {children}
    </StyledInfoButton>
  )
};

export function TextLogoGreenButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledLogoGreenButton = styled(Button)(() => ({
      ":hover": {
        color: "#81AA22"
      }
    }));
  return (
    <StyledLogoGreenButton
      variant="text"
      color="logogreen"
      {...other}
    >
      {children}
    </StyledLogoGreenButton>
  )
};

export function TextSolidBlackButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSolidBlackButton = styled(Button)(() => ({
      ":hover": {
        color: "#262626"
      }
    }));
  return (
    <StyledSolidBlackButton
      variant="text"
      color="solidblack"
      {...other}
    >
      {children}
    </StyledSolidBlackButton>
  )
};

