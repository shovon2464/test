import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Formik, Form } from "formik";
import { FieldWrapper } from "../../components/form_components/FieldWrapper";
import { clearAuthMessage } from "../../features/auth/authMsgSlice";
import { loginUser } from "../../action_creators/auth/login";
import { clearAuthState } from "../../features/auth/authSlice";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Button, Alert, AlertTitle, Typography } from "@mui/material";
import {
  AuthImage,
} from "../../style_components/auth/auth_form";
import "../../style_components/auth/login_style.css";

import HomeNavBar from "../homepage/HomeNavBar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../style_components/global_theme_provider";
import { key } from "../../services/auth/getKey";

export interface LoginRequest {
  username: string;
  password: string;
}

const Login: React.FC = (props) => {
  const [loading, setLoading] = useState(false);
  const { isSuccess } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.authMsg);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const user = key();
    if (user) {
      history("/Dashboard");
    }
    return () => {
      dispatch(clearAuthState());
    };
  }, []);

  useEffect(() => {
    dispatch(clearAuthMessage());
  }, [dispatch]);

  const initialStates: LoginRequest = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Too Short!")
      .max(40, "Too Long!")
      .required("Field Required!"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(40, "Too Long!")
      .required("Field Required!"),
  });

  const handleLogin = (authValue: LoginRequest) => {
    setLoading(true);
    dispatch(loginUser(authValue))
      .unwrap()
      .then(() => {
        history("/Dashboard", { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isSuccess) {
    return (
      <Navigate to="/Dashboard" state={{ from: location }} replace></Navigate>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='login_container'>
        <HomeNavBar />
        <div className="AuthFormContainer" >
          <div className="AuthFieldContainer">
            <AuthImage />
            <Formik
              initialValues={initialStates}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="form-group">
                  <FieldWrapper name="username" type="text" label="User Name" />
                </div>
                <br />
                <div className="form-group">
                  <FieldWrapper
                    name="password"
                    type="password"
                    label="Password"
                  />
                </div>
                <br />
                <div className="form-group">
                  <div className="col text-center">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      fullWidth
                      style={{ backgroundColor: "#57413A" }}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </Button>
                  </div>
                </div>
                <br />
                <Typography align="center">
                  Do you have an account? <Link to="/Register">Sign Up</Link>
                </Typography>
              </Form>
            </Formik>

            {message && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
              </Alert>
            )}
            <br />
          </div>
        </div>
        
      </div>
    </ThemeProvider>
  );
};

export default Login;
