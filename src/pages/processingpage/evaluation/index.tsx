import React from "react";
import { key } from "../../../services/auth/getKey";
import PhoneNumberSearch from "./client_search_bar";
import IncomingCallPredictValuesPieChart from "./calls_values_pie_chart";

const Evaluation: React.FC = () => {
  const checkLoggedInToken = key();

  return (
    <>
      {checkLoggedInToken && (
        <div className="report">
          <PhoneNumberSearch />
          <IncomingCallPredictValuesPieChart />
        </div>
      )}
      {!checkLoggedInToken && (
        <h3>
          Please{" "}
          <a href="/Login" className="sign-in-link">
            sign in{" "}
          </a>
          to view the content of this page.
        </h3>
      )}
    </>
  );
};

export default Evaluation;
