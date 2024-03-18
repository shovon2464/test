import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import { ErrorMessageWrapper } from "../form_components/ErrorMessageWrapper";


interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value?: any;
  onChange?: unknown;
  error?: unknown;
  hidden?: boolean;
  InputProps?: any;
}

export const FieldWrapperWithMount: React.FC<FormikFieldProps> = (props) => {
  const { name, label, type = "text", required = true, hidden = false , InputProps} = props;

    return (
        <div>
            <Field
                required={required}
                as={TextField}
                label={label}
                name={name}
                fullWidth
                type={type}
                value={props.value}
                onChange={props.onChange}
                hidden={hidden}
                InputProps={InputProps}
                helperText={<ErrorMessageWrapper name={name} />}
            />
        </div>
    );


};
