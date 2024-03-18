import {
FormControl,
InputAdornment,
InputLabel,
MenuItem,
Select,
SelectChangeEvent,
TextField,
Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldWrapperWithMount } from "../../../../../components/form_components/FieldWrapperWithMount";

export interface TPropertyChange {
insuranceCompany: string;
insurancePolicyNumber: string;
insuredFullName: string;
insuredAddress: string;
postalCode: string;
effectiveDate: string;
remarks: string;
}

const PropertyChangeFields = (isPropertyChangeType?: boolean) => {
const [propertyChangeValue, setPropertyChangeValue] = useState<TPropertyChange>({
    insuranceCompany: "",
    insurancePolicyNumber: "",
    insuredFullName: "",
    insuredAddress: "",
    postalCode: "",
    effectiveDate: "",
    remarks: "",
});
useEffect(() => {
    if (!isPropertyChangeType) {
    setPropertyChangeValue({
        insuranceCompany: "",
        insurancePolicyNumber: "",
        insuredFullName: "",
        insuredAddress: "",
        postalCode: "",
        effectiveDate: "",
        remarks: "",
    });
    }
    return () => {
    setPropertyChangeValue({
        insuranceCompany: "",
        insurancePolicyNumber: "",
        insuredFullName: "",
        insuredAddress: "",
        postalCode: "",
        effectiveDate: "",
        remarks: "",
    });
    };
}, [isPropertyChangeType]);
const handlePropertyChangeChange = (
    event:
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent
) => {
    setPropertyChangeValue({
    ...propertyChangeValue,
    [String(event.target.name)]: event.target.value,
    });
};
return {
    propertyChangeValue,
    renderPropertyChangeFields: isPropertyChangeType ? (
    <>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Change Information
        </Typography>
        {Object.entries(propertyChangeValue).map((value) => {
        let labelName: string = "";
        switch (value[0]) {
            case "insuranceCompany":
            labelName = "Insurance Company";
            break;
            case "insurancePolicyNumber":
            labelName = "Insurance Policy Number";
            break;
            case "insuredFullName":
            labelName = "Insured Full Name";
            break;
            case "insuredAddress":
            labelName = "Insured Address";
            break;
            case "postalCode":
            labelName = "Postal Code";
            break;
        }
        if (value[0] === "effectiveDate") {
            return (
            <FieldWrapperWithMount
                name="effectiveDate"
                value={value[1] ? value[1].toString() : ""}
                onChange={handlePropertyChangeChange}
                type="date"
                label="Effective Date"
                required={false}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                ),
                }}
            />
            );
        }
        if (value[0] === "remarks") {
            return (
                <TextField
                name={value[0]}
                value={value[1]}
                label="Remarks"
                variant="outlined"
                color="primary"
                sx={{ marginBottom: 0.5 }}
                required
                fullWidth
                multiline
                onChange={handlePropertyChangeChange}
                />
            );
        }
        return (
            <TextField
            name={value[0]}
            value={value[1]}
            label={labelName}
            variant="outlined"
            color="primary"
            sx={{ marginBottom: 0.5 }}
            required
            fullWidth
            onChange={handlePropertyChangeChange}
            />
        );
        })}
    </>
    ) : (
    <></>
    ),
};
};

export default PropertyChangeFields;
