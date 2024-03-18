import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate } from "react-router-dom";
import {
  retrieveAllQuotes,
  retrieveQuotes,
  retrieveQuotesList,
  fetchAndSaveWebQuotesListIntoDB,
} from "../../../../action_creators/quote/quote_list";
import EventBus from "../../../../app/EventBus";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@mui/x-data-grid";
import { IQuoteListTable } from "../../../../interfaces/quote/IQuoteListTable";
import ViewQuotesDetail from "../QuotesDetail/ViewQuotesDetail";
import QuoteToTask from "../QuoteToTask/QuoteToTask";
import { getBrokerName } from "../../../../components/share_components/PdfCreator/PolicyChangePdfCreator";
import { retrieveUsersList } from "../../../../action_creators/task/user/user_list";
import { retrieveJobTypesList } from "../../../../action_creators/task/job_type/job_type";
import QuotesToPdf from "../QuotesToPdf/QuotesToPdf";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import "../../../../style_components/processingpages/quote_console/quoteConsole.css";
import { IQuickQuoteTable } from "../../../../interfaces/quote/IAllQuoteTable";
import { CheckBox, CompareSharp } from "@mui/icons-material";
import DeleteAllQuotes from "../QuotesDeleteAll/QuotesDeleteAll";

const QuotesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = key();
  const history = useNavigate();
  const userName = getBrokerName();
  let user_id = "";
  const retrieveWebQuote = useAppSelector((state) => state.quoteList.webQuotes);
  const retrieveQuickQuote = useAppSelector(
    (state) => state.quoteList.quickQuotes
  );
  const getUserList = useAppSelector((state) => state.userList.users);
  const quoteListState = useAppSelector((state) => state.quoteList.quoteState);
  const retrieveAllQuotesFromERP = useAppSelector(
    (state) => state.allQuote.allQuotes
  );
  const [isShowAllQuotes, setIsShowAllQuotes] = React.useState(0);

  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      // dispatch(retrieveQuotesList({}));
      dispatch(fetchAndSaveWebQuotesListIntoDB({}));
      dispatch(retrieveUsersList({}));
      dispatch(retrieveJobTypesList({}));
      dispatch(retrieveQuotes(0));
      dispatch(retrieveQuotes(1));
      if (quoteListState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  if (getUserList.length > 0) {
    getUserList.forEach((value) => {
      if (value.name === userName) {
        user_id = value.user_id;
      }
    });
  }

  const quoteColumns: GridColDef[] = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "FullName",
      headerName: "Perspective Client",
      width: 150,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone #",
      width: 150,
    },
    {
      field: "Email",
      headerName: "Email Address",
      width: 250,
    },
    {
      field: "Address1",
      headerName: "Address",
      width: 250,
    },
    {
      field: "Address2",
      headerName: "Unit No.",
      width: 85,
    },
    {
      field: "PostalCode",
      headerName: "Postal Code",
      width: 120,
    },
    {
      field: "SubmitDate",
      headerName: "Submit Date",
      width: 180,
    },
    {
      field: "QuoteDetail",
      headerName: "Quote Details",
      width: 180,
      renderCell: (params) => {
        console.log(params);
        const rowData = params.row;
        const quoteDetail = params.row.QuoteDetail;
        return (
          <ViewQuotesDetail rowValue={rowData} quoteDetails={quoteDetail} />
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        const rowData = params.row;
        const quoteDetail = params.row.QuoteDetail;
        return (
          <>
            <QuoteToTask
              rowValue={rowData}
              quoteDetails={quoteDetail}
              userId={user_id}
            />
            {/* <QuotesToPdf rowValue={rowData} quoteDetails={quoteDetail} /> */}
          </>
        );
      },
    },
  ];
  let webQuotes: IQuoteListTable[] = [];
  let quickQuotes: IQuickQuoteTable[] = [];

  if (retrieveWebQuote && retrieveWebQuote.length > 0) {
    retrieveWebQuote.forEach((value, index) => {
      let eachQuote: IQuoteListTable = {
        id: 0,
        Address1: "",
        Address2: "",
        Email: "",
        FullName: "",
        PhoneNumber: "",
        PostalCode: "",
        SubmitDate: "",
        QuoteDetail: "",
        Type: 0,
        Viewed: 0,
      };
      const rowNum = index + 1;
      eachQuote.id = rowNum;
      eachQuote.Address1 = value.Address1;
      eachQuote.Address2 = value.Address2;
      eachQuote.Email = value.Email;
      eachQuote.FullName = value.FullName;
      eachQuote.PhoneNumber = value.PhoneNumber;
      eachQuote.PostalCode = value.PostalCode;
      eachQuote.QuoteDetail = value.QuoteDetail;
      eachQuote.SubmitDate = value.SubmitDate;
      eachQuote.Type = 0;
      eachQuote.Viewed = value.Viewed;
      webQuotes.push(eachQuote);
    });
  }

  if (retrieveQuickQuote && retrieveQuickQuote.length > 0) {
    retrieveQuickQuote.forEach((value, index) => {
      let eachQuoteFromERP: IQuickQuoteTable = {
        id: 0,
        Address1: "",
        Address2: "",
        Email: "",
        FullName: "",
        PhoneNumber: "",
        PostalCode: "",
        SubmitDate: "",
        QuoteDetail: "",
        Type: 1,
        Viewed: 0,
      };

      const rowNum = index + 1;
      eachQuoteFromERP.id = rowNum;
      eachQuoteFromERP.Address1 = value.Address1;
      eachQuoteFromERP.Address2 = value.Address2;
      eachQuoteFromERP.Email = value.Email;
      eachQuoteFromERP.FullName = value.FullName;
      eachQuoteFromERP.PhoneNumber = value.PhoneNumber;
      eachQuoteFromERP.PostalCode = value.PostalCode;
      eachQuoteFromERP.SubmitDate = value.SubmitDate;
      eachQuoteFromERP.QuoteDetail = value.QuoteDetail.toString();
      eachQuoteFromERP.Type = 1;
      eachQuoteFromERP.Viewed = value.Viewed;
      quickQuotes.push(eachQuoteFromERP);
    });
  }

  // const rows: GridRowsProp = quoteRows.reverse();
  let rows: GridRowsProp = [];
  switch (isShowAllQuotes) {
    case 0:
      rows = webQuotes;
      break;
    case 1:
      rows = quickQuotes;
      break;
    default:
      break;
  }

  return (
    <div className="quote-console-table-container">
      <FormControl>
        <RadioGroup
          row
          name="quote-console-radio-button"
          defaultValue={isShowAllQuotes}
        >
          <FormControlLabel
            value={0}
            control={
              <Radio
                size="small"
                checkedIcon={<LensIcon />}
                onClick={() => {
                  setIsShowAllQuotes(0);
                }}
              />
            }
            label="Web Quote"
          />
          <FormControlLabel
            value={1}
            control={
              <Radio
                size="small"
                checkedIcon={<LensIcon />}
                onClick={() => {
                  setIsShowAllQuotes(1);
                }}
              />
            }
            label="Quick Quote"
          />
        </RadioGroup>
      </FormControl>
      <DeleteAllQuotes />
      <DataGrid
        className="quote-console-table"
        autoHeight
        columns={quoteColumns}
        rows={rows}
        pageSize={15}
      />
    </div>
  );
};

export default QuotesTable;
