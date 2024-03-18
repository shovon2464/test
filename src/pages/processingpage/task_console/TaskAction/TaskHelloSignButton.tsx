import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { OutlinedErrorButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import {
  addTask,
  addTask1,
} from "../../../../services/questionaire/auto_questionaire/task";
import {
  getTask,
  uploadUnsignedPdf,
} from "../../../../services/questionaire/auto_questionaire/erpFileUpload";
import { fillPolicyChangeForm } from "../../../../components/share_components/PdfCreator/PolicyChangePdfCreator";
import { PolicyForm } from "../../create_job/questionaire/auto_questionaire/VehicleQuestionaire";
// import {
//   getPdfFile,
//   sendHelloSign,
//   createHelloSign,
// } from "../../../../services/task/hellosign/hellosign";
import { fillPropertyPolicyChangeRequestForm } from "../../../../components/share_components/PdfCreator/PropertyChangePdfCreator";
import { IPropertyChangeInfo } from "../../../../components/share_components/PdfCreator/PropertyChangePdfCreator";
import { ICancellationInfo } from "../../../../components/share_components/PdfCreator/CancellationPdfCreator";
import PropertyChangeFields from "../../create_job/questionaire/property_questionaire/PropertyChange";
import CancellationFields from "../../create_job/questionaire/Cancellation/Cancellation";
import { fillCancellationRequestForm } from "../../../../components/share_components/PdfCreator/CancellationPdfCreator";
import { AutoList } from "../../create_job/questionaire/auto_questionaire/VehicleQuestionaire";
// import { updateHelloSign } from "../../../../services/task/hellosign/hellosign";

interface TaskHelloSignButtonProps {
  Task_Id: string;
  Task_Description: string;
  Assign_To: string;
  Priority_Id: string;
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
  Policy_Number: string;
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
  HideHelloSignBtn: boolean;
  DisableHelloSignBtn: boolean;
}

interface Insurance_Company {
  Insurance_Company_Id: string;
  Insurance_Company_Name: string;
  policies: Policy[];
}

interface Policy_Type {
  Policy_Type_Id: string;
  Policy_Type_Name: string;
  Corresponding_Ques_Table: string;
  policy_types: Policy[];
}

interface EDI {
  Edi_Id: string;
  Edi_Info: string;
  Policy_Id: string;
  policy: Policy;
}

interface Client {
  Client_Id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Phone: string;
  Email: string;
  BirthDay: Date;
  Address: string;
  PostCode: string;
  City: string;
  Country: string;
  Lead: boolean;
  Fax: string;
  Status: string;
  policy_questionnaires: Policy_Questionnaire[];
}

interface Policy_Questionnaire {
  Policy_Questionnaire_Id: string;
  Policy_Id: string;
  policy: Policy;
  Questionnaire_Id: string;
  Client_Id: string;
  client: Client;
}

interface Policy {
  Policy_Id: string;
  Policy_Number: string;
  Policy_Info: string;
  Address: string;
  PostCode: string;
  City: string;
  Country: string;
  Premium: string;
  Effective_Date: Date;
  Expired_Date: Date;
  Insurance_Company_Id: string;
  insurance_company: Insurance_Company;
  Policy_Type_Id: string;
  policy_type: Policy_Type;
  edis: EDI[];
  policy_questionnaires: Policy_Questionnaire[];
  tasks: Task[];
}

interface Job_Sub_Type {
  Job_Sub_Type_Id: string;
  Job_Sub_Type_Name: string;
  Score: number;
  Job_Type_Id: string;
  job_type: Job_Type;
  tasks: Task[];
}

interface Job_Type {
  Job_Type_Id: string;
  Job_Type_Name: string;
  Tasks: Task[];
  Job_sub_types: Job_Sub_Type[];
}

interface Priority {
  Priority_Id: string;
  Priority_Description: string;
  tasks: Task[];
}

interface Task_Source {
  Task_Source_Name: string;
  tasks: Task[];
  Task_Source_Id: string;
}

interface CM_Vehicle_Status {
  CM_Vehicle_Status_Id: string;
  CM_Vehicle_Status_Description: string;
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_PayOffTypeDetail {
  PayOffTypeDetail_Id: string;
  PayOffTypeSubDetail: string;
  fk_pay_off_type_id: string;
  cm_payofftype: CM_PayOffType;
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_PayOffType {
  PayOffType_Id: string;
  PayOffTypeDetail: string;
  fk_pay_off_mode_id: string;
  cm_payoffmode: CM_PayOffMode;
  cm_payofftypedetail: CM_PayOffTypeDetail[];
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_PayOffMode {
  PayOffMode_Id: string;
  PayOffType: string;
  cm_payofftypes: CM_PayOffType[];
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_Vehicle_Coverage {
  CM_Vehicle_Coverage_Id: string;
  CoverageType: string;
  CoverageDetails: string;
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_Usage_Detail {
  CM_Usage_Detail_Id: string;
  UsageDetail: string;
  fk_usage_id: string;
  cm_usage: CM_Usage;
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_Usage {
  CM_Usage_Id: string;
  UsageType: string;
  cm_usage_details: CM_Usage_Detail[];
  cm_vehicles_info: CM_Vehicle_Info[];
}

interface CM_Driver_Info {
  CM_Driver_Info_Id: string;
  Name: string;
  Gender: string;
  Address: string;
  DateOfBirth: Date;
  LicenseNumber: string;
  LicenseYear: number;
  IsRemoved: boolean;
  RemoveReasons: string;
  vehicleConnection: CM_VehicleInfo_DriverInfo[];
}

interface CM_VehicleInfo_DriverInfo {
  CM_Vehicle_Info_Id: string;
  CM_Driver_Info_Id: string;
  PrincipleDriver: boolean;
  cm_vehicle_info: CM_Vehicle_Info;
  cm_driver_info: CM_Driver_Info;
}

interface CM_Vehicle_Info {
  CM_Vehicle_Info_Id: string;
  VIN: string;
  Model: string;
  Year: number;
  IsUsed: boolean;
  IfParkingReason: string;
  StartEffectiveDate: Date;
  EndEffectiveDate: Date;
  Policy_Number: string;
  FinanceOrLeaseCompanyInfo: string;
  AutoUsageDetails: string;
  fk_vehicle_status_id: string;
  cm_vehicle_status: CM_Vehicle_Status;
  PayOffMode_Id: string;
  cm_payoffmode: CM_PayOffMode;
  CM_Vehicle_Coverage_Id: string;
  cm_vehicle_coverage: CM_Vehicle_Coverage;
  CM_Usage_Id: string;
  cm_usage: CM_Usage;
  PayOffType_Id: string;
  cm_payofftype: CM_PayOffType;
  PayOffTypeDetail_Id: string;
  cm_payofftypedetail: CM_PayOffTypeDetail;
  CM_Usage_Detail_Id: string;
  cm_usage_detail: CM_Usage_Detail;
  driverConnection: CM_VehicleInfo_DriverInfo[];
  tasks: Task[];
}

interface CM_Home_Info {
  CM_Home_Info_Id: string;
  Address: string;
  Built_Year: number;
  HW_Tank_Year: number;
  Roofing_Year: number;
  Size: string;
  Is_Basement_Completed: boolean;
  Bathrooms: string;
  Claims: boolean;
  Num_Mortgages: number;
  Comment: string;
  tasks: Task[];
}

interface Note_Type {
  Note_Type_Id: string;
  Note_Type_Name: string;
  Score: number;
  notes: Note[];
}

interface Note {
  Note_Id: string;
  Create_Date: Date;
  Description: string;
  Reason: string;
  To_Who: string;
  By_Who: string;
  Task_Id: string;
  task: Task;
  Note_Type_Id: string;
  note_type: Note_Type;
}

interface Task_File_Type {
  Task_File_Type_Id: string;
  Task_File_Type_Name: string;
  task_files: Task_File[];
}

interface Task_File_Note {
  Task_File_Note_Id: string;
  Create_Date: Date;
  Description: string;
  Reason: string;
  By_Who: string;
  Task_File_Id: string;
  task_file: Task_File;
}

interface Task_File {
  Task_File_Id: string;
  Task_File_Name: string;
  Upload_By: string;
  File_Path: string;
  ask_File_Job_Type_Name: string;
  Task_Id: string;
  task: Task;
  Task_File_Type_Id: string;
  task_file_type: Task_File_Type;
  task_file_notes: Task_File_Note[];
}

interface Task_Action {
  Task_Action_Id: string;
  Task_Action_Name: string;
  tracking_task_actions: Tracking_Task_Action[];
}

interface Tracking_Task_Action {
  Tracking_Task_Action_Id: string;
  Edit_Date: Date;
  By_Who: string;
  To_Who: string;
  Task_Id: string;
  task: Task;
  Task_Action_Id: string;
  task_action: Task_Action;
}

export interface Task {
  Task_Id: string;
  Task_Description: string;
  Create_Date: Date;
  Assign_Date: Date;
  Close_Date: Date;
  FollowUp_Date: Date;
  QC_Date: Date;
  Expire_Date: Date;
  Assign_By: string;
  Assign_To: string;
  QC_By: string;
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
  Task_Newest_Note: string;
  Task_Status: string;
  Task_Quote_Details: string;
  Task_Source_Id: string;
  task_source: Task_Source;
  Priority_Id: string;
  priority: Priority;
  Job_Type_Id: string;
  Job_type: Job_Type;
  Job_Sub_Type_Id: string;
  Job_sub_type: Job_Sub_Type;
  Policy_Id: string;
  policy: Policy;
  CM_Vehicle_Info_Id: string;
  cm_vehicle_info: CM_Vehicle_Info;
  CM_Home_Info_Id: string;
  cm_home_info: CM_Home_Info;
  Policy_Number: string;
  notes: Note[];
  task_files: Task_File[];
  tracking_task_actions: Tracking_Task_Action[];
  Create_By: string;
  HelloSign_Id: string;
}

interface driver {
  Name: string;
  PhoneNumber: string;
  Address: string;
  Gender: string;
  DateOfBirth: string;
  LicenceNumber: string;
  LicenceYear: number;
  IsRemoved: boolean;
  PrincipleDriver: boolean;
}

// const TaskHelloSignButton: React.FC<TaskHelloSignButtonProps> = (props) => {
//   const [helloSignBtnLoading, sethelloSignBtnLoading] = React.useState(
//     props.DisableHelloSignBtn
//   );

//   //window.alert(helloSignBtnLoading);
//   const [sendingHelloSign, setSendingHelloSign] = React.useState("");
//   const [isPropertyChangeFieldsDisplay, setIsPropertyChangeFieldsDisplay] =
//     useState(false);
//   const [isCancellationFieldsDisplay, setIsCancellationFieldsDisplay] =
//     useState(false);
//   const { propertyChangeValue, renderPropertyChangeFields } =
//     PropertyChangeFields(isPropertyChangeFieldsDisplay);
//   const { cancellationValues, renderCancellationFields } = CancellationFields(
//     isCancellationFieldsDisplay
//   );
//   const [matchConfirmationOpen, setMatchConfirmationOpen] =
//     React.useState(false);
//   const handleHelloSignConfirmation = () => {
//     setMatchConfirmationOpen(true);
//   };

//   const handleCloseHelloSignConfirmation = () => {
//     setMatchConfirmationOpen(false);
//   };

//   //the principal of hellosign sending is setup. however the condition of each case needs to add.
//   const handleOnClick = async () => {
//     const autolist: AutoList = {
//       numberOfDriver: "",
//       drivers: [
//         {
//           Name: "",
//           PhoneNumber: "",
//           Address: "",
//           Gender: "",
//           DateOfBirth: "",
//           LicenceNumber: "",
//           LicenceYear: 0,
//           IsRemoved: false,
//           PrincipleDriver: true,
//         },
//       ],
//       PreviousVIN: "",
//       VIN: "",
//       Model: "",
//       Year: 0,
//       IsUsed: false,
//       IfParkReason: "",
//       StartEffectiveDate: "",
//       EndEffectiveDate: "",
//       TaskDescription: props.Task_Description,
//       JobSubType: props.Job_Sub_Type_Id,
//       JobType: props.Job_Type_Id,
//       PayOffType: "",
//       PayOffTypeDetail: "",
//       PayOffTypeSubDetail: "",
//       Coverage: "",
//       UsageType: "",
//       UsageDetail: "",
//       VehicleStatusDescription: "",
//       Priority: props.Priority_Id,
//       AssignTo: props.Assign_To,
//       checked: [],
//       CRM_Client_Name: props.CRM_Client_Name ? props.CRM_Client_Name : "",
//       CRM_Client_Phone: props.CRM_Client_Phone ? props.CRM_Client_Phone : "",
//       CRM_Client_Email: props.CRM_Client_Email ? props.CRM_Client_Email : "",
//       Policy_Number: props.Policy_Number ? props.Policy_Number : "",
//       Finance_Lease_Company_Info: "",
//       Auto_Usage_Details: "",
//     };
//     let bytes: string = "";
//     let createfile;
//     const task: Promise<Task> = getTask(props.Task_Id);
//     try {
//       if (props.Job_Type_Id === "Auto") {
//         autolist.StartEffectiveDate = (
//           await task
//         ).cm_vehicle_info.StartEffectiveDate.toDateString();
//         autolist.EndEffectiveDate = (
//           await task
//         ).cm_vehicle_info.EndEffectiveDate.toDateString();
//         autolist.PayOffType = (
//           await task
//         ).cm_vehicle_info.PayOffType_Id.toString();
//         autolist.PayOffTypeDetail = (
//           await task
//         ).cm_vehicle_info.cm_payofftype.PayOffTypeDetail.toString();
//         autolist.PayOffTypeSubDetail = (
//           await task
//         ).cm_vehicle_info.cm_payofftypedetail.PayOffTypeSubDetail;
//         autolist.Coverage = (
//           await task
//         ).cm_vehicle_info.cm_vehicle_coverage.CoverageDetails;
//         autolist.UsageType = (await task).cm_vehicle_info.cm_usage.UsageType;
//         autolist.UsageDetail = (
//           await task
//         ).cm_vehicle_info.cm_usage_detail.UsageDetail;
//         autolist.VehicleStatusDescription = (
//           await task
//         ).cm_vehicle_info.cm_vehicle_status.CM_Vehicle_Status_Description;
//         autolist.Year = (await task).cm_vehicle_info.Year;
//         autolist.IsUsed = (await task).cm_vehicle_info.IsUsed;
//         autolist.Policy_Number = (await task).Policy_Number;
//         autolist.VIN = (await task).cm_vehicle_info.VIN;
//         autolist.Model = (await task).cm_vehicle_info.Model;
//         let i: number = 0;
//         while (
//           i < (await (await task).cm_vehicle_info.driverConnection).length
//         ) {
//           autolist.drivers[i].Name = (
//             await task
//           ).cm_vehicle_info.driverConnection[i].cm_driver_info.Name;
//           autolist.drivers[i].PhoneNumber = "";
//           autolist.drivers[i].DateOfBirth = (
//             await task
//           ).cm_vehicle_info.driverConnection[
//             i
//           ].cm_driver_info.DateOfBirth.toDateString();
//           autolist.drivers[i].LicenceYear = (
//             await task
//           ).cm_vehicle_info.driverConnection[i].cm_driver_info.LicenseYear;
//           autolist.drivers[i].PrincipleDriver = (
//             await task
//           ).cm_vehicle_info.driverConnection[i].PrincipleDriver;
//           i++;
//         }
//         autolist.CRM_Client_Email = (await task).CRM_Client_Email;
//         autolist.CRM_Client_Name = (await task).CRM_Client_Name;
//         autolist.CRM_Client_Phone = (await task).CRM_Client_Phone;
//         bytes = await fillPolicyChangeForm(autolist);
//         createfile = await getPdfFile(bytes, "CSIOPolicy Form");
//       } else if (
//         props.Job_Type_Id === "Property" &&
//         props.Job_Sub_Type_Id === "Change Property"
//       ) {
//         const pdfFilledInfo: IPropertyChangeInfo = {
//           insuranceCompany: propertyChangeValue.insuranceCompany,
//           insurancePolicyNumber: propertyChangeValue.insurancePolicyNumber,
//           insuredFullName: propertyChangeValue.insuredFullName,
//           insuredAddress: propertyChangeValue.insuredAddress,
//           postalCode: propertyChangeValue.postalCode,
//           effectiveDate: propertyChangeValue.effectiveDate,
//           remarks: propertyChangeValue.remarks,
//         };
//         bytes = await fillPropertyPolicyChangeRequestForm(pdfFilledInfo);
//         createfile = await getPdfFile(
//           bytes,
//           "Habitational Policy Change Request Form"
//         );
//       } else if (
//         props.Job_Type_Id === "General" &&
//         props.Job_Sub_Type_Id === "Cancellation"
//       ) {
//         const pdfFilledInfo: ICancellationInfo = {
//           insuranceCompany: cancellationValues.insuranceCompany,
//           insuredAddress: cancellationValues.insuredAddress,
//           insuredFullName: cancellationValues.insuredFullName,
//           insuredUsage: cancellationValues.insuredUsage,
//           cancellationDate: cancellationValues.cancellationDate,
//           postalCode: cancellationValues.postalCode,
//           remarks: cancellationValues.remarks,
//           Policy_Number: props.Policy_Number,
//         };
//         bytes = await fillCancellationRequestForm(pdfFilledInfo);
//         createfile = await getPdfFile(
//           bytes,
//           "Cancellation Reinstatement Request Form"
//         );
//       } else {
//       }

//       const updatefilename = JSON.stringify(
//         createfile.data.getPdfFile.Message
//       ).replace(/"/g, "");
//       const res = await sendHelloSign(
//         updatefilename,
//         autolist.CRM_Client_Email,
//         autolist.CRM_Client_Name
//       );
//       const signaturerequestid = JSON.stringify(
//         res.data.sendHelloSign.SignatureRequestId
//       ).replace(/"/g, "");

//       const hellosignstatus = Boolean(res.data.sendHelloSign.IsComplete);
//       if (signaturerequestid !== null) {
//         const hs = await createHelloSign(
//           signaturerequestid,
//           hellosignstatus,
//           props.Task_Id
//         );
//         const hsid = JSON.stringify(
//           hs.data.createHelloSign.HelloSign.HelloSign_Id
//         ).replace(/"/g, "");
//         setMatchConfirmationOpen(false);
//         sethelloSignBtnLoading(true);
//         setSendingHelloSign("HelloSign is sending to client");
//       }
//     } catch (e: any) {
//       const message =
//         (e.response && e.response.data && e.response.data.message) ||
//         e.message ||
//         e.response.error ||
//         e.toString();
//       console.log("Error", message);
//     }
//   };
//   return (
//     <>
//       <p>{sendingHelloSign}</p>
//       <ContainedErrorButton
//         className="completed-hellosign-send-button"
//         onClick={handleHelloSignConfirmation}
//         disabled={helloSignBtnLoading}
//         hidden={props.HideHelloSignBtn}>
//         <span>HelloSign</span>
//       </ContainedErrorButton>
//       <Dialog
//         className="completed-task-delete-confirmation-dialog"
//         open={matchConfirmationOpen}
//         onClose={handleCloseHelloSignConfirmation}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description">
//         <DialogTitle className="delete-all-task-dialog" id="alert-dialog-title">
//           Send HelloSign
//           <IconButton
//             className="dialog-close-icon-button"
//             aria-label="close"
//             onClick={handleCloseHelloSignConfirmation}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <Divider variant="middle"></Divider>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             The selected task will send HelloSign to Client, are you sure you
//             want to do this?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <OutlinedErrorButton
//             className="delete-task-confirm-button"
//             onClick={handleOnClick}>
//             Send
//           </OutlinedErrorButton>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default TaskHelloSignButton;
// 