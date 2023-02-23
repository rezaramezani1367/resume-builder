import React, { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialog({
  title,
  buttonPrpos,
  description,
  handleSave,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button {...buttonPrpos} onClick={handleClickOpen}>
        {buttonPrpos.name}
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .muirtl-twia2z-MuiPaper-root-MuiDialog-paper": { padding: 0 },
          // position: "relative",
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>{title ?? "title"}؟</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description ?? " "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            خیر
          </Button>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => {
              handleSave();
              handleClose();
            }}
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
