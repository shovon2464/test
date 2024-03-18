import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate } from "react-router-dom";
import { retrieveTasksList } from "../../../../action_creators/task/task_list";
import { ITaskListTable } from "../../../../interfaces/task/ITaskListTable";
import { ITaskListJobTypeSubTypeResponse } from "../../../../action_creators/task/task_list";
import EventBus from "../../../../app/EventBus";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@mui/x-data-grid";
import UserDropDown from "../UserList/UserDropDownList";
import ClientContact from "../ClientContact/ClientContact";
import AutoAssign from "../AutoAssign/AutoAssign";
import TaskDeleteAll from "../TaskDeleteAll/DeleteAll";
import TaskUpdatesCheck from "../TaskUpdatesCheck/TaskUpdatesCheck";
import TaskNote, { TaskNoteOpenHandle } from "../TaskNote/TaskNote";
import TaskAction from "../TaskAction/TaskStatusDropDown";
import { IconButton, Link, Tooltip, Button, Badge } from "@mui/material";
import { TextSolidBlackButton } from "../../../../style_components/buttons/styled_text_buttons";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HomeIcon from "@mui/icons-material/Home";
import { retrieveVehicleInfoByVehicleId } from "../../../../action_creators/task/vehicle_info/vehicle_info";
import { retrieveDriversInfoByVehicleId } from "../../../../action_creators/task/driver_info/driver_info";
import { retrieveHomeInfoByHomeId } from "../../../../action_creators/questionnaire/home_info/home_info";
import AutoInfo, { OpenHandle } from "../AutoInfo/AutoInfo";
import TaskFiles, { ToggleHandle } from "../TaskFiles/TaskFiles";
import { retrieveTaskFilesByTaskId } from "../.././../../action_creators/task/task_files/task_files";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { retrieveTaskNotesByTaskId } from "../../../../action_creators/task/task_notes/task_notes";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import LensIcon from "@mui/icons-material/Lens";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { CRM_Policy_Search_URL } from "../../../../app/endpoint";
import TaskQuotesDetail from "../TaskQuotesDetail/TaskQuotesDetail";
import HomeInfo, { HandleHomeOpen } from "../HomeInfo/HomeInfo";
import JobTypeSubType, {
  HandleJobTypeSubTypeOpen,
} from "../TaskJobTypeSubType/TaskJobTypeSubType";
import useAuth from "../../../../context/useAuth";
import DeleteAll from "../TaskDeleteAll/DeleteAll";
import { getTaskDaysInfo } from "../../../../action_creators/tools/auto_delete/auto_delete";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { getUserRole } from "../../../../services/auth/getKey";
import SyncEsign from "../SyncEsign/SyncEsign";
import { retrieveFileStatus } from "../../../../action_creators/tools/sync_esign/sync_esign";
import UpdatePolicyButton from "../TaskAction/PolicyUpdateButton";
import TaskEdocSwitch, {
  HandleEdocSwitchOpen,
} from "../TaskJobTypeSubType/TaskEdocSwitch";
import { retrieveJobTypesList } from "../../../../action_creators/task/job_type/job_type";
import { retrieveJobSubTypesByJobTypeId } from "../../../../action_creators/task/job_sub_type/job_sub_type";

const TasksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskListRetrieved = useAppSelector((state) => state.taskList.tasks);
  const taskListState = useAppSelector((state) => state.taskList.taskState);
  const [vehicleId, setVehicleId] = React.useState("");
  const [homeId, setHomeId] = React.useState("");
  const [taskId, setTaskId] = React.useState("");
  const [taskIdToNotes, setTaskIdToNotes] = React.useState("");
  const [taskNewestNote, setTaskNewestNote] = React.useState("");
  const [eachTableRowDate, setEachTableRowDate] = React.useState();
  const [showJobSubType, setJobSubType] = React.useState(false);
  const [isShowAllTasks, setIsShowAllTasks] = React.useState(0);
  const [loadingTaskFilesPopup, setLoadingTaskFilesPopup] = React.useState("");
  const [taskIdArray, setTaskIdArray] = React.useState<string[]>([]);
  const userInfo = useAuth();
  const usersList = useAppSelector(
    (state) => state.userListWithActiveValue.userswithativevalue
  );
  const esignList = useAppSelector((state) => state.syncEsign.docsSignState);

  const user = key();
  let history = useNavigate();
  let iconColor:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
  const currentDate = new Date().toISOString();
  const autoInfoButtonRef = useRef<OpenHandle>(null);
  const homeInfoButtonRef = useRef<HandleHomeOpen>(null);
  const jobTypeSubTypeButtonRef = useRef<HandleJobTypeSubTypeOpen>(null);
  const edocSwitchButtonRef = useRef<HandleEdocSwitchOpen>(null);
  const taskFilesButtonRef = useRef<ToggleHandle>(null);
  const taskNotesButtonRef = useRef<TaskNoteOpenHandle>(null);
  let taskRows: ITaskListTable[] = [];
  let followUpTaskRows: ITaskListTable[] = [];
  let edocTaskRows: ITaskListTable[] = [];
  let waitingDocsTaskRows: ITaskListTable[] = [];

  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(retrieveTasksList({}));
      dispatch(getTaskDaysInfo({}));
      dispatch(retrieveFileStatus({}));
      dispatch(retrieveJobTypesList({}));
      if (taskListState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(retrieveVehicleInfoByVehicleId(vehicleId));
    dispatch(retrieveDriversInfoByVehicleId(vehicleId));
  }, [vehicleId]);

  useEffect(() => {
    dispatch(retrieveHomeInfoByHomeId(homeId));
  }, [homeId]);

  useEffect(() => {
    dispatch(retrieveTaskFilesByTaskId(taskId));
  }, [taskId]);

  useEffect(() => {
    dispatch(retrieveTaskNotesByTaskId(taskIdToNotes));
  }, [taskIdToNotes]);

  const handleClickOpen = (id: string) => {
    setVehicleId(id);
    autoInfoButtonRef.current?.alterOpen();
  };

  const handleHomeInfoDialogClickOpen = (homeId: string) => {
    setHomeId(homeId);
    homeInfoButtonRef.current?.homeInfoOpen();
  };

  const handleJobTypeSwitchDialogClickOpen = (
    task: ITaskListJobTypeSubTypeResponse
  ) => {
    jobTypeSubTypeButtonRef.current?.jobTypeSubTypeOpen(task);
  };

  const handleEdocSwitchClickOpen = (
    task: ITaskListJobTypeSubTypeResponse
  ) => {
    edocSwitchButtonRef.current?.edocSwitchOpen(task);
  }

  const handleTaskFilesDialogClickOpen = (id: string) => {
    setTaskId(id);
    setTimeout(() => {
      taskFilesButtonRef.current?.dialogOpen();
      setLoadingTaskFilesPopup("");
    }, 3000);
  };

  const handleTaskNotesDialogClickOpen = (
    id: string,
    note: string,
    rowData: any
  ) => {
    setTaskIdToNotes(id);
    setTaskNewestNote(note);
    setEachTableRowDate(rowData);
    taskNotesButtonRef.current?.alterOpen();
  };

  const taskColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      renderCell: (params) => {
        const task_priority = params.row.Priority_Description;
        switch (task_priority) {
          case "High": {
            iconColor = "error";
            break;
          }
          case "Medium": {
            iconColor = "primary";
            break;
          }
          case "Low": {
            iconColor = "disabled";
            break;
          }
          default: {
            iconColor = "disabled";
            break;
          }
        }
        return <LocalOfferIcon color={iconColor} />;
      },
    },
    {
      field: "Policy_Number",
      headerName: "Policy #",
      width: 150,
      renderCell: (params) => {
        const policy_number = params.value;
        const rowData = params.row;
        if (policy_number === "") {
          return <UpdatePolicyButton rowValue={rowData} />;
        } else {
          return (
            <Link
              href="#"
              underline="hover"
              onClick={() => {
                window.open(CRM_Policy_Search_URL + policy_number);
              }}
            >
              {policy_number}
            </Link>
          );
        }
      },
    },
    {
      field: "CRM_Client_Name",
      headerName: "Client Name",
      width: 200,
      renderCell: (params) => {
        const api: GridApi = params.api;
        const selectedRow: Record<string, GridCellValue> = {};
        const task = params.row.Task_Id;
        const check_task = esignList.find(
          (element) => element.task_id === task
        );
        if (check_task !== undefined) {
          if (check_task.is_signed === "yes") {
            iconColor = "success";
          } else {
            iconColor = "error";
          }
        } else {
          iconColor = "primary";
        }

        api
          .getAllColumns()
          .forEach(
            (c) => (selectedRow[c.field] = params.getValue(params.id, c.field))
          );
        const clientName = selectedRow.CRM_Client_Name?.toString();
        const clientPhone = selectedRow.CRM_Client_Phone?.toString();
        const clientEmail = selectedRow.CRM_Client_Email?.toString();
        const Task_Description = selectedRow.Task_Description?.toString();
        const Assign_To = selectedRow.Assign_To?.toString();
        const Priority_Id = selectedRow.Priority_Id?.toString();
        const Job_Type_Name = selectedRow.Job_Type_Name?.toString();
        const Job_Sub_Type_Name = selectedRow.Job_Sub_Type_Name?.toString();
        const Policy_Number = selectedRow.Policy_Number?.toString();
        const Task_Id = task.toString();

        return (
          <ClientContact
            client_name={clientName}
            client_email={clientEmail}
            client_phone={clientPhone}
            iconColor={iconColor}
            Task_Description={Task_Description}
            Assign_To={Assign_To}
            Priority_Id={Priority_Id}
            Job_Type_Name={Job_Type_Name}
            Job_Sub_Type_Name={Job_Sub_Type_Name}
            Policy_Number={Policy_Number}
            Task_Id={Task_Id}
          ></ClientContact>
        );
      },
    },
    {
      field: "Task_Description",
      headerName: "Description",
      width: 200,
      hide: true,
    },
    {
      field: "Job_Type_Name",
      headerName: "Job Type & Job Sub Type",
      width: 290,
      renderCell: (params) => {
        const vehicle_id = params.row.CM_Vehicle_Info_Id;
        const home_id = params.row.CM_Home_Info_Id;
        const job_type_name: string = params.row.Job_Type_Name;
        const task_quote_details: string | null = params.row.Task_Quote_Details;
        const job_sub_type_name: string = params.row.Job_Sub_Type_Name;
        const task_id = params.row.Task_Id;
        const task_status = params.row.Task_Status;
        return (
          <div>
            {vehicle_id && (
              <IconButton
                aria-label="contact"
                color="solidblack"
                onClick={() => {
                  handleClickOpen(vehicle_id);
                }}
              >
                <DirectionsCarFilledIcon className="job-type-icons" />
              </IconButton>
            )}
            {home_id && (
              <IconButton
                aria-label="house_info"
                color="solidblack"
                onClick={() => {
                  handleHomeInfoDialogClickOpen(home_id);
                }}
              >
                <HomeIcon className="job-type-icons" />
              </IconButton>
            )}
            {task_quote_details && (
              <TaskQuotesDetail
                quoteDetails={task_quote_details}
                rowValue={params.row}
              />
            )}
            {(job_type_name === "Online Quote" &&
              task_status === "INPROGRESS") ||
            job_type_name === "Edoc" ? (
              job_type_name === "Edoc" ? (
                // Edoc Dialog
                <>
                  <Tooltip title="Switch to Current Tasks" arrow>
                    <Button
                      className="job-type-sub-type-switch-button"
                      endIcon={<SwitchLeftIcon />}
                      onClick={() => {
                        handleEdocSwitchClickOpen(params.row);
                      }}
                    >
                      {job_type_name} \ {job_sub_type_name}
                    </Button>
                  </Tooltip>
                </>
              ) : (
                // Online Quote dialog
                <>
                  <Tooltip title="Switch Job Type and Job Sub Type" arrow>
                    <Button
                      className="job-type-sub-type-switch-button"
                      endIcon={<SwitchLeftIcon />}
                      onClick={() => {
                        handleJobTypeSwitchDialogClickOpen(params.row);
                      }}
                    >
                      {job_type_name} \ {job_sub_type_name}
                    </Button>
                  </Tooltip>
                </>
              )
            ) : (
              <>
                <>
                  {job_type_name} \ {job_sub_type_name}
                </>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "Job_Sub_Type_Name",
      headerName: "Job Sub Type",
      width: 170,
      // hide: showJobSubType,
      hide: true,
    },
    {
      field: "Task_Files",
      headerName: "Files",
      width: 280,
      renderCell: (params) => {
        const task_id = params.row.Task_Id;
        const task_file_nums: string = params.row.Task_Files;

        if (task_file_nums) {
          return (
            <TextSolidBlackButton
              className="task-file-icon-button"
              aria-label="contact"
              startIcon={
                loadingTaskFilesPopup === task_id ? (
                  <span
                    className="spinner-border
                  spinner-border-sm
                  task-file-spinner"
                  ></span>
                ) : (
                  <FileOpenIcon className="job-type-icons" />
                )
              }
              disabled={loadingTaskFilesPopup === task_id}
              onClick={() => {
                dispatch(retrieveTaskFilesByTaskId(task_id));
                handleTaskFilesDialogClickOpen(task_id);
                setLoadingTaskFilesPopup(task_id);
              }}
            >
              {task_file_nums}
            </TextSolidBlackButton>
          );
        }
        return <></>;
      },
    },
    {
      field: "CM_Vehicle_Info_Id",
      hide: true,
      hideable: false,
    },
    {
      field: "CM_Home_Info_Id",
      hide: true,
      hideable: false,
    },
    { field: "CRM_Client_Phone", hide: true, hideable: false },
    { field: "CRM_Client_Email", hide: true, hideable: false },

    {
      field: "Create_Date",
      headerName: "Create Date",
      width: 120,
      type: "dateTime",
      renderCell: (params) => {
        const createDate: string = params.row.Create_Date;
        const formatDate = createDate.split("T")[0];
        return <>{formatDate}</>;
      },
    },
    {
      field: "Assign_Date",
      headerName: "Assign Date",
      width: 150,
      type: "dateTime",
      hide: true,
    },
    {
      field: "Close_Date",
      headerName: "Close Date",
      width: 150,
      type: "dateTime",
      hide: true,
    },
    {
      field: "FollowUp_Date",
      headerName: "Followup Date",
      width: 150,
      type: "dateTime",
      hide: true,
    },
    {
      field: "Create_By",
      hide: true,
      hideable: false,
    },
    {
      field: "Assign_By",
      hide: true,
      hideable: false,
    },
    {
      field: "Priority_Description",
      hide: true,
      hideable: false,
    },
    {
      field: "Task_Newest_Note",
      headerName: "Note",
      width: 70,
      renderCell: (params) => {
        const task_id = params.row.Task_Id;
        const note: string = params.row.Task_Newest_Note;
        const rowData = params.row;
        return (
          <IconButton
            aria-label="contact"
            color="solidblack"
            onClick={() => {
              handleTaskNotesDialogClickOpen(task_id, note, rowData);
            }}
          >
            {note === "null" || note === null ? (
              <EditIcon className="job-type-icons" />
            ) : (
              <CommentIcon className="job-type-icons" />
            )}
          </IconButton>
        );
      },
    },
    {
      field: "Assign_To",
      headerName: "Assign to ",
      width: 200,
      renderCell: (params) => {
        const selectedUser: string = params.row.Assign_To;
        const selectedRow = params.row;
        return <UserDropDown defValue={selectedUser} rowValue={selectedRow} />;
      },
    },
    {
      field: "Task_Status",
      headerName: "Action",
      width: 320,
      renderCell: (params) => {
        const selectedStatus: string = params.row.Task_Status;
        const selectedRow = params.row;
        return <TaskAction defValue={selectedStatus} rowValue={selectedRow} />;
      },
    },
  ];

  if (taskListRetrieved && taskListRetrieved.length > 0) {
    taskListRetrieved.forEach((value, index) => {
      const follow_date_to_string = value.FollowUp_Date
        ? value.FollowUp_Date.toString()
        : "";
      const taskFollowUpDate: string = follow_date_to_string
        ? follow_date_to_string
        : "";
      let eachTask: ITaskListTable = {
        Assign_By: "",
        Create_By: "",
        Assign_To: "",
        Create_Date: "",
        Job_Sub_Type_Name: "",
        Job_Type_Name: "",
        Task_Description: "",
        Task_Id: "",
        id: "",
        Address1: "",
        Address2: "",
        PostalCode: "",
      };
      const rowNum = index + 1;
      eachTask.id = rowNum.toString();
      eachTask.Task_Id = value.Task_Id;
      eachTask.Task_Description = value.Task_Description;
      eachTask.Create_Date = value.Create_Date;
      eachTask.Assign_Date = value.Assign_Date;
      eachTask.Close_Date = value.Close_Date;
      eachTask.FollowUp_Date = value.FollowUp_Date;
      eachTask.QC_Date = value.QC_Date;
      eachTask.Expire_Date = value.Expire_Date;
      eachTask.Create_By = value.Create_By;
      eachTask.Assign_By = value.Assign_By;
      eachTask.Assign_To = value.Assign_To;
      eachTask.QC_By = value.QC_By;
      eachTask.Job_Type_Name = value.Job_Type_Name;
      eachTask.Job_Sub_Type_Name = value.Job_Sub_Type_Name;
      eachTask.CRM_Client_Name = value.CRM_Client_Name;
      eachTask.CRM_Client_Phone = value.CRM_Client_Phone;
      eachTask.CRM_Client_Email = value.CRM_Client_Email;
      eachTask.Policy_Number = value.Policy_Number;
      eachTask.Task_Newest_Note = value.Task_Newest_Note;
      eachTask.Task_Status = value.Task_Status;
      eachTask.CM_Vehicle_Info_Id = value.CM_Vehicle_Info_Id;
      eachTask.CM_Home_Info_Id = value.CM_Home_Info_Id;
      eachTask.Priority_Description = value.Priority_Description;
      eachTask.Task_Files = value.Task_Files;
      eachTask.Task_Quote_Details = value.Task_Quote_Details;
      eachTask.Address1 = value.Address1;
      eachTask.Address2 = value.Address2;
      eachTask.PostalCode = value.PostalCode;

      if (
        value.Task_Status !== "FOLLOWUP" &&
        value.Job_Type_Name !== "Edoc" &&
        value.Task_Status !== "WAITINGDOC"
      )
        return taskRows.push(eachTask);

      if (
        currentDate >= taskFollowUpDate &&
        value.Job_Type_Name !== "Edoc" &&
        value.Task_Status !== "WAITINGDOC"
      )
        return taskRows.push(eachTask);

      if (value.Job_Type_Name === "Edoc" && value.Task_Status !== "WAITINGDOC")
        return edocTaskRows.push(eachTask);

      if (value.Task_Status === "FOLLOWUP")
        return followUpTaskRows.push(eachTask);

      if (value.Task_Status === "WAITINGDOC")
        return waitingDocsTaskRows.push(eachTask);
    });
  }

  useEffect(() => {
    var arr: string[] = [];
    if (taskListRetrieved && taskListRetrieved.length > 0) {
      taskListRetrieved.forEach((value, index) => {
        arr.push(value.Task_Id);
      });
    }
    setTaskIdArray(arr);
    /*Checking if use is manager task console will show Waiting Docs Tasks*/
    if (userInfo.Role === "manager") {
      setIsShowAllTasks(3);
    }
  }, []);
  /* const rows: GridRowsProp =
    isShowAllTasks === 1
      ? followUpTaskRows
      : isShowAllTasks === 0
      ? taskRows
      : isShowAllTasks === 2
      ? edocTaskRows
      : waitingDocsTaskRows; */

  let rows: GridRowsProp = [];

  switch (isShowAllTasks) {
    case 0:
      rows = taskRows;
      break;
    case 1:
      rows = followUpTaskRows;
      break;
    case 2:
      rows = edocTaskRows;
      break;
    case 3:
      rows = waitingDocsTaskRows;
      break;
    default:
      console.log("No such radio option!");
      break;
  }

  return (
    <div className="task-console-table-container">
      <FormControl className="task-console-form-control-container">
        <div className="task-console-radio-controls">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={isShowAllTasks}
          >
            {/* <TaskUpdatesCheck task_id_array={taskIdArray} /> */}
            <FormControlLabel
              value={0}
              control={
                <Radio
                  size="small"
                  checkedIcon={<LensIcon />}
                  onClick={() => {
                    if (showJobSubType) {
                      setJobSubType(false);
                    }
                    setIsShowAllTasks(0);
                  }}
                />
              }
              label="Current Tasks"
              defaultChecked
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  size="small"
                  checkedIcon={<LensIcon />}
                  onClick={() => {
                    setJobSubType(true);
                    setIsShowAllTasks(2);
                  }}
                />
              }
              label="Edoc Tasks"
            />
            <FormControlLabel
              value={1}
              control={
                <Radio
                  size="small"
                  checkedIcon={<LensIcon />}
                  onClick={() => {
                    if (showJobSubType) {
                      setJobSubType(false);
                    }
                    setIsShowAllTasks(1);
                  }}
                />
              }
              label="Follow Up Tasks"
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  size="small"
                  checkedIcon={<LensIcon />}
                  onClick={() => {
                    if (showJobSubType) {
                      setJobSubType(false);
                    }
                    setIsShowAllTasks(3);
                  }}
                />
              }
              label="Waiting Docs Tasks"
            />
          </RadioGroup>
        </div>
        <div className="task-console-button-controls">
          {userInfo.Role === "manager" && (
            <>
              <AutoAssign />
              <DeleteAll />
              <SyncEsign />
              <TaskUpdatesCheck task_id_array={taskIdArray} />
            </>
          )}
        </div>
      </FormControl>
      <DataGrid
        className="task-console-table"
        autoHeight
        columns={taskColumns}
        rows={rows}
        pageSize={15}
      />
      <AutoInfo ref={autoInfoButtonRef} />
      <HomeInfo ref={homeInfoButtonRef} />
      <JobTypeSubType ref={jobTypeSubTypeButtonRef} />
      <TaskFiles ref={taskFilesButtonRef} />
      <TaskEdocSwitch ref={edocSwitchButtonRef} />
      <TaskNote
        ref={taskNotesButtonRef}
        rowValue={eachTableRowDate}
        taskNote={taskNewestNote}
      />
    </div>
  );
};

export default TasksTable;
