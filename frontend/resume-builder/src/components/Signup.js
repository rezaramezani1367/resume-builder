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
import React from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
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
          minWidth:270
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
          <AccountCircle  sx={{ color: "error.main" }} fontSize="large" />
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
          // onSubmit={formik.handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="ایمیل"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="رمز عبور"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="تکرار رمز عبور"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="موبایل"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <Button variant="contained" startIcon={<PersonAddAlt1 />}>
            ثبت نام
          </Button>
        </Box>
        <Box padding={2}>
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
