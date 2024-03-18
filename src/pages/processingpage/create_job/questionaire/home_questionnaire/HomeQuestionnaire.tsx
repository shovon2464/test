import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

const HomeQuestionnaire = (isHomeJobType?: boolean | undefined) => {
  const [hAddress, setHAddress] = useState("");
  const [hBuiltYear, setHBuiltYear] = useState<number | null>(null);
  const [hTankYear, setHTankYear] = useState<number | null>(null);
  const [hRoofingYear, setHRoofingYear] = useState<number | null>(null);
  const [hSize, setHSize] = useState("");
  const [hBathrooms, setHBathrooms] = useState("");
  const [hFinishedBasement, setHFinishedBasement] = useState<boolean | null>(
    null
  );
  const [hClaims, setHClaims] = useState<boolean | null>(null);
  const [hNumMortgages, setHNumMortgages] = useState<number | null>(null);
  const [hComment, setHComment] = useState("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHAddress(event.target.value);
  };
  const handleBuiltYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHBuiltYear(parseInt(event.target.value));
  };
  const handleTankYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHTankYear(parseInt(event.target.value));
  };
  const handleRoofingYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHRoofingYear(parseInt(event.target.value));
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHSize(event.target.value);
  };
  const handleBathroomsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHBathrooms(event.target.value);
  };
  const handleBasementChange = (event: SelectChangeEvent) => {
    setHFinishedBasement(Boolean(event.target.value));
  };
  const handleClaimsChange = (event: SelectChangeEvent) => {
    setHClaims(Boolean(event.target.value));
  };
  const handleNumMortgagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHNumMortgages(parseInt(event.target.value));
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHComment(event.target.value);
  };

  return {
    hAddress,
    hBuiltYear,
    hTankYear,
    hRoofingYear,
    hSize,
    hBathrooms,
    hFinishedBasement,
    hClaims,
    hNumMortgages,
    hComment,
    renderHouseFields: isHomeJobType ? (
      <>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          House Information
        </Typography>
        <TextField
          label="House Address"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleAddressChange}
        ></TextField>
        <TextField
          type="number"
          label="Built Year"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleBuiltYearChange}
        ></TextField>
        <TextField
          type="number"
          label="Hot Water Tank Year"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleTankYearChange}
        ></TextField>
        <TextField
          type="number"
          label="Roofing Year"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleRoofingYearChange}
        ></TextField>
        <TextField
          label="Size"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleSizeChange}
        ></TextField>
        <TextField
          label="Bathrooms"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleBathroomsChange}
        ></TextField>
        <TextField
          type="number"
          label="Number Year Mortgages"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          onChange={handleNumMortgagesChange}
        ></TextField>
        <FormControl fullWidth sx={{ marginBottom: 0.5 }}>
          <InputLabel id="finished-basement-select-label">
            Finished Basement
          </InputLabel>
          <Select
            labelId="finished-basement-select-label"
            label="Finished Basement"
            value={hFinishedBasement ? hFinishedBasement.toString() : ""}
            onChange={handleBasementChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 0.5 }}>
          <InputLabel id="house-claim-select-label">Claims</InputLabel>
          <Select
            labelId="house-claim-select-label"
            label="Claims"
            value={hClaims ? hClaims.toString() : ""}
            onChange={handleClaimsChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Comments"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 0.5 }}
          required
          fullWidth
          multiline
          onChange={handleCommentChange}
        ></TextField>
      </>
    ) : (
      <></>
    ),
  };
};

export default HomeQuestionnaire;
