import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import AddRole from "./AddRole";
import EventBus from "../../../../app/EventBus";
import {
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useNavigate } from "react-router-dom";
import {
  getAllRoles,
  removeRole,
} from "../../../../action_creators/tools/role_management_dropdown/role_management";
import CloseIcon from "@mui/icons-material/Close";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";

const Role: React.FC = () => {
  const user = key();
  const dispatch = useAppDispatch();
  let history = useNavigate();

  const roleList = useAppSelector((state) => state.role.roles);
  const roleStatus = useAppSelector((state) => state.role.roleStatus);

  useEffect(() => {
    if (!user) {
      history("/Login");
      window.location.reload();
    } else {
      dispatch(getAllRoles({}));
      if (roleStatus === "ERROR") {
        EventBus.dispatch("logout", undefined);
      }
    }
  }, []);

  const [removeRoleId, setRemoveRoleId] = React.useState("");
  const [deleteRoleConfirmationOpen, setDeleteRoleConfirmationOpen] =
    React.useState(false);
  const [deleteRoleName, setDeleteRoleName] = React.useState("");
  const [deleteRoleFailedOpen, setDeleteRoleFailedOpen] = React.useState(false);

  const handleClickRoleDeleteConfirmation = (
    roleId: string,
    roleName: string
  ) => {
    setRemoveRoleId(roleId);
    setDeleteRoleName(roleName);
    setDeleteRoleConfirmationOpen(true);
  };

  const handleCloseRoleDeleteConfirmation = () => {
    setRemoveRoleId("");
    setDeleteRoleConfirmationOpen(false);
  };

  const handleRemove = (roleId: string) => {
    dispatch(removeRole(roleId));
    setDeleteRoleConfirmationOpen(false);
  };

  const handleCloseRemoveRoleFailed = () => {
    setDeleteRoleFailedOpen(false);
  };

  return (
    <div>
      <Typography variant="h5">Role Management</Typography>
      <AddRole />

      <div>
        <Stack spacing={2}>
          <List>
            <Dialog
              open={deleteRoleConfirmationOpen}
              onClose={handleCloseRoleDeleteConfirmation}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                className="role-change-dialog"
              >
                <h4>Delete Role</h4>
                <IconButton
                  className="dialog-close-icon-button"
                  aria-label="close"
                  onClick={handleCloseRoleDeleteConfirmation}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Divider variant="middle"></Divider>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <span style={{ fontWeight: "900", fontSize: "20px" }}>
                    {deleteRoleName}
                  </span>{" "}
                  will be deleted, are you sure you want to do this?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="delete-role-confirm-button"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleRemove(removeRoleId);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={deleteRoleFailedOpen}
              onClose={handleCloseRoleDeleteConfirmation}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle
                id="alert-dialog-title"
                className="role-remove-dialog"
              >
                <h4>Delete role failed.</h4>
                <IconButton
                  className="dialog-close-icon-button"
                  aria-label="close"
                  onClick={handleCloseRemoveRoleFailed}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Divider variant="middle"></Divider>
              <DialogContent>
                <DialogContentText>
                 Manager, Assistant, AIBot cannot be deleted.
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCloseRemoveRoleFailed}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>

            {roleList.length > 0 &&
              roleList.map((eachRole) => {
                return (
                  <ListItem
                    key={eachRole.role_id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => {
                          const id = eachRole.role_id;
                          if (id) {
                            if (
                              //AIBot & Manage cannot be deleted.
                              id === "559a326f-d34e-49d2-902c-d8a446d83271" ||
                              id === "c54bd5be-9925-4813-b8aa-e39eab5396b6" ||
                              id === "57d95ae8-56fe-401a-867b-1ebb30c424f8" 
                            ) {
                              setDeleteRoleFailedOpen(true);
                            } else {
                              handleClickRoleDeleteConfirmation(
                                eachRole.role_id as string,
                                eachRole.name as string
                              );
                            }
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <ReorderIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText primary={eachRole.name} />
                  </ListItem>
                );
              })}
          </List>
        </Stack>
      </div>
    </div>
  );
};

export default Role;
