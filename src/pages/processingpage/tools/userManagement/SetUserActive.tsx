import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  Checkbox,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  Menu,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  IUserListWithActiveValueResponse,
  retrieveUsersListWithActiveValue,
  updateUserActiveValue,
  removeUser,
  updateUserRoleResult,
  IUserResetPassword,
} from "../../../../action_creators/tools/user_management/user_management";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { TableCell } from "@material-ui/core";
import "../../../../style_components/tools/userManagement_style.css";
import { OutlinedPrimaryButton } from "../../../../style_components/buttons/styled_outlined_buttons";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CheckBox } from "@mui/icons-material";
import {
  getRolesOfUser,
  IRoleManagement,
  IUserRoleManagement,
} from "../../../../action_creators/tools/role_management_dropdown/role_management";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { resetUserPassword } from "../../../../action_creators/tools/user_management/user_management";

const SetUserActive: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(
    (state) => state.userListWithActiveValue.userswithativevalue
  );
  const usersState = useAppSelector(
    (state) => state.userListWithActiveValue.userwithativevalueStatus
  );

  const roleList = useAppSelector((state) => state.roleList.roles);

  const userRoles = useAppSelector((state) => state.roleList.userRole);

  const [role, setRole] = React.useState("");

  let data: IUserListWithActiveValueResponse;

  const handleSwitchChange = (
    userId: string,
    activeValue: boolean,
    activeChanged: boolean, //determine if switch is clicked for Active column
    seniorValue: boolean,
    seniorChanged: boolean
  ) => {
    let active = false;

    if (activeChanged) {
      if (activeValue === false) {
        active = true;
      }
    } else {
      active = activeValue;
    }
    // determine senior value on user management table.
    let senior = false;

    if (seniorChanged) {
      if (seniorValue === false) {
        senior = true;
      }
    } else {
      senior = seniorValue;
    }

    data = {
      user_id: userId,
      active: active,
      senior: senior,
    };
    dispatch(updateUserActiveValue(data));
  };
  // change role button
  const [open, setOpen] = React.useState(false);
  const [save, setSave] = React.useState(false);
  const [removeUserId, setRemoveUserId] = React.useState("");
  const [deleteConfirmationOpen, setdeleteConfirmationOpen] =
    React.useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = React.useState(false);
  const [deleteUserName, setDeleteUserName] = React.useState("");
  const [changeUserRoleUserId, setChangeUserRoleUserId] = React.useState("");

  const handleOpenRoleChange = (userId: string) => {
    setChangeRoleDialogOpen(true);
    setChangeUserRoleUserId(userId);
    dispatch(getRolesOfUser(userId));
  };

  const handleCloseRoleChange = () => {
    setOpen(false);
  };

  //check if user's role is in role list.
  const checkRole = (roleId: string, userId: string) => {
    const userIdx = usersList.findIndex((user) => user.user_id === userId);
    if (userIdx !== -1) {
      const curUser = usersList[userIdx];
      const roles = curUser.roles;

      if (roles !== undefined) {
        if (roles.length > 0) {
          const roleIdx = roles.findIndex((role) => role.role_id === roleId);
          if (roleIdx > -1) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const checkIfManager = (userId: string) => {
    let ans = false;
    const user = usersList.find((item) => item.user_id === userId);
    if (user !== undefined) {
      const roles = user.roles;
      if (roles !== undefined) {
        roles.forEach((role) => {
          if (role.role_id === "c54bd5be-9925-4813-b8aa-e39eab5396b6") {
            ans = true;
          }
        });
      }

      return ans;
    }
  };

  const handleRoleChange = (
    userId: string,
    roleId: string,
    rolename: string
  ) => {
    let data: IUserRoleManagement;
    data = {
      user_id: userId,
      role_id: roleId,
      name: rolename,
    };
    dispatch(updateUserRoleResult(data));
  };

  const handleClickdeleteConfirmationOpen = (
    userId: string,
    userName: string
  ) => {
    setRemoveUserId(userId);
    setDeleteUserName(userName);
    setdeleteConfirmationOpen(true);
  };

  const handleClosedeleteConfirmation = () => {
    setRemoveUserId("");
    setdeleteConfirmationOpen(false);
  };

  const handleRemove = (userId: string) => {
    dispatch(removeUser(userId));
    setdeleteConfirmationOpen(false);
  };

  const handleClickChangeRole = () => {
    setChangeRoleDialogOpen(true);
  };

  const handleCloseChangeRole = () => {
    setChangeRoleDialogOpen(false);
  };

  // delete user dialog
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  // reset password
  const [currentUserId, setCurretUserId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  function isPassword(input: string): boolean {
    return passwordRegex.test(input);
  }

  const handleCloseReset = () => {
    setResetOpen(false);
  };

  const handleClickResetPassword = () => {
    let passwordData: IUserResetPassword;
    passwordData = {
      user_id: currentUserId,
      password: resetPassword,
    };

    if (resetPassword.length > 0) {
      if (isPassword(resetPassword)) {
        dispatch(resetUserPassword(passwordData));
        setResetOpen(false);
        setSnackbarOpen(true);
        setIsSuccess(true);
        setSnackMsg("Reset password done.");
      } else {
        setSnackbarOpen(true);
        setIsSuccess(false);
        setSnackMsg(
          "Reset password failed. New password has to contain 1 uppercase, 1 lowercase, 1 symbol/number, and at least 8 digits."
        );
      }
    } else {
      setSnackbarOpen(true);
      setIsSuccess(false);
      setSnackMsg("Password cannot be empty.");
    }
  };
  const resetHandleClose = () => {
    setOpen(false);
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* delete user button dialog*/}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleClosedeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="user-delete-dialog">
          {"Delete User Account?"}
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleClosedeleteConfirmation}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: "900", fontSize: "20px" }}>
              {deleteUserName}
            </span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ marginRight: "0.5rem" }}
            onClick={() => handleRemove(removeUserId)}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Role change button dialog */}
      <Dialog
        open={changeRoleDialogOpen}
        onClose={handleCloseChangeRole}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className="role-change-dialog">
          {"Change user's role"}
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleCloseChangeRole}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <FormGroup>
            {roleList.map((eachRole, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkRole(
                        eachRole.role_id as string,
                        changeUserRoleUserId as string
                      )}
                      onChange={() =>
                        handleRoleChange(
                          changeUserRoleUserId as string,
                          eachRole.role_id as string,
                          eachRole.name as string
                        )
                      }
                    />
                  }
                  value={eachRole.role_id}
                  key={index}
                  label={eachRole.name}
                />
              );
            })}
          </FormGroup>
        </DialogContent>
      </Dialog>

      {/* reset password dialog */}
      <Dialog
        open={resetOpen}
        onClose={handleCloseReset}
        aria-aria-labelledby="reset-passsword-dialog"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="reset-password-dialog">
          {"Reset user password"}
          <IconButton
            className="dialog-close-icon-button"
            onClick={handleCloseReset}
            aria-label="close-reset-dialog"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent>
          <Typography>Selected user: {currentUser}</Typography>
          <DialogContentText>
            <TextField
              label="New Password"
              variant="standard"
              onChange={(event: any) => {
                setResetPassword(event.target.value as string);
              }}
              required
            ></TextField>
          </DialogContentText>
          <DialogActions>
            <Button
              style={{ marginRight: "0.5rem" }}
              variant="outlined"
              color="error"
              onClick={() => {
                handleClickResetPassword();
              }}
              // onClick={()=>{handleClickResetPassword()}}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={resetHandleClose}
      >
        <Alert
          onClose={resetHandleClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>

      {usersList.length > 0 && (
        <div className="user-management-table">
          <Paper className="user-management-paper">
            <div className="TableContainer">
              <Table stickyHeader aria-label="Calls Query Table">
                <TableHead>
                  <TableRow>
                    <TableCell className="user_header">
                      <b>Name</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>User Name</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>Active</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>Senior</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>Role</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>Reset password</b>
                    </TableCell>
                    <TableCell className="user_header">
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList.map((row, index) => {
                    return (
                      <TableRow id={row.user_id} key={index}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>
                          <Switch
                            disabled={checkIfManager(row.user_id as string)}
                            checked={row.active}
                            onChange={() =>
                              handleSwitchChange(
                                row.user_id as string,
                                row.active,
                                true,
                                row.senior,
                                false //will not affect senior column
                              )
                            }
                            name={row.username}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            disabled={checkIfManager(row.user_id as string)}
                            checked={row.senior}
                            onChange={() =>
                              handleSwitchChange(
                                row.user_id as string,
                                row.active,
                                false, // will not affect active column
                                row.senior,
                                true
                              )
                            }
                            name={row.username}
                          />
                        </TableCell>

                        {/* Role Column */}
                        <TableCell>
                          <Button
                            onClick={() => {
                              handleOpenRoleChange(row.user_id as string);
                            }}
                            hidden={checkIfManager(row.user_id as string)}
                          >
                            <OutlinedPrimaryButton>
                              Change role
                            </OutlinedPrimaryButton>
                          </Button>
                        </TableCell>

                        {/* Reset Password column */}

                        <TableCell>
                          <Button
                            onClick={() => {
                              setResetOpen(true);
                              setCurretUserId(row.user_id as string);
                              setCurrentUser(row.username as string);
                              // console.log(currentUserId);
                            }}
                            hidden={checkIfManager(row.user_id as string)}
                          >
                            <OutlinedPrimaryButton>Reset</OutlinedPrimaryButton>
                          </Button>
                        </TableCell>

                        {/* Action column, delete user */}
                        <TableCell>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            color="error"
                            disabled={checkIfManager(row.user_id as string)}
                            onClick={() => {
                              handleClickdeleteConfirmationOpen(
                                row.user_id as string,
                                row.name as string
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default SetUserActive;
