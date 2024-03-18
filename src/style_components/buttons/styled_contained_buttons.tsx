import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { ButtonProps } from "./styled_outlined_buttons";

// export const ContainedPrimaryButton = styled(Button)(() => ({
//   backgroundColor: "#57413A",
//   color: "#FFF",
//   border: "2px solid #57413A",
//   padding: "5px 15px",
//   ":hover": {
//     backgroundColor: "#2E221F",
//     border: "2px solid #2E221F",
//   },
//   ":disabled": {
//     backgroundColor: "transparent",
//     border: "2px solid #00000042"
//   }
// }));

export function ContainedPrimaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledPrimaryButton = styled(Button)(() => ({
    border: "1px solid #57413A",
    ":hover": {
      backgroundColor: "#2E221F",
      border: "1px solid #2E221F",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledPrimaryButton
      variant="contained"
      color="primary"
      {...other}
    >
      {children}
    </StyledPrimaryButton>
  )
};

export function ContainedSecondaryButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSecondaryButton = styled(Button)(() => ({
    border: "1px solid #A69282",
    ":hover": {
      backgroundColor: "#86715F",
      border: "1px solid #86715F",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledSecondaryButton
      variant="contained"
      color="secondary"
      {...other}
    >
      {children}
    </StyledSecondaryButton>
  )
};

export function ContainedSuccessButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSuccessButton = styled(Button)(() => ({
    border: "1px solid #1A4D2E",
    ":hover": {
      backgroundColor: "#143923",
      border: "1px solid #143923",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledSuccessButton
      variant="contained"
      color="success"
      {...other}
    >
      {children}
    </StyledSuccessButton>
  )
};

export function ContainedErrorButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledErrorButton = styled(Button)(() => ({
    border: "1px solid #853037",
    ":hover": {
      backgroundColor: "#BB444E",
      border: "1px solid #BB444E",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledErrorButton
      variant="contained"
      color="error"
      {...other}
    >
      {children}
    </StyledErrorButton>
  )
};

export function ContainedWarningButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledWarningButton = styled(Button)(() => ({
    border: "1px solid #FF9F29",
    ":hover": {
      backgroundColor: "#E67E00",
      border: "1px solid #E67E00",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledWarningButton
      variant="contained"
      color="warning"
      {...other}
    >
      {children}
    </StyledWarningButton>
  )
};

export function ContainedInfoButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledWarningButton = styled(Button)(() => ({
    color: "#57413A",
    border: "1px solid #F7EDD4",
    ":hover": {
      backgroundColor: "#F3E4BE",
      border: "1px solid #F3E4BE",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledWarningButton
      variant="contained"
      color="info"
      {...other}
    >
      {children}
    </StyledWarningButton>
  )
};

export function ContainedLogoGreenButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledLogoGreenButton = styled(Button)(() => ({
    border: "1px solid #A0D229",
    ":hover": {
      backgroundColor: "#81AA22",
      border: "1px solid #81AA22",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledLogoGreenButton
      variant="contained"
      color="logogreen"
      {...other}
    >
      {children}
    </StyledLogoGreenButton>
  )
};

export function ContainedSolidBlackButton(props: ButtonProps) {
  const { children, ...other } = props;
  const StyledSolidBlackButton = styled(Button)(() => ({
    border: "1px solid #000",
    ":hover": {
      backgroundColor: "#262626",
      border: "1px solid #262626",
    },
    ":disabled": {
      backgroundColor: "transparent",
      border: "2px solid #00000042"
    }
  }));
  return (
    <StyledSolidBlackButton
      variant="contained"
      color="solidblack"
      {...other}
    >
      {children}
    </StyledSolidBlackButton>
  )
};

