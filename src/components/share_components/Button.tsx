import React from "react";
import { Button, ButtonProps } from "@mui/material";

const ButtonWrapper: React.FC = () => {
  const configButton: ButtonProps = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };
  return <Button {...configButton}></Button>;
};

export default ButtonWrapper;
