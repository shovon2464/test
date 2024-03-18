import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRoles } from "../../../../action_creators/tools/role_management_dropdown/role_management";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { key } from "../../../../services/auth/getKey";
import EventBus from "../../../../app/EventBus";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";

// const UsersTable: React.FC = () => {
//   const user = key();
//   const dispatch = useDispatch();
//   const roleListState = useAppSelector((state) => state.roleList.roleStatus);

//   let history = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       history("/Login");
//       window.location.reload();
//     } else {
//       dispatch(getAllRoles({}));
//       if (roleListState === "ERROR") {
//         EventBus.dispatch("logout", undefined);
//       }
//     }
//   }, []);

//   const userColumns: GridColDef[] = [
//     {
//       field: "",
//       headerName: "Name",
//     },
//     {
//       field: "",
//       headerName: "User Name",
//     },
//     {
//       field: "",
//       headerName: "Active",
//     },
//     {
//       field: "",
//       headerName: "Senior",
//     },
//     {
//       field: "",
//       headerName: "Role",
//     },
//     {
//       field: "",
//       headerName: "Action",
//     },
//   ];

//   let rows: GridRowsProp = [];

//   return (
//     <div>
//       <DataGrid
//         autoHeight
//         columns={userColumns}
//         rows={rows}
//         pageSize={15}
//       />

      
//     </div>
//   );
// };

// export default UsersTable;
