import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingDialog = ({ userLoading }) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 10000 }}
        open={userLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LoadingDialog;
