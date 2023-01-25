import { Close, PersonAddAlt, Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ImageUploadForm = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  return (
    <>
      <Avatar src="/broken-image.jpg" sx={{ width: 75, height: 75 }} />
      <Button
      component="label"
        // onClick={handleClickOpen}
        variant="outlined"
        startIcon={<PersonAddAlt />}
        size="small"
      >
        آپلود عکس
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setCrop(undefined); // Makes crop preview update between images.
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                setImgSrc(reader.result?.toString() || "");

                setOpen(true);
              });
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
      </Button>


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle
          fontSize={22}
          textAlign="center"
          borderBottom={1}
          borderColor="divider"
        >
          آپلود عکس
        </DialogTitle>
        <DialogContent>
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={imgSrc} />
          </ReactCrop>
        </DialogContent>
        <Box borderTop={1} borderColor="divider" padding={1}>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              startIcon={<Close />}
              onClick={handleClose}
            >
              انصراف
            </Button>
            <Button variant="contained" color="success" startIcon={<Save />}>
              ذخیره
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ImageUploadForm;
