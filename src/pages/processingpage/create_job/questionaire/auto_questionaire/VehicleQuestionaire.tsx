import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Alert, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IHomeInfoRequest } from "../../../../../action_creators/questionnaire/home_info/home_info";
import { FieldWrapper } from "../../../../../components/form_components/FieldWrapper";
import { FieldWrapperWithMount } from "../../../../../components/form_components/FieldWrapperWithMount";
import {
  SelectFieldWrapper,
  SelectOption,
} from "../../../../../components/form_components/SelectWrapper";
import { fillPolicyChangeForm } from "../../../../../components/share_components/PdfCreator/PolicyChangePdfCreator";
import { getAllVehicleCoverage } from "../../../../../services/questionaire/auto_questionaire/coverageType";
import { getRecentCalls } from "../../../../../services/questionaire/auto_questionaire/crmRecentCall";
import { PhoneCheck } from "../../../../../services/questionaire/auto_questionaire/crmPhoneCheck";
import { getAutoPolicyCheck } from "../../../../../services/questionaire/auto_questionaire/crmPolicyCheck";
import { sendCRMTaskNote } from "../../../../../services/questionaire/auto_questionaire/crmSendNotes";
import { getAllVINCheck } from "../../../../../services/questionaire/auto_questionaire/crmVinCheck";
import { addDriver } from "../../../../../services/questionaire/auto_questionaire/driver";
import {
  uploadUnsignedPdf,
  uploadUnsignedPdfToBothTextEmail,
} from "../../../../../services/questionaire/auto_questionaire/erpFileUpload";
import { getRelatedJobSubType } from "../../../../../services/questionaire/auto_questionaire/jobSubType";
import { getAllJobType } from "../../../../../services/questionaire/auto_questionaire/jobType";
import { getAllPayOffType } from "../../../../../services/questionaire/auto_questionaire/payOffMode";
import { getAllPriority } from "../../../../../services/questionaire/auto_questionaire/priority";
import { getRelatedPayOffInfo } from "../../../../../services/questionaire/auto_questionaire/RelatedPayOffMode";
import { getRelatedUsage } from "../../../../../services/questionaire/auto_questionaire/RelatedUsage";
import {
  addTask,
  addTask1,
  addTaskWithHomeInfoId,
} from "../../../../../services/questionaire/auto_questionaire/task";
import { getAllUsageType } from "../../../../../services/questionaire/auto_questionaire/usageType";
import { getAllUser } from "../../../../../services/questionaire/auto_questionaire/user";
import { addVehicle } from "../../../../../services/questionaire/auto_questionaire/vehicle";
import { addVehicleDriver } from "../../../../../services/questionaire/auto_questionaire/vehicleDriver";
import { getAllVehicleStatus } from "../../../../../services/questionaire/auto_questionaire/vehicleStatusDescription";
import { createNewHomeInfo } from "../../../../../services/questionaire/home_questionnaire/home_info";
import {
  AutoFieldContainer,
  AutoFormContainer,
} from "../../../../../style_components/auth/auto_form";

// @ts-ignore:next-line
import download from "downloadjs";

import {
  fillCancellationRequestForm,
  ICancellationInfo,
} from "../../../../../components/share_components/PdfCreator/CancellationPdfCreator";
import {
  fillPropertyPolicyChangeRequestForm,
  IPropertyChangeInfo,
} from "../../../../../components/share_components/PdfCreator/PropertyChangePdfCreator";
import { base64ToArrayBuffer } from "../../../../../components/share_components/PdfCreator/ToArrayBuffer";
import CancellationFields from "../Cancellation/Cancellation";
import PropertyChangeFields from "../property_questionaire/PropertyChange";
import HomeQuestionnaireFields from "../home_questionnaire/HomeQuestionnaire";
import "../../../../../style_components/processingpages/create_job/CreateJob.css";
import {
  OutlinedPrimaryButton,
  OutlinedSecondaryButton,
} from "../../../../../style_components/buttons/styled_outlined_buttons";

import {
  ContainedPrimaryButton,
  ContainedSuccessButton,
} from "../../../../../style_components/buttons/styled_contained_buttons";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { retrieveTaskHistory } from "../../../../../action_creators/task/task_list";
import TaskHistoryDialog from "./TaskHistoryDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DriverRequest {
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

export interface AutoList {
  numberOfDriver: string;
  drivers: DriverRequest[];
  PreviousVIN: string;
  VIN: string;
  Model: string;
  Year: number;
  IsUsed: boolean;
  IfParkReason: string;
  StartEffectiveDate: string;
  EndEffectiveDate: string;
  JobSubType: string;
  JobType: string;
  PayOffType: string;
  PayOffTypeDetail: string;
  PayOffTypeSubDetail: string;
  Coverage: string;
  UsageType: string;
  UsageDetail: string;
  VehicleStatusDescription: string;
  TaskDescription: string;
  Priority: string;
  AssignTo: string;
  checked: string[];
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
  Policy_Number: string;
  Finance_Lease_Company_Info: string;
  Auto_Usage_Details: string;
}

export interface PolicyForm {
  ClientPhoneNumber: string;
  PolicyNumber: string;
  PolicyNumberInput: string;
}

