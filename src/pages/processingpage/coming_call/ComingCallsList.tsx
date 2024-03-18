import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from "@mui/material";
import {
  ICRMComingCall,
  ICRMComingCallWithPredictVal,
  retrieveCRMComingCalls,
  retrieveComingCallsByPhoneNumber,
  retrieveComingCallsList,
} from "../../../action_creators/evaluation/coming_calls_list";
import { resetComingCalls } from "../../../features/evaluation/coming_calls/coming_callsSlice";
import { StyledTableCell } from "../../../components/evaluation_components/table_components/table_row_cell";
import { StyledTableRow } from "../../../components/share_components/CustomizedTable/CustomizedTable";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "../../../style_components/processingpages/coming_call/ComingCall.css";
import {
  ContainedInfoButton,
  ContainedWarningButton,
} from "../../../style_components/buttons/styled_contained_buttons";
import { resetCRMCalls } from "../../../features/evaluation/coming_calls/crm_coming_calls";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ComingCallsList: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(retrieveComingCallsList({}));
    dispatch(retrieveCRMComingCalls({}));
  }, [dispatch]);

  const comingCalls = useAppSelector((state) => state.coming_call.comingCalls);
  const CRMComingCalls = useAppSelector((state) => state.CRMCalls.CRMCalls);
  const rows: ICRMComingCallWithPredictVal[] = [];
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    if (searchInput !== "") {
      dispatch(resetComingCalls());
      dispatch(resetCRMCalls);
    }
    let formated_phone =
      searchInput.substring(0, 3) +
      "-" +
      searchInput.substring(3, 6) +
      "-" +
      searchInput.substring(6, 11);
    dispatch(retrieveComingCallsByPhoneNumber(formated_phone));
    checkInput = searchInput;
    setPage(0);
  };

  const resetQuery = () => {
    setSearchInput("");
    setPage(0);
    dispatch(retrieveComingCallsList({}));
    dispatch(retrieveCRMComingCalls({}));
  };

  let checkInput = "";

  const [searchInput, setSearchInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value.trim());
  };

  const searchStatus = useAppSelector(
    (state) => state.coming_call.comingCallState
  );

  const callColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        const name = params.row.name;
        return <>{name}</>;
      },
    },
    {
      field: "predict_value",
      headerName: "Predict Value",
      width: 150,
      renderCell: (params) => {
        const predictValue = params.row.predict_value;
        return <>{predictValue}</>;
      },
    },
    {
      field: "phone_number",
      headerName: "Phone",
      width: 200,
      renderCell: (params) => {
        const phone = params.row.phone_number;
        return <>{phone}</>;
      },
    },
    {
      field: "datetime",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        const date = params.row.datetime;

        return <>{date}</>;
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      renderCell: (params) => {
        const duration = params.row.duration;
        return <>{duration}</>;
      },
    },
    {
      field: "recording_url",
      headerName: "Recording",
      width: 100,
      align: "center",
      renderCell: (params) => {
        const url = params.row.recordingURL;
        return (
          <>
            <a href={url}>
              <IconButton>
                <PlayCircleIcon />
              </IconButton>
            </a>
          </>
        );
      },
    },
  ];

  if (CRMComingCalls && CRMComingCalls.length > 0) {
    CRMComingCalls.forEach((value, index) => {
      let eachCall: ICRMComingCallWithPredictVal = {
        name: "",
        predict_value: 0,
        phone_number: "",
        datetime: "",
        duration: "",
        recordingURL: "",
      };
      const rowNum = index + 1;
      const nameField = value.name;
      if (nameField !== "n/a") {
        const index = nameField.indexOf(" ");
        eachCall.name = nameField.substring(index + 1);
        eachCall.predict_value = parseInt(nameField.substring(0, index));
      } else {
        eachCall.name = "N/A";
        eachCall.predict_value = 0;
      }
      eachCall.phone_number = value.phone_number;
      eachCall.datetime = value.datetime;
      eachCall.duration = value.duration;
      eachCall.recordingURL = value.recordingURL;

      return rows.push(eachCall);
    });
  }

  return (
    <>
      <div>
        <div className="phone-number-search">
          <p className="search-bar-lable">
            Enter a phone number to find incoming call records:{" "}
          </p>
          <div className="search-input-n-button">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              placeholder="7801234567"
              onChange={handleChange}
              value={searchInput}
            />
            <Button onClick={handleClickOpen}>
              <ContainedInfoButton>Search</ContainedInfoButton>
            </Button>
            <Button className="phone-number-search-button" onClick={resetQuery}>
              <ContainedWarningButton>Reset</ContainedWarningButton>
            </Button>
          </div>

          {checkInput === "" && searchStatus === "ERROR" && (
            <Alert className="phone-number-search-alert" severity="warning">
              The phone number cannot be null or it does not entered in the
              correct format (e.g. 7801112222).
            </Alert>
          )}

          {searchStatus === "SUCCESS" && (
            <Alert className="phone-number-search-alert" severity="success">
              The call list retrieved.
            </Alert>
          )}
        </div>
        <div>
          {comingCalls.length <= 0 && (
            <>
              <Alert severity="error">
                There has no coming calls in the database.
              </Alert>
            </>
          )}
          <DataGrid
            autoHeight
            columns={callColumns}
            pageSize={15}
            getRowId={(row: any) => row.name + row.phone_number + row.duration}
            rows={rows}
          />
          {/* {comingCalls.length > 0 && (
            <>
              <div className="incoming-call">
                <Paper sx={{ overflow: "hidden", margin: "1rem auto" }}>
                  <TableContainer sx={{ maxHeight: 728 }}>
                    <Table stickyHeader aria-label="Calls Query Table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            <b>Phone Number</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            <b>Client Name</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            <b>Predict Value</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            <b>Date</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            <b>Duration</b>
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {comingCalls
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            let valueRange = "";
                            let clientName =
                              row.phone_list?.client_predict_value
                                ?.client_name || "N/A";

                            let predictValue =
                              row.phone_list?.client_predict_value
                                ?.predict_value || 0;

                            if (predictValue < 0) {
                              valueRange = "Negative";
                            }
                            if (predictValue === 0) {
                              valueRange = "Leads";
                            }
                            if (predictValue > 0 && predictValue <= 50) {
                              valueRange = "Low";
                            }
                            if (predictValue > 50 && predictValue <= 150) {
                              valueRange = "Medium";
                            }
                            if (predictValue > 150) {
                              valueRange = "High";
                            }

                            return (
                              <StyledTableRow id={row.call_id} key={index}>
                                <StyledTableCell component="th" scope="row">
                                  {row.phone_number}
                                </StyledTableCell>
                                <StyledTableCell>{clientName}</StyledTableCell>
                                <StyledTableCell>{valueRange}</StyledTableCell>
                                <StyledTableCell>
                                  {row.date
                                    .toString()
                                    .replace("T", " ")
                                    .replace(".000Z", "")}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.duration}
                                  <Tooltip title="Replay">
                                    <IconButton sx={{ marginLeft: "0.5rem" }}>
                                      <PlayCircleIcon
                                        color="warning"
                                        fontSize="large"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={comingCalls.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton
                    showLastButton
                  />
                </Paper>
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ComingCallsList;
