import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const LiveClock: React.FC = () => {
  const [dateState, setDateState] = useState("");
  const [clockState, setClockState] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setDateState(date.toLocaleDateString('en-GB',
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "Canada/Mountain"
        }).replace(',', ''));
      setClockState(date.toLocaleTimeString('en-GB',
        {
          timeZone: 'Canada/Mountain',
        }));
    }, 0);
  }, [])

  return (
    <div className="live-clock-container">
      <Typography>{dateState}</Typography>
      <Typography className="live-clock-time">{clockState}</Typography>
    </div>
  );
};

export default LiveClock;