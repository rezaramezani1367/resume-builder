import {
  AccountCircle,
  Login as LoginIcon,
  PersonAddAlt1,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../redux/actionUser";

const Signup = () => {
  const [status, setStatus] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
      userError,
    },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    let errors = {};
    if (values.username.length < 5) {
      errors.username = "نام کاربری حداقل باید شامل 5 کاراکتر باشد";
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
        values.password
      )
    ) {
      errors.password = `رمزعبور حداقل شامل 8 کاراکتر(انگلیسی) شامل حداقل یک حرف بزرگ وکوچک و  یک عدد و یک عبارت خاص باشد `;
    }
    if (
      !(values.password === values.confrimPassword && values.confrimPassword)
    ) {
      errors.confrimPassword = "تکرار رمز عبور با رمز عبور مطابقت ندارد";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "فرمت ایمیل معتبر نیست";
    }
    if (!/^[0][9][0-9]{9}$/.test(values.mobile)) {
      errors.mobile = `شماره تلفن باید شامل 11 کاراکتر که با 09 شروع شود باشد مثل 09123456789`;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confrimPassword: "",
      email: "",
      mobile: "",
    },
    onSubmit: (values) => {
      setStatus(true);
      dispatch(createUser(values));
    },
    validate,
  });
  useEffect(() => {
    if (isSuccess && status) {
      navigate("/");
    }
  }, [isSuccess, status]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontWeight="bold"
      minHeight="100vh"
    >
      <Paper
        elevation={2}
        sx={{
          border: 1,
          borderColor: "divider",
          overflow: "hidden",
          borderRadius: 2,
          width: 500,
          minWidth: 270,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={1}
          gap={1}
          flexDirection="column"
        >
          <AccountCircle sx={{ color: "error.main" }} fontSize="large" />
          <Typography variant="h5" component="div" color="info.main">
            صفحه ثبت نام
          </Typography>
        </Box>
        <Divider />
        <Box
          component="form"
          noValidate
          autoComplete="off"
          padding={2}
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            error={formik.errors.username && formik.touched.username}
            helperText={
              formik.errors.username && formik.touched.username
                ? formik.errors.username
                : ""
            }
            name="username"
            id="username"
            autoComplete="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="نام کاربری"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            error={formik.errors.email && formik.touched.email}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="ایمیل"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            error={formik.errors.password && formik.touched.password}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
            autoComplete="current-password"
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="رمز عبور"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            error={
              formik.errors.confrimPassword && formik.touched.confrimPassword
            }
            helperText={
              formik.errors.confrimPassword && formik.touched.confrimPassword
                ? formik.errors.confrimPassword
                : ""
            }
            type="password"
            name="confrimPassword"
            id="confrimPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="تکرار رمز عبور"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            error={formik.errors.mobile && formik.touched.mobile}
            helperText={
              formik.errors.mobile && formik.touched.mobile
                ? formik.errors.mobile
                : ""
            }
            name="mobile"
            id="mobile"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="موبایل"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Box sx={{ textAlign: "center", paddingTop: 1 }}>
            <LoadingButton
              loading={userLoading}
              variant="contained"
              startIcon={<PersonAddAlt1 />}
              type="submit"
            >
              ثبت نام
            </LoadingButton>
          </Box>
        </Box>
        <Box padding={1}>
          <NavLink
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/login"
          >
            <Button variant="outlined" startIcon={<LoginIcon />}>
              ورود
            </Button>
          </NavLink>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
