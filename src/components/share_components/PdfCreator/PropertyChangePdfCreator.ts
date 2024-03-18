import { PDFDocument } from "pdf-lib";
// @ts-ignore:next-line
import HPCPolicy from "../../../doc/pdf/HabitationalPolicyChangeRequest.pdf";
import { TPropertyChange } 
from "../../../pages/processingpage/create_job/questionaire/property_questionaire/PropertyChange";
import { getBrokerName } from "./PolicyChangePdfCreator";
export interface IPropertyChangeInfo extends TPropertyChange {
  
}

export const fillPropertyPolicyChangeRequestForm = async (
  fill_info: IPropertyChangeInfo
) => {
  const formArrayBufferBytes = await fetch(HPCPolicy).then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(formArrayBufferBytes, { ignoreEncryption: true });
  const policyChangeForm = pdfDoc.getForm();

  const insuranceCompany = policyChangeForm.getTextField("InsuranceCompany");
  const insurancePolicyNumber = policyChangeForm.getTextField("InsurancePolicyNumber");
  const insuranceCompany_2 = policyChangeForm.getTextField("InsuranceCompany_2");
  const insurancePolicyNumber_2 = policyChangeForm.getTextField("InsurancePolicyNumber_2");
  const insuredFullNameField = policyChangeForm.getTextField("InsuredFullName");
  const insuredAddressField = policyChangeForm.getTextField("InsuredAddress");
  const insuredPostalField = policyChangeForm.getTextField("InsuredPostalCode");
  const effectiveDateField =
    policyChangeForm.getTextField("EffectiveDate");
  const remarksField = policyChangeForm.getTextField("Remarks");
  const brokerNameField = policyChangeForm.getTextField("BrokerPrintName");
  const brokerSignedDate = policyChangeForm.getTextField("BrokerSignedDate");

  insuranceCompany.setText(fill_info.insuranceCompany);
  insuranceCompany.setFontSize(11);
  insuranceCompany.enableReadOnly();

  insuranceCompany_2.setText(fill_info.insuranceCompany);
  insuranceCompany_2.setFontSize(11);
  insuranceCompany_2.enableReadOnly();

  insurancePolicyNumber_2.setText(fill_info.insurancePolicyNumber);
  insurancePolicyNumber_2.enableReadOnly();

  insurancePolicyNumber.setText(fill_info.insurancePolicyNumber);
  insurancePolicyNumber.enableReadOnly();

  insuredFullNameField.setText(fill_info.insuredFullName);
  insuredFullNameField.setFontSize(11);
  insuredFullNameField.enableReadOnly();
  
  insuredAddressField.setText(fill_info.insuredAddress);
  insuredAddressField.enableReadOnly();

  insuredPostalField.setText(fill_info.postalCode);
  insuredPostalField.setFontSize(11);
  insuredPostalField.enableReadOnly();

  effectiveDateField.setText(
    fill_info.effectiveDate
      ? fill_info.effectiveDate
      : new Date().toDateString()
  );
  effectiveDateField.enableReadOnly();
  remarksField.setText(fill_info.remarks);
  remarksField.enableReadOnly();

  brokerNameField.setText(getBrokerName());
  brokerNameField.enableReadOnly();

  brokerSignedDate.setText(new Date().toDateString().substring(4));
  brokerSignedDate.enableReadOnly();

  const filledPdfBytes = await pdfDoc.saveAsBase64();

  const filledPdfBytesWithBrace = "{" + filledPdfBytes + "}";

  return filledPdfBytesWithBrace;
};
