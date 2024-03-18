import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "./app/hooks";
import { logout } from "./action_creators/auth/logout";
import EventBus from "./app/EventBus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import NotFoundPage from "./pages/notfound/404";
import HelpPage from "./pages/help/index";
import HomePage from "./pages/homepage/Home";
import AboutPage from "./pages/aboutpage/About";
import ProcessingPage from "./pages/processingpage/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardPage from "./pages/processingpage/dashboard/Dashboard";
import { CreateJob } from "./pages/processingpage/create_job/CreateJob";
import { ComingCall } from "./pages/processingpage/coming_call/ComingCall";
import { TaskConsole } from "./pages/processingpage/task_console/TaskConsole";
import { QCconsole } from "./pages/processingpage/qc_console/QCconsole";
import { QuoteConsole } from "./pages/processingpage/quote_console/QuoteConsole";
import { Tools } from "./pages/processingpage/tools/Tools";
import { AppointmentConsole } from "./pages/processingpage/appointment_console/AppointmentConsole";
import PerformanceReport from "./pages/processingpage/performance_report/Index";
import { MyHours } from "./pages/processingpage/my_hours/MyHours";
import FileConsole from "./pages/processingpage/files_console/FilesConsole";

import AutoUsagePage from "./pages/processingpage/tools/autoUsageType/index";
import AutoCoverage from "./pages/processingpage/tools/autoCoverage/Index";
import AutoPayOffMode from "./pages/processingpage/tools/autoPayOffMode/Index";
import AutoStatus from "./pages/processingpage/tools/autoStatusType/Index";
import VehicleQuestionnaire from "./pages/processingpage/create_job/questionaire/auto_questionaire/VehicleQuestionaire";
import TaskJobType from "./pages/processingpage/tools/taskJobType/Index";
import TaskPriority from "./pages/processingpage/tools/taskPriorityType/Index";
import TaskSource from "./pages/processingpage/tools/taskSourceType/Index";
import UserManagement from "./pages/processingpage/tools/userManagement/Index";
import Role from "./pages/processingpage/tools/roleManagement/Index";
import AutoDelete from "./pages/processingpage/tools/AutoDelete/autoDelete_index";
import ThirdPartyIntegration from "./pages/processingpage/tools/thirdPartyIntegration/ThirdPartyIntegration_index";
import SwaggerUI from "swagger-ui-react";
import swaggerData from "./swagger/swaggerData";
import "swagger-ui-react/swagger-ui.css";
import ProtectedRoutes from "./app/ProtectedRoutes";
import RoleBasedProtect from "./app/RoleBasedProtect";
import Footer from "./pages/homepage/Footer";
import "./style_components/homepage/Footer.css";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { API_URL, WS_URL } from "./app/endpoint";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Evaluation from "./pages/processingpage/evaluation";

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Home" element={<HomePage />}></Route>
            <Route path="/About" element={<AboutPage />}></Route>
            <Route path="/Login" element={<LoginPage />}></Route>
            <Route path="/Register" element={<SignUpPage />}></Route>
            <Route
              path="/Doc"
              element={<SwaggerUI spec={swaggerData} />}></Route>
            <Route path="/Help" element={<HelpPage />}></Route>
            <Route element={<ProcessingPage />}>
              <Route element={<ProtectedRoutes />}>
                <Route path="/Dashboard" element={<DashboardPage />}></Route>
                <Route path="/ComingCall" element={<ComingCall />}></Route>
                <Route path="/CreateJob" element={<CreateJob />}></Route>
                <Route path="/TaskConsole" element={<TaskConsole />}></Route>
                <Route path="/QcConsole" element={<QCconsole />}></Route>
                <Route path="/QuoteConsole" element={<QuoteConsole />}></Route>
                <Route
                  path="/AppointmentConsole"
                  element={<AppointmentConsole />}></Route>
                <Route path="/FileConsole" element={<FileConsole />}></Route>
                <Route element={<RoleBasedProtect />}>
                  <Route path="/Tools" element={<Tools />}></Route>
                  <Route
                    path="/AutoUsageType"
                    element={<AutoUsagePage />}></Route>
                  <Route
                    path="/AutoCoverage"
                    element={<AutoCoverage />}></Route>
                  <Route
                    path="/AutoPayOffMode"
                    element={<AutoPayOffMode />}></Route>
                  <Route path="/AutoStatus" element={<AutoStatus />}></Route>
                  <Route path="/TaskJobType" element={<TaskJobType />}></Route>
                  <Route
                    path="/TaskPriority"
                    element={<TaskPriority />}></Route>
                  <Route path="/TaskSource" element={<TaskSource />}></Route>
                  <Route
                    path="/UserManagement"
                    element={<UserManagement />}></Route>
                  <Route path="/RoleManagement" element={<Role />}></Route>
                  <Route path="/AutoDelete" element={<AutoDelete />}></Route>
                  <Route
                    path="/ThirdPartyIntegration"
                    element={<ThirdPartyIntegration />}></Route>
                </Route>
                <Route
                  path="/PerformanceReport"
                  element={<PerformanceReport />}></Route>
                <Route path="/Evaluation" element={<Evaluation />}></Route>
                <Route path="/MyHours" element={<MyHours />}></Route>

                <Route
                  path="/VehicleQuestionnaire"
                  element={<VehicleQuestionnaire />}></Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

export default App;
