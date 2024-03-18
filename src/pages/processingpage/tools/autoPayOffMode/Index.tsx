import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate } from "react-router-dom";
import {
  getAutoPayOffModeTypeAndTypeDetail,
  removeAutoPayOffMode,
} from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payoffmode";
import { removeAutoPayOffType } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftype";
import { removeAutoPayOffTypeDetail } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import EventBus from "../../../../app/EventBus";
import {
  CardHeader,
  Card,
  Typography,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDeleteAutoPayOffTypeDetailRequest } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import { IDeleteAutoPayOffTypeRequest } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftype";
import AddPayOffType from "./AddPayOffType";
import AddPayOffTypeDetail from "./AddPayOffTypeDetail";
import AddPayOffMode from "./AddPayOffMode";

const AutoPayOffMode: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = key();
  let history = useNavigate();
  const autoPayOffModeList = useAppSelector(
    (state) => state.autoPayOffModeTypeAndSubType.autoPayOffModes
  );
  const autoPayOffModeStatus = useAppSelector(
    (state) => state.autoPayOffModeTypeAndSubType.autoPayOffModeTypeDetailStatus
  );

  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAutoPayOffModeTypeAndTypeDetail({}));
      if (autoPayOffModeStatus === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">Auto Pay Off Mode Type Management</Typography>
      <AddPayOffMode />
      {autoPayOffModeList.length > 0 &&
        autoPayOffModeList.map((eachPayOffMode) => {
          return (
            <Card
              variant="elevation"
              key={eachPayOffMode.PayOffMode_Id}
              style={{
                width: "18rem",
                margin: "30px",
                display: "inline-table",
              }}
            >
              <CardHeader
                key={eachPayOffMode.PayOffMode_Id}
                title={eachPayOffMode.PayOffType}
                action={
                  <div>
                    <AddPayOffType
                      pay_off_mode_id={eachPayOffMode.PayOffMode_Id}
                    />
                    <div style={{ display: "table-cell" }}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => {
                          const id = eachPayOffMode.PayOffMode_Id;
                          if (id) {
                            dispatch(removeAutoPayOffMode(id));
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                }
              ></CardHeader>
              {eachPayOffMode.cm_payofftypes && (
                <CardContent>
                  <List>
                    {eachPayOffMode.cm_payofftypes.length > 0 &&
                      eachPayOffMode.cm_payofftypes.map((eachPayOffType) => {
                        return (
                          <div>
                            <ListItem>
                              <ListItemText
                                key={eachPayOffType.PayOffType_Id}
                                primary={eachPayOffType.PayOffTypeDetail}
                              />
                              <AddPayOffTypeDetail
                                pay_off_mode_id={
                                  eachPayOffType.fk_pay_off_mode_id
                                }
                                pay_off_type_id={eachPayOffType.PayOffType_Id}
                              />
                              <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => {
                                  let deleteRequest: IDeleteAutoPayOffTypeRequest =
                                    {
                                      PayOffMode_Id:
                                        eachPayOffType.fk_pay_off_mode_id ?? "",
                                      PayOffType_Id:
                                        eachPayOffType.PayOffType_Id ?? "",
                                    };

                                  if (deleteRequest) {
                                    dispatch(
                                      removeAutoPayOffType(deleteRequest)
                                    );
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItem>

                            {eachPayOffType.cm_payofftypedetail &&
                              eachPayOffType.cm_payofftypedetail.map(
                                (eachPayOffTypeDetail) => {
                                  if (
                                    eachPayOffTypeDetail.PayOffTypeSubDetail &&
                                    eachPayOffTypeDetail.PayOffTypeSubDetail !==
                                      ""
                                  ) {
                                    return (
                                      <div style={{ marginLeft: "20px" }}>
                                        <List disablePadding>
                                          <ListItem>
                                            <ListItemText
                                              key={
                                                eachPayOffTypeDetail.PayOffTypeDetail_Id
                                              }
                                              primary={
                                                eachPayOffTypeDetail.PayOffTypeSubDetail
                                              }
                                            />
                                            <IconButton
                                              aria-label="delete"
                                              color="error"
                                              onClick={() => {
                                                let deleteRequest: IDeleteAutoPayOffTypeDetailRequest =
                                                  {
                                                    PayOffMode_Id:
                                                      eachPayOffType.fk_pay_off_mode_id ??
                                                      "",
                                                    PayOffType_Id:
                                                      eachPayOffTypeDetail.fk_pay_off_type_id ??
                                                      "",
                                                    PayOffTypeDetail_Id:
                                                      eachPayOffTypeDetail.PayOffTypeDetail_Id ??
                                                      "",
                                                  };

                                                if (deleteRequest) {
                                                  dispatch(
                                                    removeAutoPayOffTypeDetail(
                                                      deleteRequest
                                                    )
                                                  );
                                                }
                                              }}
                                            >
                                              <DeleteIcon />
                                            </IconButton>
                                          </ListItem>
                                        </List>
                                      </div>
                                    );
                                  }
                                  return <div></div>;
                                }
                              )}
                          </div>
                        );
                      })}
                  </List>
                </CardContent>
              )}
            </Card>
          );
        })}
    </div>
  );
};

export default AutoPayOffMode;