const AutoQuestionaire1: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const url_phone = searchParams.get("phone");
  const url_name = searchParams.get("name");
  const [isHouseFieldsDisplay, setIsHouseFieldsDisplay] = useState(false);
  const [isCancellationFieldsDisplay, setIsCancellationFieldsDisplay] =
    useState(false);
  const [isPropertyChangeFieldsDisplay, setIsPropertyChangeFieldsDisplay] =
    useState(false);
  const {
    hAddress,
    hBathrooms,
    hBuiltYear,
    hClaims,
    hComment,
    hFinishedBasement,
    hNumMortgages,
    hRoofingYear,
    hSize,
    hTankYear,
    renderHouseFields,
  } = HomeQuestionnaireFields(isHouseFieldsDisplay);

  const { cancellationValues, renderCancellationFields } = CancellationFields(
    isCancellationFieldsDisplay
  );

  const { propertyChangeValue, renderPropertyChangeFields } =
    PropertyChangeFields(isPropertyChangeFieldsDisplay);

  const initialAutoStates: AutoList = {
    numberOfDriver: "",
    drivers: [
      {
        Name: "",
        PhoneNumber: "",
        Address: "",
        Gender: "",
        DateOfBirth: "",
        LicenceNumber: "",
        LicenceYear: 0,
        IsRemoved: false,
        PrincipleDriver: true,
      },
    ],
    PreviousVIN: "",
    VIN: "",
    Model: "",
    Year: 0,
    IsUsed: false,
    IfParkReason: "",
    StartEffectiveDate: "",
    EndEffectiveDate: "",
    TaskDescription: "",
    JobSubType: "",
    JobType: "",
    PayOffType: "",
    PayOffTypeDetail: "",
    PayOffTypeSubDetail: "",
    Coverage: "",
    UsageType: "",
    UsageDetail: "",
    VehicleStatusDescription: "",
    Priority: "",
    AssignTo: "",
    checked: [],
    CRM_Client_Name: url_name ? url_name : "",
    CRM_Client_Phone: url_phone ? url_phone : "",
    CRM_Client_Email: "",
    Policy_Number: "",
    Finance_Lease_Company_Info: "",
    Auto_Usage_Details: "",
  };

  const initialPolicyStates: PolicyForm = {
    ClientPhoneNumber: url_phone ? url_phone : "",
    PolicyNumber: "",
    PolicyNumberInput: "",
  };

  //=============================================================================
  const [TF, setTF] = React.useState("");

  const handleTFChange = (event: SelectChangeEvent) => {
    setTF(event.target.value as string);
  };

  //========================================================================
  const [payOffMode, setPayOffMode] = React.useState("");
  const [payOffModeList, setOffModeList] = React.useState<any[]>();
  const [recentCallsList, setRecentCallsList] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchRecentCalls = async () => {
      const recentCallsResponse = await getRecentCalls();
      const recentCallsStatus = recentCallsResponse.data.FindRecentCalls.Status;
      const recentCallsArray =
        recentCallsResponse.data.FindRecentCalls.RecentCall;
      let recentFiveCalls: any[] = [];
      if (recentCallsStatus === 200 && recentCallsArray.length > 0) {
        for (let i = 0; i < recentCallsArray.length; i++) {
          const value = {
            value: recentCallsArray[i].phone,
            name: `${recentCallsArray[i].phone} (${recentCallsArray[i].name})`,
          };
          recentFiveCalls.push(value);
        }
      } else {
        const value = {
          value: "No recent calls currently",
          name: "No recent calls currently",
        };
        recentFiveCalls.push(value);
      }
      setRecentCallsList(recentFiveCalls);
    };

    fetchRecentCalls().catch(console.error);
  }, []);

  //======================
  // useEffect(() => {
  //   const fetchTaskHistory = async () => {
  //     const
  //   }
  // })

  const updatePayOffModeList = async () => {
    try {
      const response = await getAllPayOffType();
      setOffModeList(response.data.findAllPayOffMode);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log("Error", message);
    }
  };

  useEffect(() => {
    if (payOffModeList === undefined) {
      updatePayOffModeList();
    }
  });

  const generatePayOffModeListOptions2 = () => {
    let options: SelectOption[] = [];
    if (payOffModeList) {
      payOffModeList.map((option: any) => {
        options.push({ name: option.PayOffType, value: option.PayOffMode_Id });
      });
    }
    return options;
  };

  //==========================================================================

  const [RelatedpayOffTypeDetailList, setRelatedpayOffTypeDetailList] =
    React.useState<any[]>([]);

  useEffect(() => {
    updateRelatedpayOffTypeDetailList();
  }, [payOffMode]);

  const [
    RelatedpayOffTypeDetailListOriginal,
    setRelatedpayOffTypeDetailListOriginal,
  ] = React.useState<any[]>([]);

  const updateRelatedpayOffTypeDetailList = async () => {
    try {
      const Response = await getRelatedPayOffInfo({
        PayOffMode_Id: payOffMode,
      });

      if (Response.data.findPayOffTypeAndDetailByPayOffModeId.cm_payofftypes) {
        let options: any[] = [];
        Response.data.findPayOffTypeAndDetailByPayOffModeId.cm_payofftypes.map(
          (option: any) => {
            options.push({
              name: option.PayOffTypeDetail,
              value: option.PayOffType_Id,
            });
          }
        );
        setRelatedpayOffTypeDetailList(options);
        setRelatedpayOffTypeDetailListOriginal(
          Response.data.findPayOffTypeAndDetailByPayOffModeId.cm_payofftypes
        );
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //==========================================================================
  const [UsageType, setUsageType] = React.useState("");
  const [UsageTypeList, setUsageTypeList] = React.useState<any[]>();

  const updateUsageTypeList = async () => {
    try {
      const response = await getAllUsageType();
      setUsageTypeList(response.data.findAllUsageType);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.error(message);
    }
  };

  useEffect(() => {
    if (UsageTypeList === undefined) {
      updateUsageTypeList();
    }
  });

  const generateUsageTypeListOptions2 = () => {
    let options: SelectOption[] = [];
    if (UsageTypeList) {
      UsageTypeList.map((option: any) => {
        options.push({ name: option.UsageType, value: option.CM_Usage_Id });
      });
    }
    return options;
  };

  //==========================================================================
  const [RelatedUsageDetailList, setRelatedUsageDetailList] = React.useState<
    any[]
  >([]);

  useEffect(() => {
    updateRelatedUsageDetailList();
  }, [UsageType]);

  const updateRelatedUsageDetailList = async () => {
    try {
      const Response = await getRelatedUsage({
        CM_Usage_Id: UsageType,
      });

      if (Response.data.findUsageTypeDetailsByUsageTypeId.cm_usage_details) {
        let options: any[] = [];
        Response.data.findUsageTypeDetailsByUsageTypeId.cm_usage_details.map(
          (option: any) => {
            options.push({
              name: option.UsageDetail,
              value: option.CM_Usage_Detail_Id,
            });
          }
        );
        setRelatedUsageDetailList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //===================================================================================================

  const [vehicleStatusList, setVehicleStatusList] = React.useState<any[]>([]);

  useEffect(() => {
    updateVehicleStatusList();
  }, []);

  const updateVehicleStatusList = async () => {
    try {
      const response = await getAllVehicleStatus();
      setVehicleStatusList(response.data.findAllVehicleStatus);

      if (response.data.findAllVehicleStatus) {
        let options: any[] = [];
        response.data.findAllVehicleStatus.map((option: any) => {
          options.push({
            name: option.CM_Vehicle_Status_Description,
            value: option.CM_Vehicle_Status_Id,
          });
        });
        setVehicleStatusList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //===================================================================================================
  const [coverageList, setCoverageList] = React.useState<any[]>([]);

  useEffect(() => {
    updateCoverageList();
  }, []);

  const updateCoverageList = async () => {
    try {
      const response = await getAllVehicleCoverage();
      setCoverageList(response.data.findAllVehicleCoverage);

      if (response.data.findAllVehicleCoverage) {
        let options: any[] = [];
        response.data.findAllVehicleCoverage.map((option: any) => {
          options.push({
            name: option.CoverageType,
            value: option.CM_Vehicle_Coverage_Id,
          });
        });
        setCoverageList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //=================================================================================
  const [JobType, setJobType] = React.useState("");
  const [JobTypeList, setJobTypeList] = React.useState<any[]>();
  const [policyNum, setPolicyNum] = React.useState("");

  const updateJobTypeList = async () => {
    try {
      const response = await getAllJobType();
      setJobTypeList(response.data.findAllJobType);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.error(message);
    }
  };

  useEffect(() => {
    if (JobTypeList === undefined) {
      updateJobTypeList();
    }
  });

  const handleJobTypeListChange = (event: SelectChangeEvent) => {
    setJobType(event.target.value);
  };

  const generateJobTypeListOptions = () => {
    if (JobTypeList) {
      return JobTypeList.map((option: any) => {
        return (
          <MenuItem key={option.Job_Type_Id} value={option.Job_Type_Id}>
            {option.Job_Type_Name}
          </MenuItem>
        );
      });
    }
  };

  const generateJobTypeListOptions2 = () => {
    let options: SelectOption[] = [];
    if (JobTypeList) {
      JobTypeList.map((option: any) => {
        options.push({ name: option.Job_Type_Name, value: option.Job_Type_Id });
      });
    }
    return options;
  };

  //====================================================================
  const [jobSubTypeList, setjobSubTypeList] = React.useState<any[]>([]);

  useEffect(() => {
    updateRelatedJobSubTypeList();
  }, [JobType]);

  const updateRelatedJobSubTypeList = async () => {
    try {
      const Response = await getRelatedJobSubType({
        Job_Type_Id: JobType,
      });

      if (Response.data.findJobSubTypeByJobTypeId.job_sub_types) {
        let options: any[] = [];
        Response.data.findJobSubTypeByJobTypeId.job_sub_types.map(
          (option: any) => {
            options.push({
              name: option.Job_Sub_Type_Name,
              value: option.Job_Sub_Type_Id,
            });
          }
        );
        setjobSubTypeList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //=============================================================================
  const [priorityList, setPriorityList] = React.useState<any[]>([]);

  useEffect(() => {
    updatePriorityList();
  }, []);

  const updatePriorityList = async () => {
    try {
      const response = await getAllPriority();
      setPriorityList(response.data.findAllPriority);

      if (response.data.findAllPriority) {
        let options: any[] = [];
        response.data.findAllPriority.map((option: any) => {
          options.push({
            name: option.Priority_Description,
            value: option.Priority_Id,
          });
        });
        setPriorityList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //=============================================================================
  const [assignToList, setAssignToList] = React.useState<any[]>([]);

  useEffect(() => {
    updateAssignToList();
  }, []);

  const updateAssignToList = async () => {
    try {
      const response = await getAllUser();
      setAssignToList(response.data.findAllUsers);

      if (response.data.findAllUsers) {
        let options: any[] = [];
        response.data.findAllUsers.map((option: any) => {
          options.push({ name: option.name, value: option.user_id });
        });
        setAssignToList(options);
      }
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
    }
  };

  //=============================================================================

  const handleClose = () => {
    // setOpen(false);
    window.location.pathname = "/Dashboard/";
  };

  //===========================================================

  const [policyNumberList, setPolicyNumberList] = React.useState<any[]>([]);
  const [foundName, setFoundName] = React.useState("");
  const [foundPhone, setFoundPhone] = React.useState("");
  const [foundBirthdate, setFoundBirthdate] = React.useState("");
  const [foundEmail, setFoundEmail] = React.useState("");
  const [foundClientName, setFoundClientName] = React.useState("");
  const [foundClientPhone, setFoundClientPhone] = React.useState("");
  const [loadingPhoneSearch, setLoadingPhoneSearch] = useState(false);
  const [checkGetDetailsClicked, setCheckGetDetailsClicked] = useState(true);
  const [checkPhoneNumberButtonClicked, setCheckPhoneNumberButtonClicked] =
    useState(false);
  const [showPolicyNumberInputField, setShowPolicyNumberInputField] =
    useState(0);
  const [checkPhoneNumberInput, setCheckPhoneNumberInput] = useState(0);
  const [skipPhoneNumberInput, setSkipPhoneNumberInput] = useState(0);
  const [policyNumberInputChange, setPolicyNumberInputChange] = useState(false);
  const [openTaskHistoryDialog, setTaskHistoryDialogOpen] = useState(false);
  const taskHistory = useAppSelector((state) => state.taskHistory.histories);

  const taskHistoryClose = () => {
    setTaskHistoryDialogOpen(false);
  };

  const handlePhoneSearch = async (policyList: PolicyForm) => {
    try {
      if (policyList.ClientPhoneNumber.trim() === "") {
        setCheckPhoneNumberInput(2);
      } else {
        setCheckPhoneNumberInput(0);
        setLoadingPhoneSearch(true);
        //newPhoneNumber will return phone number without symbols and spaces.
        let phoneNumber = policyList.ClientPhoneNumber;
        let newPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        const PhoneResponse = await PhoneCheck({
          phoneNumber: newPhoneNumber,
        });

        if (PhoneResponse.data.ClientCheck.Status === 200) {
          if (PhoneResponse.data.ClientCheck.Policy) {
            let options: any[] = [];
            PhoneResponse.data.ClientCheck.Policy.map((option: any) => {
              options.push({
                name: option.policy_number,
                value: option.policy_number,
              });
            });
            setPolicyNumberList(options);
          }
        } else {
          setCheckPhoneNumberInput(1);
          setShowPolicyNumberInputField(1);
          setCheckPhoneNumberButtonClicked(true);
        }

        if (PhoneResponse) {
          setFoundName(PhoneResponse.data.ClientCheck.Name);
          setFoundPhone(PhoneResponse.data.ClientCheck.PhoneNumber);
          setFoundBirthdate(PhoneResponse.data.ClientCheck.Birthdate);
          setFoundEmail(PhoneResponse.data.ClientCheck.Email);
          setFoundClientName(PhoneResponse.data.ClientCheck.Name);
          setFoundClientPhone(PhoneResponse.data.ClientCheck.PhoneNumber);

          setLoadingPhoneSearch(false);
          setShowPolicyNumberInputField(1);
          setCheckPhoneNumberButtonClicked(true);
        }
      }
    } catch (e: any) {
      setLoadingPhoneSearch(false);
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.error ||
        e.toString();
      console.log("Error", message);
      setCheckPhoneNumberInput(1);
      setShowPolicyNumberInputField(1);
      setCheckPhoneNumberButtonClicked(true);
    }
  };

  const [foundEndEffectiveDate, setFoundEndEffectiveDate] = React.useState("");
  // const [foundStartEffectiveDate, setFoundStartEffectiveDate] =
  //   React.useState("");
  const [foundPolicyNumber, setFoundPolicyNumber] = React.useState("");
  const [oldVInList, setOldVINList] = React.useState<any[]>([]);
  const [loadingPolicySearch, setLoadingPolicySearch] = useState(false);
  const [policyTaskSearchDialog, setPolicyTaskSearchDialog] = useState(false);

  const handleClickOpenTaskDialog = () => {
    setPolicyTaskSearchDialog(true);
  };

  function checkFormat(input: string): boolean {
    const regexp = /^[a-zA-Z0-9]+$/;
    return regexp.test(input);
  }
  const handlePolicySearch = async (autoList: PolicyForm) => {
    try {
      if (checkFormat(autoList.PolicyNumberInput) || autoList.PolicyNumberInput.length === 0) {
        setLoadingPolicySearch(true);
        setPolicyNumberInputChange(true);
        setPolicyNum(autoList.PolicyNumberInput);
      } else {
        alert("Wrong format, only letters and numbers. Please enter again.");
      }

      if (autoList.PolicyNumberInput !== "") {
        const PolicyResponse = await getAutoPolicyCheck({
          policyNumber: autoList.PolicyNumberInput,
        })
          .then((res) => {
            if (res.data.AutoPolicyCheck.Status === 400) {
              setLoadingPolicySearch(false);
              setCheckGetDetailsClicked(false);
            }
            return res;
          })
          .catch((e) => {
            throw Error(e);
          });

        const VINResponse = await getAllVINCheck({
          policyNumber: autoList.PolicyNumberInput,
        });

        if (VINResponse.data.VINCheck.Status === 200) {
          if (VINResponse.data.VINCheck.Car) {
            let options: any[] = [];
            VINResponse.data.VINCheck.Car.map((option: any) => {
              options.push({
                name: `${option.make}  -   ${option.VIN}`,
                value: `${option.make}-${option.VIN}`,
              });
            });
            setOldVINList(options);
          }
        }

        if (PolicyResponse) {
          setFoundPolicyNumber(
            PolicyResponse.data.AutoPolicyCheck.PolicyNumber
          );
          setFoundEndEffectiveDate(
            PolicyResponse.data.AutoPolicyCheck.EndEffectiveDate
          );
          // setFoundStartEffectiveDate(
          //   PolicyResponse.data.AutoPolicyCheck.StartEffectiveDate
          // );
          setFoundName(PolicyResponse.data.AutoPolicyCheck.Name);
          setFoundPhone(PolicyResponse.data.AutoPolicyCheck.PhoneNumber);
          setFoundBirthdate(PolicyResponse.data.AutoPolicyCheck.Birthdate);
          // setFoundEmail(PolicyResponse.data.ClientCheck.Email);
          setFoundClientName(PolicyResponse.data.AutoPolicyCheck.Name);
          setFoundClientPhone(PolicyResponse.data.AutoPolicyCheck.PhoneNumber);

          setLoadingPolicySearch(false);
          setCheckGetDetailsClicked(false);
        }
      } else {
        const PolicyResponse = await getAutoPolicyCheck({
          policyNumber: autoList.PolicyNumber,
        });

        const VINResponse = await getAllVINCheck({
          policyNumber: autoList.PolicyNumber,
        });

        if (VINResponse.data.VINCheck.Status === 200) {
          if (VINResponse.data.VINCheck.Car) {
            let options: any[] = [];
            VINResponse.data.VINCheck.Car.map((option: any) => {
              options.push({
                name: `${option.make}  -   ${option.VIN}`,
                value: option.VIN,
              });
            });
            setOldVINList(options);
          }
        }

        if (PolicyResponse) {
          setFoundPolicyNumber(
            PolicyResponse.data.AutoPolicyCheck.PolicyNumber
          );
          setFoundEndEffectiveDate(
            PolicyResponse.data.AutoPolicyCheck.EndEffectiveDate
          );
          // setFoundStartEffectiveDate(
          //   PolicyResponse.data.AutoPolicyCheck.StartEffectiveDate
          // );

          setLoadingPolicySearch(false);
          setCheckGetDetailsClicked(false);
        }
      }
    } catch (e: any) {
      setLoadingPolicySearch(false);
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.error ||
        e.toString();
      console.log("Error", message);
      setCheckGetDetailsClicked(false);
    }
  };

  const [loadingSave, setLoadingSave] = useState(false);

  const handleAutoSubmit = async (autoList: AutoList) => {
    try {
      setLoadingSave(true);
      if (JobType === "9064b3c3-1d1d-4da6-a3b4-22d11c94cfb3") {
        if (
          !autoList.StartEffectiveDate &&
          //foundStartEffectiveDate &&
          foundEndEffectiveDate
        ) {
          // autoList.StartEffectiveDate = foundStartEffectiveDate;
          autoList.EndEffectiveDate = foundEndEffectiveDate;
        }

        if (autoList.PayOffType === "") {
          autoList.PayOffType = "02beff9d-5ca2-4282-9185-ca1b8693ac74";
        }

        if (autoList.PayOffTypeDetail === "") {
          autoList.PayOffTypeDetail = "02beff9d-5ca2-4282-9185-ca1b8693ac1g";
        }

        if (autoList.PayOffTypeSubDetail === "") {
          autoList.PayOffTypeSubDetail = "02beff9d-5ca2-4282-9185-ca1b8693a24";
        }

        if (autoList.Coverage === "") {
          autoList.Coverage = "50cfa601-b001-4f2a-9c9c-a635b096ce1d";
        }

        if (autoList.UsageType === "") {
          autoList.UsageType = "97d08aca-7f3f-46b0-bb7a-f856439a3fb4";
        }

        if (autoList.UsageDetail === "") {
          autoList.UsageDetail = "cfe1ecc7-bf5d-4f81-b5d9-03db4baddd41";
        }

        if (autoList.VehicleStatusDescription === "") {
          autoList.VehicleStatusDescription =
            "50cfa601-b001-4f2a-9c9c-a635b096cer2";
        }

        if (autoList.Year < 1) {
          autoList.Year = 0;
        }

        if (autoList.IsUsed < true) {
          autoList.IsUsed = false;
        }

        if (foundPolicyNumber) {
          autoList.Policy_Number = foundPolicyNumber;
        }

        if (
          !autoList.StartEffectiveDate
          //&& foundStartEffectiveDate
        ) {
          //autoList.StartEffectiveDate = foundStartEffectiveDate;
          autoList.EndEffectiveDate = foundEndEffectiveDate;
        }

        if (!autoList.VIN && foundVIN) {
          autoList.VIN = foundVIN;
        }

        if (!autoList.Year && foundYear) {
          autoList.Year = Number(foundYear);
        }

        if (!autoList.Model && foundModel) {
          autoList.Model = foundModel;
        }

        const Autoresponse = await addVehicle({
          VIN: autoList.VIN,
          Model: autoList.Model,
          Year: autoList.Year,
          isUsed: autoList.IsUsed,
          IfParkReason: autoList.IfParkReason,
          StartEffectiveDate: autoList.StartEffectiveDate,
          EndEffectiveDate: autoList.EndEffectiveDate,
          payOffMode: autoList.PayOffType,
          payOffTypeDetail: autoList.PayOffTypeDetail,
          // payOffTypeSubDetail: autoList.PayOffTypeSubDetail,
          VehicleCoverage: autoList.Coverage,
          UsageType: autoList.UsageType,
          // UsageDetail:autoList.UsageDetail,
          VehicleStatusDescription: autoList.VehicleStatusDescription,
          Policy_Number: autoList.Policy_Number,
          FinanceOrLeaseCompanyInfo: autoList.Finance_Lease_Company_Info,
          AutoUsageDetails: autoList.Auto_Usage_Details,
        });

        let i: number = 0;

        while (i < autoList.drivers.length) {
          if (i === 0 && !autoList.drivers[i].Name && foundName) {
            autoList.drivers[i].Name = foundName;
            // autoList.drivers[i].PhoneNumber = foundPhone;
            // autoList.drivers[i].DateOfBirth = foundBirthdate;
          }

          if (i === 0 && !autoList.drivers[i].PhoneNumber && foundPhone) {
            autoList.drivers[i].PhoneNumber = foundPhone;
          }

          if (i === 0 && !autoList.drivers[i].DateOfBirth && foundBirthdate) {
            autoList.drivers[i].DateOfBirth = foundBirthdate;
          }

          if (autoList.drivers[i].LicenceYear < 1) {
            autoList.drivers[i].LicenceYear = 0;
          }

          const driverResponse = await addDriver({
            Name: autoList.drivers[i].Name,
            Address: autoList.drivers[i].Address,
            Gender: autoList.drivers[i].Gender,
            DateOfBirth: autoList.drivers[i].DateOfBirth,
            LicenceNumber: autoList.drivers[i].LicenceNumber,
            LicenceYear: autoList.drivers[i].LicenceYear,
          });

          if (autoList.drivers[i].PrincipleDriver < true) {
            autoList.drivers[i].PrincipleDriver = false;
          }

          const vehicleDriverResponse = await addVehicleDriver({
            vehicle_info_id:
              Autoresponse.data.createNewVehicleInfo.CM_Vehicle_Info_Id,
            driver_info_id:
              driverResponse.data.createNewDriverInfo.CM_Driver_Info_Id,
            principle_driver: autoList.drivers[i].PrincipleDriver,
          });

          i++;
        }

        if (!autoList.CRM_Client_Email && foundEmail) {
          // autoList.CRM_Client_Name = foundClientName;
          // autoList.CRM_Client_Phone = foundClientPhone;
          autoList.CRM_Client_Email = foundEmail;
        }

        if (!autoList.CRM_Client_Name && foundClientName) {
          autoList.CRM_Client_Name = foundClientName;
        }

        if (!autoList.CRM_Client_Phone && foundClientPhone) {
          autoList.CRM_Client_Phone = foundClientPhone;
        }

        if (autoList.Policy_Number !== "") {
          await sendCRMTaskNote({
            policyNumber: autoList.Policy_Number,
            Notes: autoList.TaskDescription,
          });
        } else if (policyNum) {
          autoList.Policy_Number = policyNum;
        }
        if (autoList.checked.length > 0) {
          // const sendTo: string =
          //   autoList.checked[0] === "One"
          //     ? autoList.CRM_Client_Phone
          //     : autoList.CRM_Client_Email;
          let sendTo: string = "";
          let sendToBoth: string = "";
          let SplitSendToAddresses: string[] = [];
          let sendBothPhone: string = "";
          let sendBothEmail: string = "";
          if (autoList.checked[0] === "One") {
            sendTo = autoList.CRM_Client_Phone;
          }
          if (autoList.checked[0] === "Two") {
            sendTo = autoList.CRM_Client_Email;
          }
          if (autoList.checked[0] === "Three") {
            sendToBoth = `${autoList.CRM_Client_Phone},${autoList.CRM_Client_Email}`;
          }
          if (sendToBoth !== "") {
            SplitSendToAddresses = sendToBoth.split(",");
            sendBothPhone = SplitSendToAddresses[0];
            sendBothEmail = SplitSendToAddresses[1];
          }
          if (sendTo !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendTo) ||
              RegExp(/^[0-9]{10}$/).test(sendTo)
            ) {
              const bytes = await fillPolicyChangeForm(autoList);
              const Taskresponse = await addTask({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                // Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                CM_Vehicle_Info_Id:
                  Autoresponse.data.createNewVehicleInfo.CM_Vehicle_Info_Id,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdf(
                `${sendTo}`,
                "sign",
                "Auto Policy Change Form.pdf",
                "application/pdf",
                bytes,
                Taskresponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }
          if (sendToBoth !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendBothEmail) &&
              RegExp(/^[0-9]{10}$/).test(sendBothPhone)
            ) {
              const bytes = await fillPolicyChangeForm(autoList);
              const Taskresponse = await addTask({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                // Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                CM_Vehicle_Info_Id:
                  Autoresponse.data.createNewVehicleInfo.CM_Vehicle_Info_Id,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdfToBothTextEmail(
                `${sendToBoth}`,
                "sign",
                "Auto Policy Change Form.pdf",
                "application/pdf",
                bytes,
                Taskresponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }
        } else {
          await addTask({
            Task_Description: autoList.TaskDescription,
            Assign_Date: new Date(),
            Job_Type_Id: autoList.JobType,
            Job_Sub_Type_Id: autoList.JobSubType,
            Priority_Id: autoList.Priority,
            // Task_Status: "INPROGRESS",
            Assign_To: autoList.AssignTo,
            CM_Vehicle_Info_Id:
              Autoresponse.data.createNewVehicleInfo.CM_Vehicle_Info_Id,
            Policy_Number: autoList.Policy_Number
              ? autoList.Policy_Number
              : policyNum,
            CRM_Client_Name: autoList.CRM_Client_Name,
            CRM_Client_Phone: autoList.CRM_Client_Phone,
            CRM_Client_Email: autoList.CRM_Client_Email,
          });
        }
        window.location.pathname = "/TaskConsole/";
      }

      if (JobType === "57fc30aa-933c-4ca2-bd00-02a56ffc213c") {
        let homeInfo: IHomeInfoRequest = {
          Address: "",
          Bathrooms: "",
          Built_Year: null,
          Claims: null,
          Comment: "",
          HW_Tank_Year: null,
          Is_Basement_Completed: null,
          Num_Mortgages: null,
          Roofing_Year: null,
          Size: "",
        };
        if (foundPolicyNumber) {
          autoList.Policy_Number = foundPolicyNumber;
        }

        if (autoList.Policy_Number !== "") {
          const TaskNotesResponse = await sendCRMTaskNote({
            policyNumber: autoList.Policy_Number,
            Notes: autoList.TaskDescription,
          });
        }

        if (!autoList.CRM_Client_Email && foundEmail) {
          autoList.CRM_Client_Email = foundEmail;
        }

        if (!autoList.CRM_Client_Name && foundName) {
          autoList.CRM_Client_Name = foundClientName;
        }

        if (!autoList.CRM_Client_Phone && foundPhone) {
          autoList.CRM_Client_Phone = foundClientPhone;
        }

        if (hAddress) {
          homeInfo.Address = hAddress;
          homeInfo.Bathrooms = hBathrooms;
          homeInfo.Built_Year = hBuiltYear;
          homeInfo.Claims = hClaims;
          homeInfo.Comment = hComment;
          homeInfo.HW_Tank_Year = hTankYear;
          homeInfo.Is_Basement_Completed = hFinishedBasement;
          homeInfo.Num_Mortgages = hNumMortgages;
          homeInfo.Roofing_Year = hRoofingYear;
          homeInfo.Size = hSize;
        }
        const homeInfoResponse = await createNewHomeInfo(homeInfo).catch(
          (error) => {
            throw Error(error);
          }
        );
        await addTaskWithHomeInfoId({
          Task_Description: autoList.TaskDescription,
          Assign_Date: new Date(),
          Job_Type_Id: autoList.JobType,
          Job_Sub_Type_Id: autoList.JobSubType,
          Priority_Id: autoList.Priority,
          CM_Vehicle_Info_Id: "",
          CM_Home_Info_Id:
            homeInfoResponse.data.createNewHomeInfo.CM_Home_Info_Id,
          Assign_To: autoList.AssignTo,
          Policy_Number: autoList.Policy_Number
            ? autoList.Policy_Number
            : policyNum,
          CRM_Client_Name: autoList.CRM_Client_Name,
          CRM_Client_Phone: autoList.CRM_Client_Phone,
          CRM_Client_Email: autoList.CRM_Client_Email,
        })
          .then(() => {
            window.location.pathname = "/TaskConsole/";
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (JobType === "1890b9da-22b7-421c-87cd-6573aee5c8c8") {
        if (isPropertyChangeFieldsDisplay && autoList.checked.length > 0) {
          if (!autoList.CRM_Client_Email && foundEmail) {
            autoList.CRM_Client_Email = foundEmail;
          }

          if (!autoList.CRM_Client_Name && foundClientName) {
            autoList.CRM_Client_Name = foundClientName;
          }

          if (!autoList.CRM_Client_Phone && foundClientPhone) {
            autoList.CRM_Client_Phone = foundClientPhone;
          }

          if (autoList.Policy_Number !== "") {
            await sendCRMTaskNote({
              policyNumber: autoList.Policy_Number,
              Notes: autoList.TaskDescription,
            });
          } else if (policyNum) {
            autoList.Policy_Number = policyNum;
          }
          const pdfFilledInfo: IPropertyChangeInfo = {
            insuranceCompany: propertyChangeValue.insuranceCompany,
            insurancePolicyNumber: propertyChangeValue.insurancePolicyNumber,
            insuredFullName: propertyChangeValue.insuredFullName,
            insuredAddress: propertyChangeValue.insuredAddress,
            postalCode: propertyChangeValue.postalCode,
            effectiveDate: propertyChangeValue.effectiveDate,
            remarks: propertyChangeValue.remarks,
          };
          const bytes = await fillPropertyPolicyChangeRequestForm(
            pdfFilledInfo
          );
          // const sendTo: string =
          //   autoList.checked[0] === "One"
          //     ? autoList.CRM_Client_Phone
          //     : autoList.CRM_Client_Email;
          let sendTo: string = "";
          let sendToBoth: string = "";
          let SplitSendToAddresses: string[] = [];
          let sendBothPhone: string = "";
          let sendBothEmail: string = "";
          if (autoList.checked[0] === "One") {
            sendTo = autoList.CRM_Client_Phone;
          }
          if (autoList.checked[0] === "Two") {
            sendTo = autoList.CRM_Client_Email;
          }
          if (autoList.checked[0] === "Three") {
            sendToBoth = `${autoList.CRM_Client_Phone},${autoList.CRM_Client_Email}`;
          }
          if (sendToBoth !== "") {
            SplitSendToAddresses = sendToBoth.split(",");
            sendBothPhone = SplitSendToAddresses[0];
            sendBothEmail = SplitSendToAddresses[1];
          }
          if (sendTo !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendTo) ||
              RegExp(/^[0-9]{10}$/).test(sendTo)
            ) {
              const TaskResponse = await addTask1({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdf(
                `${sendTo}`,
                "sign",
                "Habitational Policy Change Form.pdf",
                "application/pdf",
                bytes,
                TaskResponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }

          if (sendToBoth !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendBothEmail) ||
              RegExp(/^[0-9]{10}$/).test(sendBothPhone)
            ) {
              const TaskResponse = await addTask1({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdfToBothTextEmail(
                `${sendToBoth}`,
                "sign",
                "Habitational Policy Change Form.pdf",
                "application/pdf",
                bytes,
                TaskResponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }
        } else {
          let homeInfo: IHomeInfoRequest = {
            Address: "",
            Bathrooms: "",
            Built_Year: null,
            Claims: null,
            Comment: "",
            HW_Tank_Year: null,
            Is_Basement_Completed: null,
            Num_Mortgages: null,
            Roofing_Year: null,
            Size: "",
          };
          if (foundPolicyNumber) {
            autoList.Policy_Number = foundPolicyNumber;
          }

          if (autoList.Policy_Number !== "") {
            const TaskNotesResponse = await sendCRMTaskNote({
              policyNumber: autoList.Policy_Number,
              Notes: autoList.TaskDescription,
            });
          }

          if (!autoList.CRM_Client_Email && foundEmail) {
            autoList.CRM_Client_Email = foundEmail;
          }

          if (!autoList.CRM_Client_Name && foundName) {
            autoList.CRM_Client_Name = foundClientName;
          }

          if (!autoList.CRM_Client_Phone && foundPhone) {
            autoList.CRM_Client_Phone = foundClientPhone;
          }

          if (hAddress) {
            homeInfo.Address = hAddress;
            homeInfo.Bathrooms = hBathrooms;
            homeInfo.Built_Year = hBuiltYear;
            homeInfo.Claims = hClaims;
            homeInfo.Comment = hComment;
            homeInfo.HW_Tank_Year = hTankYear;
            homeInfo.Is_Basement_Completed = hFinishedBasement;
            homeInfo.Num_Mortgages = hNumMortgages;
            homeInfo.Roofing_Year = hRoofingYear;
            homeInfo.Size = hSize;
          }
          const homeInfoResponse = await createNewHomeInfo(homeInfo).catch(
            (error) => {
              throw Error(error);
            }
          );
          await addTaskWithHomeInfoId({
            Task_Description: autoList.TaskDescription,
            Assign_Date: new Date(),
            Job_Type_Id: autoList.JobType,
            Job_Sub_Type_Id: autoList.JobSubType,
            Priority_Id: autoList.Priority,
            CM_Vehicle_Info_Id: "",
            CM_Home_Info_Id:
              homeInfoResponse.data.createNewHomeInfo.CM_Home_Info_Id,
            Assign_To: autoList.AssignTo,
            Policy_Number: autoList.Policy_Number
              ? autoList.Policy_Number
              : policyNum,
            CRM_Client_Name: autoList.CRM_Client_Name,
            CRM_Client_Phone: autoList.CRM_Client_Phone,
            CRM_Client_Email: autoList.CRM_Client_Email,
          })
            .then(() => {
              window.location.pathname = "/TaskConsole/";
            })
            .catch((error) => {
              console.log(error);
            });
        }
        window.location.pathname = "/TaskConsole/";
      }

      if (
        JobType !== "9064b3c3-1d1d-4da6-a3b4-22d11c94cfb3" &&
        JobType !== "57fc30aa-933c-4ca2-bd00-02a56ffc213c" &&
        JobType !== "1890b9da-22b7-421c-87cd-6573aee5c8c8"
      ) {
        if (foundPolicyNumber) {
          autoList.Policy_Number = foundPolicyNumber;
        }

        if (autoList.Policy_Number !== "") {
          const TaskNotesResponse = await sendCRMTaskNote({
            policyNumber: autoList.Policy_Number,
            Notes: autoList.TaskDescription,
          });
        }

        if (!autoList.CRM_Client_Email && foundEmail) {
          // autoList.CRM_Client_Name = foundClientName;
          // autoList.CRM_Client_Phone = foundClientPhone;
          autoList.CRM_Client_Email = foundEmail;
        }

        if (!autoList.CRM_Client_Name && foundName) {
          autoList.CRM_Client_Name = foundClientName;
        }

        if (!autoList.CRM_Client_Phone && foundPhone) {
          autoList.CRM_Client_Phone = foundClientPhone;
        }

        if (isCancellationFieldsDisplay && autoList.checked.length > 0) {
          const pdfFilledInfo: ICancellationInfo = {
            insuranceCompany: cancellationValues.insuranceCompany,
            insuredAddress: cancellationValues.insuredAddress,
            insuredFullName: cancellationValues.insuredFullName,
            insuredUsage: cancellationValues.insuredUsage,
            cancellationDate: cancellationValues.cancellationDate,
            postalCode: cancellationValues.postalCode,
            remarks: cancellationValues.remarks,
            Policy_Number: autoList.Policy_Number
              ? autoList.Policy_Number
              : policyNum,
          };
          const bytes = await fillCancellationRequestForm(pdfFilledInfo);
          // const sendTo: string =
          //   autoList.checked[0] === "One"
          //     ? autoList.CRM_Client_Phone
          //     : autoList.CRM_Client_Email;
          let sendTo: string = "";
          let sendToBoth: string = "";
          let SplitSendToAddresses: string[] = [];
          let sendBothPhone: string = "";
          let sendBothEmail: string = "";
          if (autoList.checked[0] === "One") {
            sendTo = autoList.CRM_Client_Phone;
          }
          if (autoList.checked[0] === "Two") {
            sendTo = autoList.CRM_Client_Email;
          }
          if (autoList.checked[0] === "Three") {
            sendToBoth = `${autoList.CRM_Client_Phone},${autoList.CRM_Client_Email}`;
          }
          if (sendToBoth !== "") {
            SplitSendToAddresses = sendToBoth.split(",");
            sendBothPhone = SplitSendToAddresses[0];
            sendBothEmail = SplitSendToAddresses[1];
          }
          if (sendTo !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendTo) ||
              RegExp(/^[0-9]{10}$/).test(sendTo)
            ) {
              const TaskResponse = await addTask1({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdf(
                `${sendTo}`,
                "sign",
                "Auto Policy Change Form.pdf",
                "application/pdf",
                bytes,
                TaskResponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }

          if (sendToBoth !== "") {
            if (
              RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(sendBothEmail) ||
              RegExp(/^[0-9]{10}$/).test(sendBothPhone)
            ) {
              const TaskResponse = await addTask1({
                Task_Description: autoList.TaskDescription,
                Assign_Date: new Date(),
                Job_Type_Id: autoList.JobType,
                Job_Sub_Type_Id: autoList.JobSubType,
                Priority_Id: autoList.Priority,
                Task_Status: "INPROGRESS",
                Assign_To: autoList.AssignTo,
                Policy_Number: autoList.Policy_Number
                  ? autoList.Policy_Number
                  : policyNum,
                CRM_Client_Name: autoList.CRM_Client_Name,
                CRM_Client_Phone: autoList.CRM_Client_Phone,
                CRM_Client_Email: autoList.CRM_Client_Email,
              });
              await uploadUnsignedPdfToBothTextEmail(
                `${sendToBoth}`,
                "sign",
                "Auto Policy Change Form.pdf",
                "application/pdf",
                bytes,
                TaskResponse.data.createTask.Task.Task_Id
              );
            } else {
              throw new Error("Invalid sending address");
            }
          }
        } else {
          await addTask1({
            Task_Description: autoList.TaskDescription,
            Assign_Date: new Date(),
            Job_Type_Id: autoList.JobType,
            Job_Sub_Type_Id: autoList.JobSubType,
            Priority_Id: autoList.Priority,
            Task_Status: "INPROGRESS",
            Assign_To: autoList.AssignTo,
            Policy_Number: autoList.Policy_Number
              ? autoList.Policy_Number
              : policyNum,
            CRM_Client_Name: autoList.CRM_Client_Name,
            CRM_Client_Phone: autoList.CRM_Client_Phone,
            CRM_Client_Email: autoList.CRM_Client_Email,
          });
        }
        window.location.pathname = "/TaskConsole/";
      }
    } catch (e: any) {
      setLoadingSave(false);
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.response.error ||
        e.toString();
      console.log("Error", message);
    }
  };

  function onChangeDrivers(e: any, values: any, setValues: any) {
    const drivers = [...values.drivers];
    drivers.push({
      Name: "",
      Address: "",
      Gender: "",
      DateOfBirth: "",
      LicenceNumber: "",
      LicenceYear: 0,
      IsRemoved: false,
    });
    setValues({ ...values, drivers });
  }

  function onChangeFoundVIN(e: any, handleChange: any) {
    setFoundVIN("");
    handleChange(e);
  }

  function onChangeFoundYear(e: any, handleChange: any) {
    setFoundYear("");
    handleChange(e);
  }

  function onChangeFoundModel(e: any, handleChange: any) {
    setFoundModel("");
    handleChange(e);
  }

  function onChangeFoundName(e: any, handleChange: any) {
    setFoundName("");
    handleChange(e);
  }

  function onChangeFoundPhone(e: any, handleChange: any) {
    setFoundPhone("");
    handleChange(e);
  }

  function onChangeFoundClientName(e: any, handleChange: any) {
    setFoundClientName("");
    handleChange(e);
  }

  function onChangeFoundClientPhone(e: any, handleChange: any) {
    setFoundClientPhone("");
    handleChange(e);
  }

  function onChangeFoundEmail(e: any, handleChange: any) {
    setFoundEmail("");
    handleChange(e);
  }

  function onChangeFoundBirthdate(e: any, handleChange: any) {
    setFoundBirthdate("");
    handleChange(e);
  }

  function onChangeFoundStartEffectiveDate(e: any, handleChange: any) {
    //setFoundStartEffectiveDate("");
    handleChange(e);
  }

  function onChangeFoundEndEffectiveDate(e: any, handleChange: any) {
    setFoundEndEffectiveDate("");
    handleChange(e);
  }

  const [autoCompanyHide, setCompanytHide] = useState(true);
  function onChangePayOffType(e: any, handleChange: any) {
    setPayOffMode(e.target.value);
    handleChange(e);
    if (e.target.value !== "50ff1bb6-8c4d-4479-b9c0-34206433c7a5") {
      setCompanytHide(false);
    } else {
      setCompanytHide(true);
    }
  }

  const [autoHide, setAutoHide] = useState(true);
  function onChangeJobType(e: any, handleChange: any) {
    setJobType(e.target.value);
    handleChange(e);

    if (e.target.value === "9064b3c3-1d1d-4da6-a3b4-22d11c94cfb3") {
      setAutoHide(false);
    } else {
      setAutoHide(true);
    }

    if (e.target.value !== "1890b9da-22b7-421c-87cd-6573aee5c8c8") {
      setIsPropertyChangeFieldsDisplay(false);
    }

    if (e.target.value === "57fc30aa-933c-4ca2-bd00-02a56ffc213c") {
      setIsHouseFieldsDisplay(true);
    } else {
      setIsHouseFieldsDisplay(false);
    }

    if (e.target.value !== "f6b38689-dca0-476d-aece-477391a6d422") {
      setIsCancellationFieldsDisplay(false);
    }
  }

  function onChangeJobSubType(e: any, handleChange: any) {
    handleChange(e);
    if (e.target.value === "a18415b3-a2d6-43c3-b747-83ecdef0455e") {
      setIsCancellationFieldsDisplay(true);
    } else {
      setIsCancellationFieldsDisplay(false);
    }

    if (
      e.target.value === "aaa59536-c57b-4fd6-b9ec-7b5f44956a22" ||
      e.target.value === "0a9e5a36-2066-41c3-9a96-27454d704306"
    ) {
      setIsHouseFieldsDisplay(true);
    } else {
      setIsHouseFieldsDisplay(false);
    }

    if (e.target.value === "ef2da095-ff4b-40cb-a9ed-4d0abc5398e8") {
      setIsHouseFieldsDisplay(false);
      setIsPropertyChangeFieldsDisplay(true);
    } else {
      setIsPropertyChangeFieldsDisplay(false);
    }
  }

  const [RelatedpayOffTypeDetail, setRelatedpayOffTypeDetail] =
    React.useState("");
  const [payOffTypeSubDetail, setPayOffTypeSubDetail] = React.useState("");
  const [payOffTypeSubDetailList, setPayOffTypeSubDetailList] = React.useState<
    SelectOption[]
  >([]);
  const [coverage, setCoverage] = React.useState<any[]>([]);
  const [usageDetail, setUsageDetail] = React.useState<any[]>([]);
  const [vehicleStatus, setVehicleStatus] = React.useState<any[]>([]);
  const [isUsed, setIsUsed] = React.useState<any[]>([]);
  const [gender, setGender] = React.useState<any[]>([]);
  const [principleDriver, setPrincipleDriver] = React.useState<any[]>([]);
  const [previousVIN, setPreviousVIN] = React.useState<string>("");
  const [foundVIN, setFoundVIN] = React.useState("");
  const [foundYear, setFoundYear] = React.useState("");
  const [foundModel, setFoundModel] = React.useState("");

  useEffect(() => {
    let year = previousVIN.substr(0, 4);
    setFoundYear(year);
    let seperatorIndex = previousVIN.indexOf("-", 0);
    let Model = previousVIN.slice(0, seperatorIndex);
    setFoundModel(Model);
    let oldVIN = previousVIN.slice(seperatorIndex + 1);
    setFoundVIN(oldVIN);
  }, [previousVIN]);

  function onChangePayOffTypeDetail(e: any, handleChange: any) {
    setRelatedpayOffTypeDetail(e.target.value);
    handleChange(e);
  }

  function onChangePayOffTypeSubDetail(e: any, handleChange: any) {
    setPayOffTypeSubDetail(e.target.value);
    handleChange(e);
  }

  function onChangeCoverage(e: any, handleChange: any) {
    setCoverage(e.target.value);
    handleChange(e);
  }

  function onChangeUsageType(e: any, handleChange: any) {
    setUsageType(e.target.value);
    handleChange(e);
  }

  function onChangeUsageDetail(e: any, handleChange: any) {
    setUsageDetail(e.target.value);
    handleChange(e);
  }

  function onChangeVehicleStatus(e: any, handleChange: any) {
    setVehicleStatus(e.target.value);
    handleChange(e);
  }

  function onChangeIsUsed(e: any, handleChange: any) {
    setIsUsed(e.target.value);
    handleChange(e);
  }

  function onChangeGender(e: any, handleChange: any) {
    setGender(e.target.value);
    handleChange(e);
  }

  function onChangePrincipleDriver(e: any, handleChange: any) {
    setPrincipleDriver(e.target.value);
    handleChange(e);
  }

  function onChangePreviousVIN(e: any, handleChange: any) {
    setPreviousVIN(e.target.value);
    handleChange(e);
  }

  function handleChangePolicyNumberInput(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    e.preventDefault();
    setPolicyNumberInputChange(true);
  }

  useEffect(() => {
    let filteredList: SelectOption[] = [];
    if (RelatedpayOffTypeDetail && RelatedpayOffTypeDetailListOriginal) {
      RelatedpayOffTypeDetailListOriginal.map((detail) => {
        if (detail && detail.PayOffType_Id === RelatedpayOffTypeDetail) {
          detail.cm_payofftypedetail.map((entry: any) => {
            filteredList.push({
              name: entry.PayOffTypeSubDetail,
              value: entry.PayOffTypeDetail_Id,
            });
          });
        }
      });
    }
    setPayOffTypeSubDetailList(filteredList);
  }, [RelatedpayOffTypeDetail, RelatedpayOffTypeDetailListOriginal]);

  return (
    <div>
      <TaskHistoryDialog
        open={false}
        close={() => {
          setTaskHistoryDialogOpen(false);
        }}
      />
      <Dialog
        open={true}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}>
        <AppBar className="new-job-questionnaire-dialog-container">
          <Toolbar className="new-job-questionnaire-dialog">
            <Typography
              className="new-job-questionnaire-title"
              variant="h6"
              component="div">
              Auto Questionnaire
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <AutoFormContainer>
          <AutoFieldContainer>
            <Formik
              initialValues={initialPolicyStates}
              onSubmit={handlePhoneSearch}
            >

              {({
                errors,
                values,
                touched,
                setValues,
                handleChange,
                setFieldValue,
              }) => (
                <Form hidden={checkPhoneNumberButtonClicked}>
                  <DialogTitle>Search</DialogTitle>
                  <DialogContent>
                    {checkPhoneNumberInput === 2 && (
                      <Alert
                        className="check-phone-number-input-alert"
                        severity="error"
                      >

                        This field cannot be empty, please enter the phone
                        number or SKIP
                      </Alert>
                    )}
                    <Typography
                      className="recent-calls-prompt-text"
                      variant="body2"
                    >

                      The recent calls list
                    </Typography>
                    <SelectFieldWrapper
                      required={false}
                      name={`RecentCalls`}
                      type="select"
                      label="Recent Calls"
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldValue("ClientPhoneNumber", e.target.value);
                      }}
                      options={recentCallsList}
                    />
                    <Typography
                      className="create-job-prompt-text"
                      variant="body2"
                    >

                      Please enter a phone number to search the associated
                      policy numbers, or SKIP
                    </Typography>
                    <FieldWrapper
                      name="ClientPhoneNumber"
                      type="text"
                      label="Client Phone Number"
                      required={false}
                      hidden={false}
                    />
                  </DialogContent>
                  <DialogActions className="new-job-questionnaire-dialog-actions">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setShowPolicyNumberInputField(1);
                        setSkipPhoneNumberInput(1);
                        setCheckPhoneNumberButtonClicked(true);
                      }}
                    >

                      <span>Skip</span>
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={loadingPhoneSearch}
                    >

                      {loadingPhoneSearch && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Search</span>
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
            {showPolicyNumberInputField === 1 && (
              <Formik
                initialValues={initialPolicyStates}
                onSubmit={handlePolicySearch}>
                {({
                  errors,
                  values,
                  touched,
                  setValues,
                  handleChange,
                  setFieldValue,
                }) => (
                  <Form>
                    <DialogContent>
                      {skipPhoneNumberInput === 1 ? (
                        <>
                          <Typography
                            className="create-job-prompt-text"
                            variant="body2">
                            Please Enter a policy number or leave it blank.
                            Click button to continue. Letters and numbers ONLY.
                          </Typography>
                          <FieldWrapper
                            name="PolicyNumberInput"
                            type="text"
                            label="Policy Number"
                            required={false}
                          />
                        </>
                      ) : (
                        <>
                          {checkPhoneNumberInput === 1 ? (
                            <>
                              <Alert
                                className="check-phone-number-input-alert"
                                severity="error"
                                hidden={policyNumberInputChange}>
                                Can't find any policy number associated to the
                                phone number entered
                              </Alert>
                              <Typography
                                className="create-job-prompt-text"
                                variant="body2">
                                Please Enter a policy number or leave it blank.
                                Click button to continue. <br /> Input only
                                letters and numbers.
                              </Typography>
                              <FieldWrapper
                                name="PolicyNumberInput"
                                type="text"
                                label="Policy Number"
                                required={false}
                                onChange={handleChangePolicyNumberInput}
                              />
                            </>
                          ) : (
                            <>
                              <Typography
                                className="create-job-prompt-text"
                                variant="body2">
                                Please select the policy number from list, enter
                                a new one or leave it blank. Click button to
                                continue. <br />
                                Input only letters and numbers.
                              </Typography>
                              <SelectFieldWrapper
                                required={false}
                                name={`PolicyNumber`}
                                type="select"
                                label="Policy Number"
                                onChange={(e: any) => {
                                  handleChange(e);
                                  setFieldValue(
                                    "PolicyNumberInput",
                                    e.target.value
                                  );
                                  // console.log(e.target.value);
                                  setPolicyNum(e.target.value);
                                }}
                                options={policyNumberList}
                              />
                              <FieldWrapper
                                name="PolicyNumberInput"
                                type="text"
                                label="Policy Number"
                                required={false}
                              />
                            </>
                          )}
                        </>
                      )}
                    </DialogContent>
                    <DialogActions className="new-job-questionnaire-dialog-actions">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loadingPolicySearch}
                        onClick={() => {
                          dispatch(retrieveTaskHistory([]));
                          setTaskHistoryDialogOpen(true);
                          setPolicyNumberInputChange(true);
                        }}>
                        {loadingPolicySearch && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}

                        <span>GET DETAILS</span>
                        {/* {console.log(taskHistory)} */}
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            )}

            <Formik
              initialValues={initialAutoStates}
              onSubmit={handleAutoSubmit}>
              {({ errors, values, touched, setValues, handleChange }) => (
                <Form hidden={checkGetDetailsClicked}>
                  <DialogContent>
                    <SelectFieldWrapper
                      name={`JobType`}
                      type="select"
                      label="Job Type"
                      options={generateJobTypeListOptions2()}
                      onChange={(e: any) => onChangeJobType(e, handleChange)}
                      required={true}
                    />
                    <SelectFieldWrapper
                      name={`JobSubType`}
                      type="select"
                      label="JobSubType"
                      options={jobSubTypeList}
                      onChange={(e: any) => onChangeJobSubType(e, handleChange)}
                      required={true}
                    />
                  </DialogContent>

                  <DialogTitle>Client Information</DialogTitle>
                  <DialogContent>
                    <FieldWrapperWithMount
                      name={`CRM_Client_Name`}
                      value={
                        foundClientName
                          ? foundClientName
                          : values.CRM_Client_Name
                      }
                      onChange={(e: any) =>
                        onChangeFoundClientName(e, handleChange)
                      }
                      type="text"
                      label="Client Name"
                      required={false}
                    />
                    <FieldWrapperWithMount
                      name={`CRM_Client_Phone`}
                      value={
                        foundClientPhone
                          ? foundClientPhone
                          : values.CRM_Client_Phone
                      }
                      onChange={(e: any) =>
                        onChangeFoundClientPhone(e, handleChange)
                      }
                      type="text"
                      label="Client Phone Number"
                      required={false}
                    />
                    <FieldWrapperWithMount
                      name={`CRM_Client_Email`}
                      value={foundEmail ? foundEmail : values.CRM_Client_Email}
                      onChange={(e: any) => onChangeFoundEmail(e, handleChange)}
                      type="text"
                      label="Client Email"
                      required={false}
                    />
                  </DialogContent>

                  <FieldArray name="drivers">
                    {() =>
                      values.drivers.map((driver, i) => {
                        const driverErrors =
                          (errors.drivers?.length && errors.drivers[i]) || {};
                        const driverTouched =
                          (touched.drivers?.length && touched.drivers[i]) || {};
                        return (
                          <div>
                            <DialogTitle hidden={autoHide}>
                              Driver Information {i + 1}
                            </DialogTitle>
                            <DialogContent>
                              <FieldWrapperWithMount
                                name={`drivers.${i}.Name`}
                                value={
                                  i === 0 && foundName
                                    ? foundName
                                    : values.drivers[i].Name
                                }
                                onChange={(e: any) =>
                                  onChangeFoundName(e, handleChange)
                                }
                                type="text"
                                label="Name"
                                hidden={autoHide}
                                required={false}
                              />
                              <FieldWrapperWithMount
                                name={`drivers.${i}.PhoneNumber`}
                                value={
                                  i === 0 && foundPhone
                                    ? foundPhone
                                    : values.drivers[i].PhoneNumber
                                }
                                onChange={(e: any) =>
                                  onChangeFoundPhone(e, handleChange)
                                }
                                type="text"
                                label="Phone Number"
                                hidden={autoHide}
                                required={false}
                              />
                              <FieldWrapper
                                name={`drivers.${i}.Address`}
                                type="text"
                                label="Address"
                                required={false}
                                hidden={autoHide}
                              />
                              <SelectFieldWrapper
                                name={`drivers.${i}.Gender`}
                                type="select"
                                label="Gender"
                                onChange={(e: any) =>
                                  onChangeGender(e, handleChange)
                                }
                                required={false}
                                hidden={autoHide}
                                options={[
                                  { value: "female", name: "Female" },
                                  { value: "male", name: "Male" },
                                  { value: "others", name: "Others" },
                                ]}
                              />
                              <FieldWrapperWithMount
                                name={`drivers.${i}.DateOfBirth`}
                                value={
                                  i === 0 && foundBirthdate
                                    ? foundBirthdate
                                    : values.drivers[i].DateOfBirth
                                }
                                onChange={(e: any) =>
                                  onChangeFoundBirthdate(e, handleChange)
                                }
                                type="date"
                                label="Date Of Birth"
                                required={false}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                                hidden={autoHide}
                              />
                              <FieldWrapper
                                name={`drivers.${i}.LicenceNumber`}
                                type="text"
                                label="Licence Number"
                                required={false}
                                hidden={autoHide}
                              />
                              <FieldWrapper
                                name={`drivers.${i}.LicenceYear`}
                                type="text"
                                label="Licence Year"
                                required={false}
                                hidden={autoHide}
                              />
                              <SelectFieldWrapper
                                name={`drivers.${i}.PrincipleDriver`}
                                type="select"
                                label="PrincipleDriver"
                                onChange={(e: any) =>
                                  onChangePrincipleDriver(e, handleChange)
                                }
                                required={false}
                                hidden={autoHide}
                                options={[
                                  { value: "true", name: "True" },
                                  { value: "false", name: "False" },
                                ]}
                              />
                            </DialogContent>
                          </div>
                        );
                      })
                    }
                  </FieldArray>
                  <DialogActions className="new-job-questionnaire-dialog-add-driver-action">
                    <IconButton
                      className="new-job-questionnaire-dialog-add-driver-button"
                      hidden={autoHide}
                      onClick={(e) => onChangeDrivers(e, values, setValues)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </DialogActions>

                  <DialogTitle hidden={autoHide}>Auto Information</DialogTitle>
                  <DialogContent hidden={false}>
                    <SelectFieldWrapper
                      required={false}
                      name={`PreviousVIN`}
                      type="select"
                      label="Previous VIN"
                      onChange={(e: any) =>
                        onChangePreviousVIN(e, handleChange)
                      }
                      hidden={autoHide}
                      options={oldVInList}
                    />
                    <FieldWrapperWithMount
                      name={`VIN`}
                      value={foundVIN ? foundVIN : values.VIN}
                      onChange={(e: any) => onChangeFoundVIN(e, handleChange)}
                      type="text"
                      label="VIN"
                      required={false}
                      hidden={autoHide}
                    />
                    <FieldWrapperWithMount
                      name={`Model`}
                      value={foundModel ? foundModel : values.Model}
                      onChange={(e: any) => onChangeFoundModel(e, handleChange)}
                      type="text"
                      label="Model"
                      required={false}
                      hidden={autoHide}
                    />
                    <FieldWrapperWithMount
                      name={`Year`}
                      value={foundYear ? foundYear : values.Year}
                      onChange={(e: any) => onChangeFoundYear(e, handleChange)}
                      type="text"
                      label="Year"
                      required={false}
                      hidden={autoHide}
                    />
                    <SelectFieldWrapper
                      name={`IsUsed`}
                      type="select"
                      label="Is Used"
                      onChange={(e: any) => onChangeIsUsed(e, handleChange)}
                      required={false}
                      hidden={autoHide}
                      options={[
                        { value: "true", name: "True" },
                        { value: "false", name: "False" },
                      ]}
                    />
                    <FieldWrapper
                      name="IfParkReason"
                      type="text"
                      label="If Park, Reason"
                      required={false}
                      hidden={autoHide}
                    />
                    <FieldWrapperWithMount
                      name={`StartEffectiveDate`}
                      value={values.StartEffectiveDate}
                      onChange={(e: any) =>
                        onChangeFoundStartEffectiveDate(e, handleChange)
                      }
                      type="date"
                      label="Start Effective Date"
                      required={false}
                      hidden={autoHide}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <FieldWrapperWithMount
                      name={`EndEffectiveDate`}
                      value={
                        foundEndEffectiveDate
                          ? foundEndEffectiveDate
                          : values.EndEffectiveDate
                      }
                      onChange={(e: any) =>
                        onChangeFoundEndEffectiveDate(e, handleChange)
                      }
                      type="date"
                      label="EndEffectiveDate"
                      required={false}
                      hidden={autoHide}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <SelectFieldWrapper
                      name={`PayOffType`}
                      type="select"
                      label="Pay Off Mode"
                      options={generatePayOffModeListOptions2()}
                      onChange={(e: any) => onChangePayOffType(e, handleChange)}
                      required={false}
                      hidden={autoHide}
                    />
                    <SelectFieldWrapper
                      name={`PayOffTypeDetail`}
                      type="select"
                      label="Pay Off Type Detail"
                      options={RelatedpayOffTypeDetailList}
                      onChange={(e: any) =>
                        onChangePayOffTypeDetail(e, handleChange)
                      }
                      required={false}
                      hidden={autoHide}
                    />
                    <SelectFieldWrapper
                      name={`PayOffTypeSubDetail`}
                      type="select"
                      label="Pay Off Type Sub Detail"
                      options={payOffTypeSubDetailList}
                      onChange={(e: any) =>
                        onChangePayOffTypeSubDetail(e, handleChange)
                      }
                      required={false}
                      hidden={true}
                    />
                    <FieldWrapper
                      name="Finance_Lease_Company_Info"
                      type="text"
                      label="Finance Lease Company Info"
                      required={false}
                      hidden={autoCompanyHide}
                    />
                    <SelectFieldWrapper
                      name={`Coverage`}
                      type="select"
                      label="Coverage Type"
                      options={coverageList}
                      onChange={(e: any) => onChangeCoverage(e, handleChange)}
                      required={false}
                      hidden={autoHide}
                    />

                    <SelectFieldWrapper
                      name={`UsageType`}
                      type="select"
                      label="Usage Type"
                      options={generateUsageTypeListOptions2()}
                      onChange={(e: any) => onChangeUsageType(e, handleChange)}
                      required={false}
                      hidden={autoHide}
                    />
                    <SelectFieldWrapper
                      name={`UsageDetail`}
                      type="select"
                      label="Usage Detail"
                      options={RelatedUsageDetailList}
                      onChange={(e: any) =>
                        onChangeUsageDetail(e, handleChange)
                      }
                      required={false}
                      hidden={true}
                    />
                    <FieldWrapper
                      name="Auto_Usage_Details"
                      type="text"
                      label="Usage Details"
                      required={false}
                      hidden={autoCompanyHide}
                    />
                    <SelectFieldWrapper
                      name={`VehicleStatusDescription`}
                      type="select"
                      label="Vehicle Status Description"
                      options={vehicleStatusList}
                      onChange={(e: any) =>
                        onChangeVehicleStatus(e, handleChange)
                      }
                      required={false}
                      hidden={autoHide}
                    />
                    {renderHouseFields}
                    {renderCancellationFields}
                    {renderPropertyChangeFields}
                  </DialogContent>

                  <DialogTitle>Task Information</DialogTitle>
                  <DialogContent>
                    <FieldWrapper
                      name="TaskDescription"
                      type="text"
                      label="Task Description"
                      required={true}
                    />
                    <SelectFieldWrapper
                      name={`Priority`}
                      type="select"
                      label="Priority"
                      options={priorityList}
                      required={true}
                    />
                    <SelectFieldWrapper
                      name={`AssignTo`}
                      type="select"
                      label="Assign To"
                      options={assignToList}
                      required={true}
                    />
                    {(JobType === "9064b3c3-1d1d-4da6-a3b4-22d11c94cfb3" ||
                      isCancellationFieldsDisplay ||
                      isPropertyChangeFieldsDisplay) && (
                      <>
                        <div id="checkbox-group">Send PDF</div>
                        <div role="group" aria-labelledby="checkbox-group">
                          <label>
                            <Field
                              type="checkbox"
                              name="checked"
                              value="One"
                              style={{ marginRight: 5 }}
                              disabled={
                                values.checked[0] === "Two" ||
                                values.checked[0] === "Three"
                              }
                            />
                            Via Text Message
                          </label>
                          <label>
                            <Field
                              type="checkbox"
                              name="checked"
                              value="Two"
                              style={{ marginRight: 5 }}
                              disabled={
                                values.checked[0] === "One" ||
                                values.checked[0] === "Three"
                              }
                            />
                            Via Email
                          </label>
                          <label>
                            <Field
                              type="checkbox"
                              name="checked"
                              value="Three"
                              style={{ marginRight: 5 }}
                              disabled={
                                values.checked[0] === "One" ||
                                values.checked[0] === "Two"
                              }
                            />
                            Via Both Text & Email
                          </label>
                        </div>
                      </>
                    )}
                  </DialogContent>

                  <DialogActions className="new-job-questionnaire-dialog-actions">
                    <OutlinedPrimaryButton
                      className="new-job-questionnaire-cancel-button"
                      onClick={handleClose}>
                      Cancel
                    </OutlinedPrimaryButton>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className="new-job-questionnaire-preview-button"
                      hidden={autoHide}
                      onClick={async () => {
                        let pdfFilledInfo: any = values;
                        if (!pdfFilledInfo.CRM_Client_Name && foundClientName) {
                          pdfFilledInfo.CRM_Client_Name = foundClientName;
                        }
                        if (!pdfFilledInfo.CRM_Client_Email && foundEmail) {
                          pdfFilledInfo.CRM_Client_Email = foundEmail;
                        }
                        if (
                          !pdfFilledInfo.CRM_Client_Phone &&
                          foundClientPhone
                        ) {
                          pdfFilledInfo.CRM_Client_Phone = foundClientPhone;
                        }
                        // if (
                        //   !pdfFilledInfo.StartEffectiveDate &&
                        //   foundStartEffectiveDate
                        // ) {
                        //   pdfFilledInfo.StartEffectiveDate =
                        //     foundStartEffectiveDate;
                        // }
                        if (!pdfFilledInfo.Policy_Number) {
                          pdfFilledInfo.Policy_Number = policyNum;
                        }
                        const bytes = await fillPolicyChangeForm(pdfFilledInfo);
                        const withoutBraceBytes = bytes.slice(1, -1);
                        const arrayBufferBytes = await base64ToArrayBuffer(
                          withoutBraceBytes
                        );
                        download(
                          arrayBufferBytes,
                          "CSIOPolicy",
                          "application/pdf"
                        );
                      }}>
                      Preview
                    </Button>
                    {isCancellationFieldsDisplay && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="new-job-questionnaire-preview-button"
                        onClick={async () => {
                          const policyNumber = values.Policy_Number
                            ? values.Policy_Number
                            : policyNum;

                          const pdfFilledInfo: ICancellationInfo = {
                            insuranceCompany:
                              cancellationValues.insuranceCompany,
                            insuredAddress: cancellationValues.insuredAddress,
                            insuredFullName: cancellationValues.insuredFullName,
                            insuredUsage: cancellationValues.insuredUsage,
                            cancellationDate:
                              cancellationValues.cancellationDate,
                            postalCode: cancellationValues.postalCode,
                            remarks: cancellationValues.remarks,
                            Policy_Number: policyNumber,
                          };
                          const bytes = await fillCancellationRequestForm(
                            pdfFilledInfo
                          );
                          const withoutBraceBytes = bytes.slice(1, -1);
                          const arrayBufferBytes = await base64ToArrayBuffer(
                            withoutBraceBytes
                          );
                          download(
                            arrayBufferBytes,
                            "Cancellation  Reinstatement Request",
                            "application/pdf"
                          );
                        }}>
                        Preview
                      </Button>
                    )}
                    {isPropertyChangeFieldsDisplay && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="new-job-questionnaire-preview-button"
                        onClick={async () => {
                          const pdfFilledInfo: IPropertyChangeInfo = {
                            insuranceCompany:
                              propertyChangeValue.insuranceCompany,
                            insurancePolicyNumber:
                              propertyChangeValue.insurancePolicyNumber,
                            insuredFullName:
                              propertyChangeValue.insuredFullName,
                            insuredAddress: propertyChangeValue.insuredAddress,
                            postalCode: propertyChangeValue.postalCode,
                            effectiveDate: propertyChangeValue.effectiveDate,
                            remarks: propertyChangeValue.remarks,
                          };
                          const bytes =
                            await fillPropertyPolicyChangeRequestForm(
                              pdfFilledInfo
                            );
                          const withoutBraceBytes = bytes.slice(1, -1);
                          const arrayBufferBytes = await base64ToArrayBuffer(
                            withoutBraceBytes
                          );
                          download(
                            arrayBufferBytes,
                            "Habitational Policy Change Request",
                            "application/pdf"
                          );
                        }}>
                        Preview
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="success"
                      className="new-job-questionnaire-save-button"
                      type="submit"
                      disabled={loadingSave}>
                      {loadingSave && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Save</span>
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </AutoFieldContainer>
        </AutoFormContainer>
        {/* get details dialog open, show task history */}
        {/* 
        <dialog
          open={policyTaskHistoryDialog}
          className="policy-task-history-detail-dialog"
        >
          <DialogTitle>
            Task History
            <IconButton
              onClick={handleClosePolicyTaskHistoryDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider variant="middle"></Divider>
          <DialogContent></DialogContent>
        </dialog> */}
        {/* //========================================= */}
      </Dialog>
    </div>
  );
};

export default AutoQuestionaire1;
