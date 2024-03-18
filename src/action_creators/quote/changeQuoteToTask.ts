import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeQuoteToTask } from "../../services/quote/quote";

export interface IQuoteToTaskRequest {
  Address1: string;
  Address2: string;
  PostalCode: string;
  Task_Description: string;
  Assign_Date: Date;
  Create_By: string;
  Assign_By: string;
  Assign_To: string;
  QC_By: string;
  Job_Type_Id: string;
  Job_Sub_Type_Id: string;
  CRM_Client_Name: string;
  CRM_Client_Phone: string;
  CRM_Client_Email: string;
  Task_Quote_Details: string;
}
