import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAllPerformanceRecordsByDate,
  groupTotalCompletedTaskRecordsByUserName,
  getTotalAndAvgTaskCostTimeByUserName,
} from "../../../helpers/PerformanceDataHelper";
import { IUserPerformanceResponse } from "../../../action_creators/performance_report/user_performance";
import "../../../style_components/processingpages/performanceReport.css";

interface IPerformanceSearchProps {
  performanceRecordsState: [
    IUserPerformanceResponse[],
    React.Dispatch<React.SetStateAction<IUserPerformanceResponse[]>>
  ];
}

const PerformanceReportSearchByDate: React.FC<IPerformanceSearchProps> = ({
  performanceRecordsState: [frontEndCharData, setFrontEndCharData],
}) => {
  const retrievePerformanceData = useAppSelector(
    (state) => state.performanceReportList.performanceRecords
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSearchOnClick = () => {
    if (startDate && endDate && retrievePerformanceData) {
      const filteredResult = getAllPerformanceRecordsByDate(
        retrievePerformanceData,
        new Date(startDate),
        new Date(endDate)
      );
      const recordsGroupByUserNameResult =
        groupTotalCompletedTaskRecordsByUserName(filteredResult);
      let AvgCostTimeResult = getTotalAndAvgTaskCostTimeByUserName(
        recordsGroupByUserNameResult
      );
      setFrontEndCharData(AvgCostTimeResult);
    }
  };

  return (
    <Grid className="dateContainer" container spacing={3}>
      <Grid item lg={4} sm={12} xs={12}>
        <TextField
          className="searchDate"
          id="performance_record_start_date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item lg={4} sm={12} xs={12}>
        <TextField
          className="searchDate"
          id="performance_record_end_date"
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item lg={4} sm={12} xs={12}>
        <Button
          variant="text"
          onClick={handleSearchOnClick}
          disabled={startDate && endDate ? false : true}
          startIcon={<SearchIcon />}
          color="success"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default PerformanceReportSearchByDate;
