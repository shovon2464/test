import React, { useImperativeHandle } from "react";
import { useAppSelector } from "../../../../app/hooks";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export type OpenHandle = {
  alterOpen: () => void;
};
const AutoInfo: React.ForwardRefRenderFunction<OpenHandle> = (props, ref) => {
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    alterOpen() {
      setOpen(!open);
    },
  }));

  const autoInfoRetrieved = useAppSelector(
    (state) => state.eachVehicleInfo.auto
  );
  const driverInfoRetrieved = useAppSelector(
    (state) => state.driversInfo.drivers
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle 
          className="auto-n-driver-info-dialog"
        >
          Auto Info
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
            Vin: {autoInfoRetrieved.VIN}
          </Typography>
          <Typography variant="body1" component="div">
            Model: {autoInfoRetrieved.Model}
          </Typography>
          <Typography variant="body1" component="div">
            Year: {autoInfoRetrieved.Year?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            IsUsed: {autoInfoRetrieved.IsUsed?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Status: {autoInfoRetrieved.CM_Vehicle_Status_Description}
          </Typography>
          <Typography variant="body1" component="div">
            Start Effective Date:{" "}
            {autoInfoRetrieved.StartEffectiveDate?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            End Effective Date: {autoInfoRetrieved.EndEffectiveDate?.toString()}
          </Typography>
          <Typography variant="body1" component="div">
            Coverage: {autoInfoRetrieved.CoverageType}
          </Typography>
          <Typography variant="body1" component="div">
            Coverage Detail: {autoInfoRetrieved.CoverageDetails}
          </Typography>
          <Typography variant="body1" component="div">
            Pay Off Mode: {autoInfoRetrieved.PayOffType}
          </Typography>
          <Typography variant="body1" component="div">
            Pay Off Type: {autoInfoRetrieved.PayOffTypeDetail}
          </Typography>
          <Typography variant="body1" component="div">
            Pay Off Type Detail: {autoInfoRetrieved.PayOffTypeSubDetail}
          </Typography>
          <Typography variant="body1" component="div">
            Usage Type: {autoInfoRetrieved.UsageType}
          </Typography>
          <Typography variant="body1" component="div">
            Usage Detail: {autoInfoRetrieved.UsageDetail}
          </Typography>
          <Typography variant="body1" component="div">
            Parking Reason: {autoInfoRetrieved.IfParkingReason}
          </Typography>
          <Divider className="auto-info-popup-divider" variant="fullWidth"></Divider>
          <Typography
            variant="h6"
            component="div"
            className="auto-n-driver-info-dialog-drivers-info"
          >
            Drivers Info
          </Typography>
          <br />
          {driverInfoRetrieved.length > 0 &&
            driverInfoRetrieved.map((value) => {
              return (
                <>
                  <Typography variant="body1" component="div">
                    Driver Name: {value.Name}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Address: {value.Address}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Gender: {value.Gender}
                  </Typography>
                  <Typography variant="body1" component="div">
                    BirthDate: {value.DateOfBirth}
                  </Typography>
                  <Typography variant="body1" component="div">
                    License Number: {value.LicenseNumber}
                  </Typography>
                  <Typography variant="body1" component="div">
                    License Year: {value.LicenseYear}
                  </Typography>
                </>
              );
            })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.forwardRef(AutoInfo);
