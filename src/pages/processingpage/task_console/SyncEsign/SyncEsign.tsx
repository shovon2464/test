import React, { useEffect, useState } from "react";
import { ContainedErrorButton } from "../../../../style_components/buttons/styled_contained_buttons";
import "../../../../style_components/processingpages/task_console/TaskConsole.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { retrieveFileStatus } from "../../../../action_creators/tools/sync_esign/sync_esign";

const SyncEsign: React.FC = () => {
  const dispatch = useAppDispatch();

  const fileList = useAppSelector((state) => state.syncEsign.docsSignState);

  const getUpdatedStatus = () => {
    dispatch(retrieveFileStatus({}));
  };

  return (
    <div onClick={getUpdatedStatus}>
      {/* <ContainedErrorButton>Sync</ContainedErrorButton> */}
    </div>
  );
};

export default SyncEsign;
