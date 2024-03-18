// @ts-ignore:next-line
import CSIOPolicy from "../../../doc/pdf/CSIOPolicy.pdf";
import { PDFDocument } from "pdf-lib";
import { toArrayBuffer } from "./ToArrayBuffer";
import { toBase64 } from "./ToBase64";
import { AutoList } from "../../../pages/processingpage/create_job/questionaire/auto_questionaire/VehicleQuestionaire";

export const getBrokerName = () => {
  const userInfo = localStorage.getItem("user");
  let brokerName: string;
  if (userInfo) {
    const user = JSON.parse(userInfo);
    brokerName = user.Name;
    return brokerName;
  } else {
    brokerName = "";
    return brokerName;
  }
};

export const fillPolicyChangeForm = async (fill_info: AutoList) => {
  const formArrayBufferBytes = await fetch(CSIOPolicy).then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(formArrayBufferBytes);
  const policyChangeForm = pdfDoc.getForm();

  const autoPolicyNumField = policyChangeForm.getTextField("AutoPolicyNumber");

  const clientNameField = policyChangeForm.getTextField("ClientFullName");

  const clientPostalAddress = policyChangeForm.getTextField(
    "ClientPostalAddress"
  );

  const companyNameField = policyChangeForm.getTextField("CompanyName");

  const companyAddressField = policyChangeForm.getTextField("CompanyAddress");

  const companyPostalCodeField =
    policyChangeForm.getTextField("CompanyPostalCode");

  const policyEffectiveDateField = policyChangeForm.getTextField(
    "PolicyEffectiveDate"
  );
  const vehicleAddStatusField = policyChangeForm.getTextField("VehicleAdd");

  const vehicleDeleteStatusField =
    policyChangeForm.getTextField("VehicleDelete");

  const vehicleChangeStatusField =
    policyChangeForm.getTextField("VehicleChange");

  const vehicleSubstituteStatusField =
    policyChangeForm.getTextField("VehicleSubstitute");

  const previousVinField = policyChangeForm.getTextField("VehiclePreviousVIN");

  const vehicleYearField = policyChangeForm.getTextField("VehicleYear");

  const vehicleModelField = policyChangeForm.getTextField("VehicleModel");

  const vinField = policyChangeForm.getTextField("VehicleVinNumber");

  const vehicleIsUsedField = policyChangeForm.getTextField("VehicleUsed");

  const pleasureUseField = policyChangeForm.getTextField("VehiclePleasureUse");

  const businessUseField = policyChangeForm.getTextField("VehicleBusinessUse");

  const collisionField = policyChangeForm.getTextField("VehicleCollision");

  const comprehensiveField = policyChangeForm.getTextField(
    "VehicleComprehensive"
  );

  const taskDesField = policyChangeForm.getTextField("VehicleTasKDescription");

  const brokerNameField = policyChangeForm.getTextField("BrokerPrintName");

  const brokerSignedDate = policyChangeForm.getTextField("BrokerSignedDate");

  brokerSignedDate.setText(new Date().toDateString());
  brokerSignedDate.enableReadOnly();

  autoPolicyNumField.setText(fill_info.Policy_Number);
  autoPolicyNumField.enableReadOnly();

  clientNameField.setText(fill_info.CRM_Client_Name);
  clientNameField.enableReadOnly();

  clientPostalAddress.setText(fill_info.drivers[0].Address);
  clientNameField.enableReadOnly();

  companyNameField.setText("UW INSURE BROKER");
  companyNameField.enableReadOnly();

  companyAddressField.setText("12408 108Ave NW");
  companyAddressField.enableReadOnly();

  companyPostalCodeField.setText("T5M 0H3");
  companyPostalCodeField.enableReadOnly();

  policyEffectiveDateField.setText(fill_info.StartEffectiveDate);
  policyEffectiveDateField.enableReadOnly();

  vehicleYearField.setText(fill_info.Year.toString());
  vehicleYearField.enableReadOnly();

  vehicleModelField.setText(fill_info.Model);
  vehicleModelField.enableReadOnly();

  vinField.setText(fill_info.VIN);
  vinField.enableReadOnly();

  vehicleIsUsedField.setText("X");
  vehicleIsUsedField.enableReadOnly();

  pleasureUseField.setText("X");
  pleasureUseField.enableReadOnly();

  collisionField.setText("X");
  collisionField.enableReadOnly();

  comprehensiveField.setText("X");
  comprehensiveField.enableReadOnly();

  taskDesField.setText(fill_info.TaskDescription);
  taskDesField.enableReadOnly();

  brokerNameField.setText(getBrokerName());
  brokerNameField.enableReadOnly();

  businessUseField.enableReadOnly();

  switch (fill_info.JobSubType) {
    case "dfdbce77-46a6-43ad-8370-235c64023b78":
      vehicleAddStatusField.setText("X");
      break;
    case "b692ba89-d035-4024-91a9-480f047757e0":
      vehicleChangeStatusField.setText("X");
      break;
    case "5aceef07-7ec3-4ea8-81ea-5a7a176618f5":
      vehicleDeleteStatusField.setText("X");
      break;
    case "3f35195b-5002-4e42-a41e-66fe360708c7":
      vehicleSubstituteStatusField.setText("X");
      break;
    default:
      break;
  }
  vehicleAddStatusField.enableReadOnly();

  vehicleChangeStatusField.enableReadOnly();

  vehicleDeleteStatusField.enableReadOnly();

  vehicleSubstituteStatusField.enableReadOnly();

  previousVinField.setText(fill_info.PreviousVIN);
  previousVinField.enableReadOnly();

  const filledPdfBytes = await pdfDoc.saveAsBase64();

  const filledPdfBytesWithBrace = "{" + filledPdfBytes + "}";

  return filledPdfBytesWithBrace;
};
