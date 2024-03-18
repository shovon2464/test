import React, { useImperativeHandle } from "react";
import { useAppSelector } from "../../../../app/hooks";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export type HandleHomeOpen = {
  homeInfoOpen: () => void;
};

const HomeInfo: React.ForwardRefRenderFunction<HandleHomeOpen> = (
  props,
  ref
) => {
  const [open, setOpen] = React.useState(false);
  const homeInfoRetrieved = useAppSelector((state) => state.eachHomeInfo.home);
  useImperativeHandle(ref, () => ({
    homeInfoOpen() {
      setOpen(!open);
    },
  }));
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle 
          className="home-info-dialog"
        >
          Home Info
          <IconButton
            className="dialog-close-icon-button"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <Typography variant="body1" component="div">
            Home Address: {homeInfoRetrieved.Address}
          </Typography>
          <Typography variant="body1" component="div">
            Bathrooms: {homeInfoRetrieved.Bathrooms}
          </Typography>
          <Typography variant="body1" component="div">
            Size: {homeInfoRetrieved.Size}
          </Typography>
          <Typography variant="body1" component="div">
            Year Built: {homeInfoRetrieved.Built_Year?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Hot Water Tank Last Update Year:
            {homeInfoRetrieved.HW_Tank_Year?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Roofing Last Update Year:
            {homeInfoRetrieved.Roofing_Year?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Number of Mortgages: {homeInfoRetrieved.Num_Mortgages?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Finished Basement:
            {typeof homeInfoRetrieved.Is_Basement_Completed === "boolean"
              ? homeInfoRetrieved.Is_Basement_Completed
                ? "Yes"
                : "No"
              : "Unknown"}
          </Typography>
          <Typography variant="body1" component="div">
            Claim:
            {typeof homeInfoRetrieved.Claims === "boolean"
              ? homeInfoRetrieved.Claims
                ? "Yes"
                : "No"
              : "Unknown"}
          </Typography>
          <Typography variant="body1" component="div">
            Comments: {homeInfoRetrieved.Comment}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.forwardRef(HomeInfo);
