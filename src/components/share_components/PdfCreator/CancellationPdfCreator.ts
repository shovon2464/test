import { PDFDocument } from "pdf-lib";
// @ts-ignore:next-line
import CRRPolicy from "../../../doc/pdf/CancellationReinstatementRequest.pdf";
import { TCancellation } from "../../../pages/processingpage/create_job/questionaire/Cancellation/Cancellation";
export interface ICancellationInfo extends TCancellation {
  Policy_Number: string;
}

export const fillCancellationRequestForm = async (
  fill_info: ICancellationInfo
) => {
  const formArrayBufferBytes = await fetch(CRRPolicy).then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(formArrayBufferBytes);
  const policyChangeForm = pdfDoc.getForm();

  const policyNumField = policyChangeForm.getTextField("CancelPolicyNumber");
  const insuranceCompany = policyChangeForm.getTextField("InsuranceCompany");
  const personalUsageField = policyChangeForm.getTextField("PersonalUsage");
  const commercialUsageField = policyChangeForm.getTextField("CommercialUsage");
  const insuredFullNameField = policyChangeForm.getTextField("InsuredFullName");
  const insuredPostalField = policyChangeForm.getTextField("InsuredPostalCode");
  const insuredAddressField = policyChangeForm.getTextField("InsuredAddress");
  const cancellationDateField =
    policyChangeForm.getTextField("CancellationDate");
  const remarksField = policyChangeForm.getTextField("Remarks");

  policyNumField.setText(fill_info.Policy_Number);
  policyNumField.enableReadOnly();

  insuranceCompany.setText(fill_info.insuranceCompany);
  insuranceCompany.setFontSize(11);
  insuranceCompany.enableReadOnly();

  insuredFullNameField.setText(fill_info.insuredFullName);
  insuredFullNameField.setFontSize(11);
  insuredFullNameField.enableReadOnly();

  insuredPostalField.setText(fill_info.postalCode);
  insuredPostalField.setFontSize(11);
  insuredPostalField.enableReadOnly();

  insuredAddressField.setText(fill_info.insuredAddress);
  insuredAddressField.enableReadOnly();

  cancellationDateField.setText(
    fill_info.cancellationDate
      ? fill_info.cancellationDate
      : new Date().toDateString()
  );
  cancellationDateField.enableReadOnly();
  remarksField.setText(fill_info.remarks);
  remarksField.enableReadOnly();

  switch (fill_info.insuredUsage) {
    case "personal":
      personalUsageField.setText("X");
      break;
    case "commercial":
      commercialUsageField.setText("X");
      break;
    default:
      break;
  }
  personalUsageField.enableReadOnly();
  commercialUsageField.enableReadOnly();

  const filledPdfBytes = await pdfDoc.saveAsBase64();

  const filledPdfBytesWithBrace = "{" + filledPdfBytes + "}";

  return filledPdfBytesWithBrace;
};
