import React, { useImperativeHandle } from "react";
import { useAppSelector } from "../../../../app/hooks";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  StyledTableCol,
  StyledTableRow,
} from "../../../../components/share_components/CustomizedTable/CustomizedTable";
import { clearTaskFiles } from "../../../../features/task/task_files/taskFilesSlice";
import { useDispatch, useSelector } from "react-redux";

export type ToggleHandle = {
  dialogOpen: () => void;
};


const TaskFiles: React.ForwardRefRenderFunction<ToggleHandle> = (
  props,
  ref
) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  useImperativeHandle(ref, () => ({
    dialogOpen() {
      setOpen(!open);
    },
  }));

  const taskFilesRetrieved = useAppSelector(
    (state) => state.taskFiles.taskFiles
  );

  const handleClose = () => {
    setOpen(false);
    dispatch(clearTaskFiles());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle 
        className="task-files-list-dialog"
      >
        Task Files List
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
        {taskFilesRetrieved.length > 0 ? (
          <TableContainer component={Paper}>
            <Table 
              className="tast-files-popup-table"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCol width={100}>File #</StyledTableCol>
                  <StyledTableCol align="right">File Name</StyledTableCol>
                  <StyledTableCol align="right">File Job Type</StyledTableCol>
                  <StyledTableCol align="right">View Files</StyledTableCol>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskFilesRetrieved.map((row, index) => (
                  <StyledTableRow key={row.Task_File_Id}>
                    <StyledTableCol component="th" scope="row">
                      {index + 1}
                    </StyledTableCol>
                    <StyledTableCol align="right">
                      {row.Task_File_Name}
                    </StyledTableCol>
                    <StyledTableCol align="right">
                      {row.Task_File_Job_Type_Name}
                    </StyledTableCol>
                    <StyledTableCol align="right">
                      <Link
                        href="#"
                        underline="hover"
                        onClick={() => {
                          window.open(row.File_Path);
                        }}
                      >
                        {"Check File"}
                      </Link>
                    </StyledTableCol>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" component="div">
            {" "}
            This task currently has no file.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.forwardRef(TaskFiles);
