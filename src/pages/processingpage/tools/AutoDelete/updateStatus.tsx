import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IAutoDelete,
  updateTaskDays,
} from "../../../../action_creators/tools/auto_delete/auto_delete";
import "../../../../style_components/tools/autoDelete_style.css";

const UpdateStatus: React.FC = () => {
  const auto_delete_info = useAppSelector((state) => state.autoDelete.infos);
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = React.useState(false);

  const updateStatus = (activeValue: boolean) => {
    let changedInfo: IAutoDelete;
    changedInfo = {
      alert_delete_id: "79a47e2a-e386-4a2d-aaa6-8a70cc57c12f",
      alert_days: auto_delete_info[0].alert_days,
      delete_days: auto_delete_info[0].delete_days,
      target_email: auto_delete_info[0].target_email,
      active: activeValue,
    };
    let l: IAutoDelete[] = [];
    l.push(changedInfo);

    dispatch(updateTaskDays(l));
  };

  React.useEffect(() => {
    if (auto_delete_info[0] != undefined) {
      setIsActive(auto_delete_info[0].active);
    }
  }, [auto_delete_info]);

  return (
    <div className="auto-delete-status">
      <FormControl>
        <FormLabel className="auto-delete-active">
          Auto delete status:
        </FormLabel>
        <RadioGroup
          row
          value={isActive ? "active" : "inactive"}
          name="auto-delete-radio-buttons"
        >
          <FormControlLabel
            value="active"
            label="Active"
            control={
              <Radio
                size="small"
                checkedIcon={<LensIcon />}
                onClick={() => {
                  setIsActive(true);
                  //   console.log(isActive);
                  updateStatus(true);
                }}
              />
            }
          />
          <FormControlLabel
            value="inactive"
            label="Inactive"
            control={
              <Radio
                size="small"
                checkedIcon={<LensIcon />}
                onClick={() => {
                  setIsActive(false);
                  //   console.log(isActive);
                  updateStatus(false);
                }}
              />
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default UpdateStatus;
