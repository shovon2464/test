import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { Field } from "formik";
import { ErrorMessageWrapper } from "../form_components/ErrorMessageWrapper";

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: unknown;
  error?: unknown;
  hidden?: boolean;
}

export const FieldWrapper: React.FC<FormikFieldProps> = (props) => {
  const {
    name,
    label,
    type = "text",
    required = true,
    hidden = false,
    onChange,
  } = props;
  return (
    <div>
      <Field
        required={required}
        as={TextField}
        label={label}
        name={name}
        fullWidth
        type={type}
        hidden={hidden}
        helperText={<ErrorMessageWrapper name={name} />}
      />
    </div>
  );
};
