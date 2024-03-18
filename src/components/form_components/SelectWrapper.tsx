import React from "react";
import { Field } from "formik";
import { MenuItem, TextField } from "@mui/material";
import { ErrorMessageWrapper } from "./ErrorMessageWrapper";

export interface SelectOption {
    value: string
    name: string
}

interface FormikSelectFieldProps {
    name: string;
    label: string;
    options: SelectOption[];
    type?: string;
    required?: boolean;
    value?: string;
    onChange?: unknown;
    error?: unknown;
    hidden?: boolean;
}


export const SelectFieldWrapper: React.FC<FormikSelectFieldProps> = (props) => {
    const { name, label, options, type = "select", required = true, hidden = false } = props;
    if (props.onChange) {
        return (
            <div>
                <Field
                    as={TextField}
                    required={required}
                    name={name}
                    type={type}
                    fullWidth
                    select
                    onChange={props.onChange}
                    label={label}
                    hidden={hidden}
                    helperText={
                        <ErrorMessageWrapper name={name} />
                    }
                >
                    <MenuItem key={""} value={""}>
                        No Selected
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Field>
            </div>
        );
    } else {
        return (
            <div>
                <Field
                    as={TextField}
                    required={required}
                    name={name}
                    type={type}
                    fullWidth
                    select
                    label={label}
                    helperText={
                        <ErrorMessageWrapper name={name} />
                    }
                >
                    <MenuItem key={""} value={""}>
                        No Selected
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Field>
            </div>
        );
    }
}
