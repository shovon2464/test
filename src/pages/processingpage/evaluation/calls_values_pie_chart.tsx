import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  retrieveComingCallsByPredictValuesEqualToZero,
  retrieveComingCallsByPredictValuesFromFiftyToAHundred,
  retrieveComingCallsByPredictValuesFromOneToFifty,
  retrieveComingCallsByPredictValuesGreatherThanAHundredFifty,
  retrieveComingCallsByPredictValuesLessThanZero,
  retrieveComingCallsList,
} from "../../../action_creators/evaluation/coming_calls_list";
import { ThemeProvider } from "styled-components";
import theme from "../../../style_components/global_theme_provider";
import { Button, CircularProgress } from "@mui/material";
import { resetClientTag } from "../../../features/evaluation/client_tag/client_tagSlice";
import { resetClient } from "../../../features/evaluation/client_predict_value/client_predict_valueSlice";
import { retrieveClientTagsByClientPredictValueId } from "../../../action_creators/evaluation/client_tag";
import { retrieveClientInfoByClientPredictValueId } from "../../../action_creators/evaluation/client_predict_value";
import { ReactGoogleChartEvent, Chart } from "react-google-charts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Title from "../../../components/evaluation_components/title_components/table_title";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/evaluation_components/table_components/table_row_cell";
import EditIcon from "@mui/icons-material/Edit";
import EditTagsPopupDialog from "../../../components/evaluation_components/pop_up_components/tags_popup_dialog";
import "../../../style_components/processingpages/coming_call/ComingCall.css";

