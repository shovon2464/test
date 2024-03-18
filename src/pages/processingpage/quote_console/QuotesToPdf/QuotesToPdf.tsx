import React from "react";
// @ts-ignore:next-line
import download from "downloadjs";
import { Button } from "@mui/material";
import { IQuoteDetailsProps } from "../../../../interfaces/quote/IQuoteDetailsProps";
import { IQuoteListTable } from "../../../../interfaces/quote/IQuoteListTable";
import QuotePdfCreator from "../../../../components/share_components/PdfCreator/QuoteInfoPdfCreator";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface IQuoteInfo extends IQuoteListTable {
  quoteDetailArray: [string, any][];
}

const QuotesToPdf: React.FC<IQuoteDetailsProps> = ({
  quoteDetails,
  rowValue,
}) => {
  const quoteDetailObj: object = JSON.parse(quoteDetails);
  const quoteDetailFields = Object.entries(quoteDetailObj);
  const quote_info: IQuoteInfo = {
    id: rowValue.id,
    FullName: rowValue.FullName,
    Address1: rowValue.Address1,
    Address2: rowValue.Address2,
    Email: rowValue.Email,
    PhoneNumber: rowValue.PhoneNumber,
    PostalCode: rowValue.PostalCode,
    SubmitDate: rowValue.SubmitValue,
    QuoteDetail: rowValue.QuoteDetail,
    Type: rowValue.Type,
    Viewed: rowValue.Viewed,
    quoteDetailArray: quoteDetailFields,
  };
  const handleDownloadOnClick = () => {
    QuotePdfCreator(quote_info)
      .then((bytes) => {
        download(bytes, "QuoteTest", "application/pdf");
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  };

  return (
    <Button
      variant="contained"
      startIcon={<FileDownloadIcon />}
      color="info"
      onClick={handleDownloadOnClick}
      sx={{ marginLeft: 5 }}
    >
      Download
    </Button>
  );
};

export default QuotesToPdf;
