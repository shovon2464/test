import React, { useImperativeHandle, useState } from "react";
import {
  CardHeader,
  Card,
  CardActions,
  Typography,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeAutoPayOffTypeDetail } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";
import { useAppDispatch } from "../../../../app/hooks";
import { IDeleteAutoPayOffTypeDetailRequest } from "../../../../action_creators/tools/auto_payoffmode_dropdown/auto_payofftypedetail";

interface IExpandPayOffTypeDetailProps {
  PayOffMode_Id?: string;
  PayOffType_Id?: string;
  PayOffTypeDetail_Id?: string;
  PayOffTypeSubDetail?: string;
}
export type OpenHandle = {
  alterOpen: () => void;
};

const ExpandPayOffTypeDetail: React.ForwardRefRenderFunction<
  OpenHandle,
  IExpandPayOffTypeDetailProps
> = (props, ref) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    alterOpen() {
      setOpen(!open);
    },
  }));

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List disablePadding>
        <ListItem>
          <ListItemText
            key={props.PayOffTypeDetail_Id}
            primary={props.PayOffTypeSubDetail}
          />
          {props.PayOffTypeSubDetail && (
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                let deleteRequest: IDeleteAutoPayOffTypeDetailRequest = {
                  PayOffMode_Id: props.PayOffMode_Id ?? "",
                  PayOffType_Id: props.PayOffType_Id ?? "",
                  PayOffTypeDetail_Id: props.PayOffTypeDetail_Id ?? "",
                };

                if (deleteRequest) {
                  dispatch(removeAutoPayOffTypeDetail(deleteRequest));
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </ListItem>
      </List>
    </Collapse>
  );
};

export default React.forwardRef(ExpandPayOffTypeDetail);
