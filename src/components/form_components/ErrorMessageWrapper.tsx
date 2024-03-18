import React from "react";
import { ErrorMessage } from "formik";

interface FormikErrorMessageProps {
  name: string;
}

export const ErrorMessageWrapper: React.FC<FormikErrorMessageProps> = ({
  name,
}) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
    </ErrorMessage>
  );
};
