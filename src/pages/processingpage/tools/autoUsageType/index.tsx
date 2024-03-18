import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  getAutoUsagesAndDetails,
  deleteAutoUsage,
} from "../../../../action_creators/tools/auto_usage_dropdown/auto_usage";
import { deleteUsageAndDetailType } from "../../../../action_creators/tools/auto_usage_dropdown/auto_usage_and_detail";
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
import AddAutoUsageType from "./AddAutoUsageType";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAutoUsageDetail from "./AddAutoUsageDetailType";

const AutoUsageType: React.FC = () => {
  const dispatch = useAppDispatch();
  const autoUsageTypeList = useAppSelector(
    (state) => state.autoUsage.autoUsageTypes
  );
  const autoUsageTypeState = useAppSelector(
    (state) => state.autoUsage.autoUsageState
  );
  const user = key();
  let history = useNavigate();
  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAutoUsagesAndDetails());
      if (autoUsageTypeState === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  return (
    <div>
      <Typography variant="h5">Auto Usage Type Management</Typography>
      <AddAutoUsageType />
      {autoUsageTypeList.length > 0 &&
        autoUsageTypeList.map((eachAutoUsageType) => {
          return (
            <Card
              variant="elevation"
              key={eachAutoUsageType.usage_id}
              style={{
                width: "18rem",
                margin: "30px",
                display: "inline-table",
              }}
            >
              <CardHeader
                key={eachAutoUsageType.usage_id}
                title={eachAutoUsageType.usage_type}
                action={
                  <div>
                    <AddAutoUsageDetail usage_id={eachAutoUsageType.usage_id} />
                    <div style={{ display: "table-cell" }}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => {
                          const id = eachAutoUsageType.usage_id;
                          if (id) {
                            dispatch(deleteAutoUsage(id));
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                }
              ></CardHeader>
              {eachAutoUsageType.cm_usage_details && (
                <CardContent>
                  <List>
                    {eachAutoUsageType.cm_usage_details.length > 0 &&
                      eachAutoUsageType.cm_usage_details.map((value) => {
                        return (
                          <ListItem>
                            <ListItemText
                              key={value.CM_Usage_Detail_Id}
                              primary={value.UsageDetail}
                            />
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => {
                                const id = value.CM_Usage_Detail_Id;
                                if (id) {
                                  dispatch(deleteUsageAndDetailType(id));
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
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

export default AutoUsageType;
