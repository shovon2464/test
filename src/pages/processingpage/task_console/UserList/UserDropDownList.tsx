import React from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { retrieveUsersList } from "../../../../action_creators/task/user/user_list";
import { updateEachTaskAssignTo } from "../../../../action_creators/task/task_list";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import IUserDropDownListProps from "../../../../interfaces/task/IUserDropDownListProps";
import { Alert, Snackbar } from "@mui/material";

const UserDropDownList: React.FC<IUserDropDownListProps> = (props) => {
  const { defValue, rowValue } = props;
  let row = rowValue;
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState("");
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(retrieveUsersList({}));
    setUser(defValue);
    return () => {
      setUser("");
    };
  }, [dispatch, defValue]);

  const users = useAppSelector((state) => state.userList.users);

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
    row.Assign_To = event.target.value;
    const index = users.findIndex(
      (value) => value.user_id === event.target.value
    );
    const assignUserName = users[index].name;
    dispatch(updateEachTaskAssignTo(row))
      .unwrap()
      .then(() => {
        // window.alert(`Successfully Assign Task To ${assignUserName}`);
        setSnackBarOpen(true);
      })
      .catch(() => {
        window.alert("Fetch Data Errors");
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    setSnackBarOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Task assigned to another broker!
        </Alert>
      </Snackbar>
      {users && (
        <Select
          value={user}
          defaultValue=""
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="standard"
        >
          {users.length > 0 &&
            users.map((eachUser, index) => {
              return (
                <MenuItem value={eachUser.user_id} key={index}>
                  {eachUser.name}
                </MenuItem>
              );
            })}
        </Select>
      )}
    </div>
  );
};

export default UserDropDownList;
