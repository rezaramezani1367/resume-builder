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
  colors,
  Slider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ImageUploadForm = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [open, setOpen] = useState(false);
  const [scaleImage, setScaleImage] = React.useState(1.4);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          onClick={(e) => (e.target.value = "")}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
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
          fontWeight={700}
          color={"primary.main"}
        >
          آپلود عکس
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            bgColor={colors.grey[500]}
            paddingTop={1}
          >
            <AvatarEditor
              image={imgSrc}
              width={250}
              height={200}
              border={50}
              color={[210, 210, 210, 0.6]} // RGBA
              scale={scaleImage}
              rotate={0}
            />
          </Box>
          <Box border={1} padding={1} marginTop={1} borderColor="divider">
            <Typography variant="p" fontSize={14} fontWeight={700}>
              تغییر مقیاس
            </Typography>
            <Slider
              min={1}
              max={4}
              step={0.1}
              size="small"
              defaultValue={1}
              aria-label="Small"
              valueLabelDisplay="auto"
              value={typeof scaleImage === "number" ? scaleImage : 0}
              onChange={(event, newValue) => {
                setScaleImage(newValue);
              }}
            />
          </Box>
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
