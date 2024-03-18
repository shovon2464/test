import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  retrieveAllPerformanceRecordsByUserId,
  IUserPerformanceResponse,
} from "../../../action_creators/performance_report/user_performance";
import { retrieveUsersList } from "../../../action_creators/task/user/user_list";
import { getBrokerUserName } from "../../../services/auth/getKey";
import { useNavigate } from "react-router-dom";
import {
  getAllPerformanceRecordsByDate,
  getLoggedInUserPerformanceRecords,
} from "../../../helpers/PerformanceDataHelper";
import Paper from "@mui/material/Paper";
import { EventTracker, Stack } from "@devexpress/dx-react-chart";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Button, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../../style_components/processingpages/performanceReport.css";

const LoggedInUserPerformanceReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const user_name = getBrokerUserName();
  let history = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const retrieveUserRecords = useAppSelector(
    (state) => state.performanceReportList.eachUserPerformanceRecords
  );
  const userList = useAppSelector((state) => state.userList.users);
  const [userCharData, setUserCharData] = useState<IUserPerformanceResponse[]>(
    []
  );

  useEffect(() => {
    dispatch(retrieveUsersList({})).catch((e) => {
      console.log(e);
      window.alert(e);
      history("/Dashboard");
    });
  }, []);

  useEffect(() => {
    if (userList.length > 0 && user_name) {
      const index = userList.findIndex(
        ({ username }) => username === user_name
      );
      const user_id = userList[index].user_id;
      dispatch(retrieveAllPerformanceRecordsByUserId(user_id));
    }
  }, [userList]);

  useEffect(() => {
    if (retrieveUserRecords.length > 0) {
      const result = getLoggedInUserPerformanceRecords(retrieveUserRecords);
      setUserCharData(result);
    }
  }, [retrieveUserRecords]);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSearchOnClick = () => {
    if (startDate && endDate && retrieveUserRecords) {
      const filteredResult = getAllPerformanceRecordsByDate(
        retrieveUserRecords,
        new Date(startDate),
        new Date(endDate)
      );
      let result = getLoggedInUserPerformanceRecords(filteredResult);
      setUserCharData(result);
    }
  };

  return (
    <>
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
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* <Stack direction="row" spacing={10}>
        <Paper variant="outlined">
          <Chart data={userCharData}>
            <ValueAxis />
            <ArgumentAxis />
            <BarSeries
              valueField="TotalCompletedTasks"
              argumentField="UserName"
            />
            <Title text="Total Completed Tasks" />
            <Tooltip />
            <Animation />
          </Chart>
        </Paper>
        <Paper variant="outlined">
          <Chart data={userCharData}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField="AvgCost"
              argumentField="UserName"
              color="Orange"
            />
            <Title text="Tasks Cost Average Time (Days)" />
            <Tooltip />
            <Animation />
          </Chart>
        </Paper>
      </Stack> */}
      <div className="reportContainer">
        <Paper variant="outlined">
          <Chart data={userCharData} rotated>
            <ValueAxis />
            <ArgumentAxis />
            <BarSeries
              name="Total completed Tasks"
              valueField="TotalCompletedTasks"
              argumentField="UserName"
              color="#B4DD55"
              barWidth={0.3}
            />
            <BarSeries
              name="Averge task cost time in days"
              valueField="AvgCost"
              argumentField="UserName"
              color="#A69282"
              barWidth={0.3}
            />
            <Animation />
            <Title text="Performance report" />
            <Legend position="bottom" />
            <Stack />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
      </div>
    </>
  );
};

export default LoggedInUserPerformanceReport;
