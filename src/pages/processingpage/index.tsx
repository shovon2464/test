import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Outlet } from "react-router-dom";
import MiniDrawer from "./Sidebar";
import { AuthProvider } from "../../context/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../style_components/global_theme_provider";
import { TicketConsole } from "./ticket_console/TicketConsole";
import { fetchAndSaveWebQuotesListIntoDB } from "../../action_creators/quote/quote_list";
import { retrieveFileStatus } from "../../action_creators/tools/sync_esign/sync_esign";
import { getTaskDaysInfo } from "../../action_creators/tools/auto_delete/auto_delete";
import {
  ITaskListResponse,
  deleteTask,
  retrieveTasksList,
} from "../../action_creators/task/task_list";
import { dateDiffInDays, timeDiff } from "../../helpers/TimeDiffHelper";
import { retrieveUsersList } from "../../action_creators/task/user/user_list";
import {
  IUserPerformanceRequest,
  createAPerformanceRecord,
} from "../../action_creators/performance_report/user_performance";
import { sendDeletedDetail } from "../../services/tools/auto_delete/auto_delete";

const usePrevious = (value: any) => {
  const ref = React.useRef(null);
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

const Processing_Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const isBigScreen = useMediaQuery("(min-width: 960px)");
  const prevBigScreen = usePrevious(isBigScreen);
  useEffect(() => {
    dispatch(fetchAndSaveWebQuotesListIntoDB({}));
    dispatch(retrieveFileStatus({}));
    dispatch(retrieveTasksList({}));
    dispatch(getTaskDaysInfo({}));
    dispatch(retrieveUsersList({}));
  }, []);
  React.useEffect(() => {
    if (isBigScreen !== prevBigScreen && isBigScreen !== open) {
      setOpen((prev) => !prev);
    }
  }, [isBigScreen, prevBigScreen, open]);

  const connectionStatus = useAppSelector(
    (state) => state.syncEsign.connection
  );

  // auto delete active
  const [taskDeleteList, setTaskDeleteList] = React.useState<
    ITaskListResponse[]
  >([]);
  const auto_delete_status = useAppSelector((state) => state.autoDelete.infos);
  const task_list = useAppSelector((state) => state.taskList.tasks);
  const userList = useAppSelector((state) => state.userList.users);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (auto_delete_status[0] != undefined) {
      const delete_days = auto_delete_status[0].delete_days;
      const status = auto_delete_status[0].active;
      if (status === true) {
        let initialDeleteList: ITaskListResponse[] = [];
        if (task_list != undefined && task_list.length > 0) {
          let initialDeleteList: ITaskListResponse[] = [];
          task_list.forEach(async (value) => {
            const noUpdateTasks = { ...value };
            const createdDate = new Date(noUpdateTasks.Create_Date);
            if (dateDiffInDays(createdDate) > delete_days) {
              initialDeleteList.push(noUpdateTasks);
            }
          });
          setTaskDeleteList(initialDeleteList);
        }
      }
    }
  }, [auto_delete_status, task_list]);

  useEffect(() => {
    if (taskDeleteList.length > 0 && !emailSent) {
      taskDeleteList.forEach((task) => {
        if (task.Task_Status === "COMPLETE") {
          let username: string = "";
          let closeDate: Date = task.Close_Date
            ? new Date(task.Close_Date)
            : new Date();
          if (userList) {
            const index = userList.findIndex(
              (user) => user.user_id === task.Assign_To
            );
            if (userList[index] != undefined) {
              username = userList[index].name;
            }
          }
          const costTimeHours = timeDiff(new Date(task.Create_Date), closeDate);
          const performanceInfo: IUserPerformanceRequest = {
            Job_Close_Date: closeDate,
            user_id: task.Assign_To,
            Job_Type: task.Job_Type_Name,
            Job_Sub_Type: task.Job_Sub_Type_Name,
            Phone_Number: task.CRM_Client_Phone ? task.CRM_Client_Phone : "",
            UserName: username,
            Cost_Time: costTimeHours,
          };
          dispatch(createAPerformanceRecord(performanceInfo))
            .unwrap()
            .then(() => {
              dispatch(deleteTask(task.Task_Id));
            });
          setEmailSent(true);
        } else {
          dispatch(deleteTask(task.Task_Id));
          setEmailSent(true);
        }
      });
      sendEmail();
    }
  }, [taskDeleteList, emailSent]);

  const sendEmail = async () => {
    const msg = generateMsg();
    try {
      await sendDeletedDetail(msg, auto_delete_status[0].target_email).catch(
        (err) => {
          throw Error(err);
        }
      );
    } catch (err) {
      throw Error("Something goes wrong when sending email");
    }
  };

  const generateMsg = () => {
    let msg = "";
    taskDeleteList.forEach((task) => {
      msg += task.Policy_Number;
      msg += ",";
      msg += task.CRM_Client_Name;
      msg += ",";
      msg += task.Task_Description;
      msg += ",";
      msg += task.Job_Type_Name;
      msg += ",";
      msg += task.Task_Files;
      msg += ",";
      msg += task.Create_Date;
      msg += ";";
    });
    return msg;
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <section className={`${open ? "container open" : "container close"}`}>
          <MiniDrawer open={open} setOpen={setOpen} />
          <div
            className={`page-container page-container-${
              open ? "open" : "close"
            }`}
          >
            <AuthProvider>
              <Outlet />
            </AuthProvider>
            <TicketConsole />
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

export default Processing_Page;
