import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  retrieveQuotesPdfCoordinatesList,
  retrieveEachQuotePdfCoordinates,
} from "../../../../action_creators/tools/quote_pdf_coordinates/quote_pdf_coordinates";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const QuotePdfInfoDropDownSearch: React.FC = () => {
  const [quotePdfId, setQuotePdfId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const quotePdfInfoList = useAppSelector(
    (state) => state.quotePdfCoordinates.quotePdfCoordinates
  );

  const handleSelectChange = (event: SelectChangeEvent) => {
    setQuotePdfId(event.target.value);
  };
  const handleSearchOnClick = () => {
    setLoading(true);
    dispatch(retrieveEachQuotePdfCoordinates(quotePdfId))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="quote-pdf-file-selection">
          Quote PDF File Selection
        </InputLabel>
        <Select
          labelId="quote-pdf-drop-down"
          id="quote-pdf-drop-down-id"
          value={quotePdfId}
          onChange={handleSelectChange}
          autoWidth
          label="Quote PDF File Selection"
        >
          {quotePdfInfoList.length > 0 &&
            quotePdfInfoList.map((value) => {
              return (
                <MenuItem value={value.QuotePDF_Id}>
                  {value.QuotePDF_Name}
                </MenuItem>
              );
            })}
        </Select>
        <Button
          variant="text"
          onClick={handleSearchOnClick}
          disabled={quotePdfId ? false : true}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </FormControl>
    </div>
  );
};

export default QuotePdfInfoDropDownSearch;
