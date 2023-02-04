import { CircularProgress, Dialog, DialogTitle, Slide } from "@mui/material";
import React, { forwardRef } from "react";

const LoadingDialog = ({ userLoading }) => {
  return (
    <>
      <Dialog
        open={userLoading}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          overflow: "hidden",
          ".MuiPaper-root": {
            borderRadius: "50%",
            opacity: 0.55,
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: "0",
            width: 45,
            height: 45,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={25} />
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default LoadingDialog;
