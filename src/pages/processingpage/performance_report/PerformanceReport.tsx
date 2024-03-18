import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Paper from "@mui/material/Paper";
import { EventTracker, Stack } from "@devexpress/dx-react-chart";
import { Grid, styled } from "@material-ui/core";
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
import { IPerformanceDiagramAvgCount } from "../../../interfaces/performance_report/IPerformanceDiagramAvgCount";
import { findAllPerformanceKpiWithAvgTimeCount } from "../../../services/performance_report/performance_diagram_data";
import {
  retrieveAllPerformanceRecords,
  IUserPerformanceResponse,
} from "../../../action_creators/performance_report/user_performance";
import {
  groupTotalCompletedTaskRecordsByUserName,
  getTotalAndAvgTaskCostTimeByUserName,
} from "../../../helpers/PerformanceDataHelper";
import PerformanceReportSearchByDate from "./PerformanceReportSearchByDate";
import "../../../style_components/processingpages/performanceReport.css";
import { Button } from "@mui/material";

const PerformanceReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const retrieveAllRecords = useAppSelector(
    (state) => state.performanceReportList.performanceRecords
  );
  const [charData, setCharData] = React.useState<IPerformanceDiagramAvgCount[]>(
    []
  );
  const [frontEndCharData, setFrontEndCharData] = useState<
    IUserPerformanceResponse[]
  >([]);
  const [num, setNum] = React.useState(0);

  const getDiagramDate = async () => {
    await findAllPerformanceKpiWithAvgTimeCount()
      .then((res) => {
        setCharData(res.data.getAvgCountNameKPIsData);
      })
      .catch((e) => {
        const message: string =
          (e.response && e.response.data && e.response.data.message) ||
          e.message ||
          e.response.errors ||
          e.toString();
        console.log(message);
        window.alert(message);
      });
  };

  useEffect(() => {
    getDiagramDate();
    dispatch(retrieveAllPerformanceRecords({}));
  }, []);

  useEffect(() => {
    if (retrieveAllRecords.length) {
      const recordsGroupByUserNameResult =
        groupTotalCompletedTaskRecordsByUserName(retrieveAllRecords);
      

      let AvgCostTimeResult = getTotalAndAvgTaskCostTimeByUserName(
        recordsGroupByUserNameResult
      );
      setFrontEndCharData(AvgCostTimeResult);
      const numOfUsers = Object.keys(recordsGroupByUserNameResult).length;
      setNum(numOfUsers);
      console.log(num);
    }
  }, [retrieveAllRecords]);

  return (
    <div>
      <div>
        <PerformanceReportSearchByDate
          performanceRecordsState={[frontEndCharData, setFrontEndCharData]}
        />
      </div>
      <div className="reportContainer">
        <Paper variant="outlined">
          <Chart data={frontEndCharData} rotated height={500 + num * 30}>

            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              name="Total Complete Tasks"
              valueField="TotalCompletedTasks"
              argumentField="UserName"
              color="#B4DD55"
              barWidth={0.8}
            />
            <BarSeries
              name="Average Task Completion Time (in days)"
              valueField="AvgCost"
              argumentField="UserName"
              color="#A69282"
              barWidth={0.8}
            />
            <Animation />
            <Title text="Performance report" />
            <Legend position="bottom" />
            <EventTracker />
            <Tooltip />
            <Stack />
          </Chart>
        </Paper>

        {/* <Grid container className="barchartContainer" spacing={3}>
          <Grid item className="barchart" lg={6} sm={12} xs={12}>
            <Paper variant="outlined">
              <Chart data={frontEndCharData}>
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                  valueField="TotalCompletedTasks"
                  argumentField="UserName"
                />
                <Title text="Total Completed Tasks" />
                <Tooltip />
                <Animation />
              </Chart>
            </Paper>
          </Grid>
          <Grid item className="barchart" lg={6} sm={12} xs={12}>
            <Paper variant="outlined">
              <Chart data={frontEndCharData}>
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                  valueField="AvgCost"
                  argumentField="UserName"
                  color="Orange"
                />
                <Title text="Tasks Cost Average Time (Hours)" />
                <Tooltip />
                <Animation />
              </Chart>
            </Paper>
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
};

export default PerformanceReport;
