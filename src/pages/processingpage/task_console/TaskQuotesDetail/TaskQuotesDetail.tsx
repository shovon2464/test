import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, DialogActions, IconButton } from "@mui/material";
import { IQuoteDetailsProps } from "../../../../interfaces/quote/IQuoteDetailsProps";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const TaskQuotesDetail: React.FC<IQuoteDetailsProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const { quoteDetails, rowValue } = props;
  const eachDetail = quoteDetails.split(",");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="quote_details"
        color="solidblack"
        onClick={handleClickOpen}
      >
        <RequestQuoteIcon sx={{ ":hover": { color: "#A69282" }, padding: 0 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle style={{ fontWeight: "bold" }}>
          Quote Details Info
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <Typography>Address1: {rowValue.Address1}</Typography>
          <Typography>Address2: {rowValue.Address2}</Typography>
          <Typography>Postal Code: {rowValue.PostalCode}</Typography>
          {eachDetail.length > 0 &&
            eachDetail.map((value, index) => {
              return (
                <Typography variant="body1" component="div" key={index}>
                  {value}
                </Typography>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskQuotesDetail;
