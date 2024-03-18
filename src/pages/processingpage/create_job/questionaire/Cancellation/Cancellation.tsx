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

export interface TCancellation {
  insuranceCompany: string;
  insuredFullName: string;
  insuredAddress: string;
  postalCode: string;
  insuredUsage: string;
  cancellationDate: string;
  remarks: string;
}

const CancellationFields = (isCancellationType?: boolean) => {
  const [cancellationValues, setCancellationValue] = useState<TCancellation>({
    insuranceCompany: "",
    insuredAddress: "",
    insuredFullName: "",
    insuredUsage: "",
    cancellationDate: "",
    postalCode: "",
    remarks: "",
  });
  useEffect(() => {
    if (!isCancellationType) {
      setCancellationValue({
        insuranceCompany: "",
        insuredAddress: "",
        insuredFullName: "",
        insuredUsage: "",
        cancellationDate: "",
        postalCode: "",
        remarks: "",
      });
    }
    return () => {
      setCancellationValue({
        insuranceCompany: "",
        insuredAddress: "",
        insuredFullName: "",
        insuredUsage: "",
        cancellationDate: "",
        postalCode: "",
        remarks: "",
      });
    };
  }, [isCancellationType]);
  const handleCancellationChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    setCancellationValue({
      ...cancellationValues,
      [String(event.target.name)]: event.target.value,
    });
  };
  return {
    cancellationValues,
    renderCancellationFields: isCancellationType ? (
      <>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Cancellation Information
        </Typography>
        {Object.entries(cancellationValues).map((value) => {
          let labelName: string = "";
          switch (value[0]) {
            case "insuranceCompany":
              labelName = "Insurance Company";
              break;
            case "insuredAddress":
              labelName = "Insured Address";
              break;
            case "insuredFullName":
              labelName = "Insured Full Name";
              break;
            case "postalCode":
              labelName = "Postal Code";
              break;
            case "remarks":
              labelName = "Remarks";
              break;
          }
          if (value[0] === "insuredUsage") {
            return (
              <FormControl fullWidth sx={{ marginBottom: 0.5 }}>
                <InputLabel id="cancellation-usage-type-select-label">
                  Usage Type
                </InputLabel>
                <Select
                  labelId="cancellation-usage-type-select-label"
                  value={value[1] ? value[1].toString() : ""}
                  onChange={handleCancellationChange}
                  name={value[0]}
                >
                  <MenuItem value={"personal"}>Personal</MenuItem>
                  <MenuItem value={"commercial"}>Commercial</MenuItem>
                </Select>
              </FormControl>
            );
          }
          if (value[0] === "cancellationDate") {
            return (
              <FieldWrapperWithMount
                name="cancellationDate"
                value={value[1] ? value[1].toString() : ""}
                onChange={handleCancellationChange}
                type="date"
                label="Cancellation Date"
                required={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
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
              onChange={handleCancellationChange}
            />
          );
        })}
      </>
    ) : (
      <></>
    ),
  };
};

export default CancellationFields;
