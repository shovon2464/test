import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Badge,
  BadgeProps,
  Button,
  DialogActions,
  IconButton,
} from "@mui/material";
import { IQuoteDetailsProps } from "../../../../interfaces/quote/IQuoteDetailsProps";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../../../app/hooks";
import {
  ISetViewed,
  areAllViewed,
  updateViewed,
} from "../../../../action_creators/quote/quote_list";
import { setViewed } from "../../../../services/quote/quote";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { ContainedPrimaryButton } from "../../../../style_components/buttons/styled_contained_buttons";
import styled from "styled-components";

const ViewQuotesDetail: React.FC<IQuoteDetailsProps> = (props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const { quoteDetails, rowValue } = props;
  // console.log(rowValue);
  // const fake = "{\"premium\":\"1000\",\"expire_date\":\"2025-04-18\",\"\SubmitDate\":\"2023-04-18 17:20:00\"}"
  const quoteDetailObj: object = JSON.parse(quoteDetails);
  const fields = Object.entries(quoteDetailObj);

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(areAllViewed({}));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setQuoteViewed = () => {
    const info: ISetViewed = {
      Type: rowValue.Type,
      Viewed: 1,
      FullName: rowValue.FullName,
      SubmitDate: rowValue.SubmitDate,
    };
    dispatch(updateViewed(info)).then(() => {
      dispatch(areAllViewed({}));
    });

    console.log("here");
    setOpen(false);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 5,
      border: "2px solid white",
    },
  }));
  return (
    <div>
      <StyledBadge
        badgeContent=""
        color="error"
        overlap="circular"
        invisible={rowValue.Viewed}
      >
        <Button
          variant="contained"
          aria-label="quote_details"
          color="primary"
          onClick={handleClickOpen}
        >
          View Details
        </Button>
        {/* {console.log(rowValue.Viewed)} */}
      </StyledBadge>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-label="quote-detail-dialog"
      >
        <DialogTitle
          style={{ fontWeight: "bold" }}
          className="quote-detail-dialog"
        >
          Quote Details Info
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          {fields.length > 0 &&
            fields.map((value, index) => {
              return (
                <Typography variant="body1" component="div" key={index}>
                  {value[0]}: {value[1]}
                </Typography>
              );
            })}
        </DialogContent>
        <DialogActions className="confirm-button">
          <ContainedPrimaryButton onClick={setQuoteViewed}>
            Mark As Read
          </ContainedPrimaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewQuotesDetail;