const IncomingCallPredictValuesPieChart: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setShowing(true);
      }, 900);
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => dispatch(retrieveComingCallsList({})), 1000);
  }, [dispatch]);

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

  const [openTable, setOpenTable] = useState(0);
  const [refreshTable, setRefreshTable] = useState(0);

  const incomingCalls = useAppSelector(
    (state) => state.coming_call.comingCalls
  );

  const resetQuery = () => {
    dispatch(retrieveComingCallsList({}));
    setPage(0);
    setRefreshTable(0);
    setOpenTable(0);
  };

  const refreshQuery = () => {
    if (refreshTable === 1) {
      dispatch(retrieveComingCallsByPredictValuesLessThanZero({}));
    }
    if (refreshTable === 2) {
      dispatch(retrieveComingCallsByPredictValuesEqualToZero({}));
    }
    if (refreshTable === 3) {
      dispatch(retrieveComingCallsByPredictValuesFromOneToFifty({}));
    }
    if (refreshTable === 4) {
      dispatch(retrieveComingCallsByPredictValuesFromFiftyToAHundred({}));
    }
    if (refreshTable === 5) {
      dispatch(retrieveComingCallsByPredictValuesGreatherThanAHundredFifty({}));
    }
  };

  const hmsToTotalSeconds = (str: any) => {
    var p = str.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  };

  const totalSecondsTohms = (sec: number) => {
    var hms = new Date(sec * 1000).toISOString().slice(11, 19);
    return hms;
  };

  let predictValue = 0;
  let totalSeconds = 0;
  let scoreLessZero = 0;
  let scoreEqualsZero = 0;
  let scoreUpToFifty = 0;
  let scoreUpToAHundredFifty = 0;
  let scoreGreatherThanAHundredFifty = 0;

  if (incomingCalls.length > 0) {
    incomingCalls.map((row) => {
      if (row.phone_list?.client_predict_value?.predict_value !== undefined) {
        predictValue = row.phone_list?.client_predict_value?.predict_value;
      } else {
        predictValue = 0;
      }

      totalSeconds = hmsToTotalSeconds(row.duration);

      if (predictValue < 0) {
        scoreLessZero += totalSeconds;
      }
      if (predictValue === 0) {
        scoreEqualsZero += totalSeconds;
      }
      if (predictValue >= 1 && predictValue <= 50) {
        scoreUpToFifty += totalSeconds;
      }
      if (predictValue >= 51 && predictValue <= 150) {
        scoreUpToAHundredFifty += totalSeconds;
      }
      if (predictValue >= 151) {
        scoreGreatherThanAHundredFifty += totalSeconds;
      }

      return {
        scoreLessZero,
        scoreEqualsZero,
        scoreUpToFifty,
        scoreUpToAHundredFifty,
        scoreGreatherThanAHundredFifty,
      };
    });
  }

  const data = [
    ["Predict Value Range", "Incoming calls"],
    ["Negative", scoreLessZero],
    ["Leads", scoreEqualsZero],
    ["Low", scoreUpToFifty],
    ["Medium", scoreUpToAHundredFifty],
    ["High", scoreGreatherThanAHundredFifty],
  ];

  const options = {
    legend: { position: "bottom", alignment: "center" },
    title: "Report of Client Predict Values for Incoming Calls",
    titleTextStyle: {
      fontSize: 20,
      color: "dimgrey",
    },
    titlePosition: "none",
    pieSliceText: "value-and-percentage",
    colors: ["#D52DB7", "#FF2E7E", "#FF6B45", "#FFAB05", "#6050DC"],
  };

  const chartEvents: ReactGoogleChartEvent[] = [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
          const [selectedItem] = selection;
          const dataTable = chartWrapper.getDataTable();
          const { row } = selectedItem;
          const score = dataTable?.getValue(row, 0);

          if (score === "Negative") {
            dispatch(retrieveComingCallsByPredictValuesLessThanZero({}));
            setOpenTable(1);
            setRefreshTable(1);
          }
          if (score === "Leads") {
            dispatch(retrieveComingCallsByPredictValuesEqualToZero({}));
            setOpenTable(1);
            setRefreshTable(2);
          }
          if (score === "Low") {
            dispatch(retrieveComingCallsByPredictValuesFromOneToFifty({}));
            setOpenTable(1);
            setRefreshTable(3);
          }
          if (score === "Medium") {
            dispatch(retrieveComingCallsByPredictValuesFromFiftyToAHundred({}));
            setOpenTable(1);
            setRefreshTable(4);
          }
          if (score === "High") {
            dispatch(
              retrieveComingCallsByPredictValuesGreatherThanAHundredFifty({})
            );
            setOpenTable(1);
            setRefreshTable(5);
          }
        }
      },
    },
  ];

  const uniquePhoneNumber = [
    ...new Set(incomingCalls.map((i) => i.phone_number)),
  ];

  const uniqueClientName = [
    ...new Set(
      incomingCalls.map((i) => i.phone_list?.client_predict_value?.client_name)
    ),
  ];

  const uniquePredictValue = [
    ...new Set(
      incomingCalls.map(
        (i) => i.phone_list?.client_predict_value?.predict_value
      )
    ),
  ];

  const uniqueClientPredictValueId = [
    ...new Set(
      incomingCalls.map(
        (i) => i.phone_list?.client_predict_value?.client_predict_value_id
      )
    ),
  ];

  const ClientTagsArrays = [
    ...new Set(
      incomingCalls.map((i) =>
        [
          ...new Set(
            i.phone_list?.client_predict_value?.client_tag?.map(
              (a) => a.tag_description
            )
          ),
        ].sort()
      )
    ),
  ];

  let set = new Set(ClientTagsArrays.map((i) => JSON.stringify(i)));
  let uniqueClientTags = Array.from(set).map((i) => JSON.parse(i));

  let spinners: JSX.Element = <React.Fragment></React.Fragment>;
  if (loading) {
    spinners = (
      <ThemeProvider theme={theme}>
        <CircularProgress
          color="error"
          size="22rem"
          thickness={0.5}
          sx={{ margin: "11rem auto 0 auto" }}
        />
      </ThemeProvider>
    );
  }

  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState("");

  const OpenTagsEditDialog = (client_predict_value_id: string) => {
    dispatch(resetClientTag());
    dispatch(resetClient());
    dispatch(retrieveClientTagsByClientPredictValueId(client_predict_value_id));
    dispatch(retrieveClientInfoByClientPredictValueId(client_predict_value_id));
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <div>
        <div className="pie-chart">
          <h2 className="pie-chart-title">
            Total Duration of Incoming Calls of Client Predict Value
          </h2>
          {spinners}
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            className={"chart-self"}
            width={"95%"}
            height={"700px"}
            chartEvents={chartEvents}
          />
        </div>

        {openTable === 1 && showing === true && (
          <>
            <div className="report-buttons">
              <Button
                className="report-reset-button"
                size="large"
                variant="contained"
                color="primary"
                onClick={resetQuery}
              >
                Reset Pie Chart
              </Button>
              <Button
                className="report-refresh-button"
                size="large"
                variant="contained"
                color="secondary"
                onClick={refreshQuery}
              >
                Refresh Table
              </Button>
            </div>
            <Paper sx={{ overflow: "hidden", margin: "1rem auto" }}>
              <TableContainer sx={{ maxHeight: 728 }}>
                <Table
                  stickyHeader
                  aria-label="Calls Query Table"
                  sx={{ width: "600", tableLayout: "fixed" }}
                >
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
                        <b>Total Duration</b>
                      </StyledTableCell>
                      <StyledTableCell colSpan={2} align="right">
                        <b>Tags</b>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>Edit Tags</b>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uniquePhoneNumber
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i) => {
                        let eachDurationInSeconds = 0;
                        let totalDuration = "";

                        incomingCalls
                          .filter((p) => p.phone_number === row)
                          .map((a) => {
                            let eachDuration = hmsToTotalSeconds(a.duration);
                            eachDurationInSeconds += eachDuration;
                            totalDuration = totalSecondsTohms(
                              eachDurationInSeconds
                            );
                            return totalDuration;
                          });

                        let valueRange = "";
                        let predictValue = uniquePredictValue[i] || 0;

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
                          <StyledTableRow
                            id={uniqueClientPredictValueId[i]}
                            key={i}
                          >
                            <StyledTableCell component="th" scope="row">
                              {row}
                            </StyledTableCell>
                            <StyledTableCell>
                              {uniqueClientName[i] || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>{valueRange}</StyledTableCell>
                            <StyledTableCell>{totalDuration}</StyledTableCell>
                            <StyledTableCell colSpan={2} align="right">
                              <ThemeProvider theme={theme}>
                                {uniqueClientTags[i]?.map(
                                  (a: any, i: number) => {
                                    return (
                                      <Chip
                                        key={i}
                                        label={a}
                                        color="info"
                                        sx={{
                                          marginRight: "0.5rem",
                                          marginBottom: "0.3rem",
                                        }}
                                        clickable
                                      />
                                    );
                                  }
                                ) || ""}
                              </ThemeProvider>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {uniquePredictValue[i] ? (
                                <Button
                                  color="primary"
                                  onClick={() =>
                                    OpenTagsEditDialog(
                                      uniqueClientPredictValueId[i] as string
                                    )
                                  }
                                >
                                  <EditIcon />
                                </Button>
                              ) : (
                                ""
                              )}
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
                count={uniquePhoneNumber.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
              />
            </Paper>
          </>
        )}
        <EditTagsPopupDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default IncomingCallPredictValuesPieChart;
