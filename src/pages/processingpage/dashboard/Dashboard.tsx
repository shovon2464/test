import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { getAllTaskStatusAmount } from "../../../services/dashboard/taskStatus";
import { useEffect } from "react";
import "../../../style_components/processingpages/dashboard/dashboard_style.css";

const Dashboard: React.FC = () => {
  const data = [
    { TaskStatus: "In Progress", Amount: 1 },
    { TaskStatus: "Follow Up", Amount: 3 },
    { TaskStatus: "Complete", Amount: 2 },
  ];

  const [taskStatusData, setTaskStatusData] = React.useState<any[]>([]);
  const getTaskStatus = async () => {
    try {
      const response = await getAllTaskStatusAmount();
      // console.log(response);
      setTaskStatusData([
        {
          TaskStatus: "In Progress",
          Amount: response.data.checkTaskStatus.InProgress,
        },
        {
          TaskStatus: "Follow Up",
          Amount: response.data.checkTaskStatus.FollowUp,
        },
        {
          TaskStatus: "Complete",
          Amount: response.data.checkTaskStatus.Complete,
        },
      ]);
      console.log(setTaskStatusData);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  useEffect(() => {
    getTaskStatus();
  }, []);

  // const {data: chartData} = this.state;

  return (
    <div className="taskAmountBar">
      <Paper variant="outlined">
        <Chart data={taskStatusData}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="Amount" argumentField="TaskStatus" color="#7A5B52" barWidth={0.3}/>
          <Title text="Task Amount" />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    </div>
  );
};

export default Dashboard;