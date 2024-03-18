import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Formik, Form } from "formik";
import { clearAuthMessage } from "../../features/auth/authMsgSlice";
import { clearAuthState } from "../../features/auth/authSlice";
import { IRegisterRequest } from "../../interfaces/register";
import { registerUser } from "../../action_creators/auth/register";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Button, Alert, AlertTitle, Typography } from "@mui/material";
import { FieldWrapper } from "../../components/form_components/FieldWrapper";
import { AuthImage } from "../../style_components/auth/auth_form";
import "../../style_components/auth/login_style.css";
import HomeNavBar from "../homepage/HomeNavBar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../style_components/global_theme_provider";

const SignUp: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { message } = useAppSelector((state) => state.authMsg);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, []);

  useEffect(() => {
    dispatch(clearAuthMessage());
  }, [dispatch]);

  const initialRegisterRequest: IRegisterRequest = {
    name: "",
    username: "",
    password: "",
    confirm_password: "",
  };
  const checkLowercaseRegex: RegExp = /(?=.*[a-z])/;
  const checkUppercaseRegex: RegExp = /(?=.*[A-Z])/;
  const checkNumericRegex: RegExp = /(?=.*[0-9])/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Field Required!"),
    username: Yup.string()
      .lowercase()
      .min(6, "Too Short!")
      .max(40, "Too Long!")
      .required("Field Required!"),
    password: Yup.string()
      .matches(checkLowercaseRegex, "One Lowercase Required!")
      .matches(checkUppercaseRegex, "One Uppercase Required!")
      .matches(checkNumericRegex, "One Number Required!")
      .min(6, "Too Short!")
      .max(40, "Too Long!")
      .required("Field Required!"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Field Required!"),
  });

  const handleRegister = ({ name, username, password }: IRegisterRequest) => {
    setIsRegistered(false);
    dispatch(registerUser({ name, username, password }))
      .unwrap()
      .then(() => {
        setIsRegistered(true);
      })
      .catch(() => {
        setIsRegistered(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login_container">
        <HomeNavBar />
        <div className="AuthFormContainer">
          <div className="AuthFieldContainer">
            <AuthImage />
            <Formik
              initialValues={initialRegisterRequest}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form>
                {!isRegistered && (
                  <div>
                    <div className="form-group">
                      <FieldWrapper name="name" type="text" label="Nick Name" />
                    </div>
                    <br />
                    <div className="form-group">
                      <FieldWrapper
                        name="username"
                        type="text"
                        label="User Name"
                      />
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
                      <FieldWrapper
                        name="confirm_password"
                        type="password"
                        label="Confirm Password"
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <div className="col text-center">
                        <Button type="submit" variant="contained" fullWidth>
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <br />
                <Typography align="center">
                  Already had an account? <Link to="/Login">Login</Link>
                </Typography>
              </Form>
            </Formik>

            {message && (
              <div className="login_container">
                <div className="form-group">
                  {isRegistered ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      {message}
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {message}
                    </Alert>
                  )}
                </div>
              </div>
            )}
            <br />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;
