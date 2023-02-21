import {
  Close,
  PersonAddAlt,
  RotateLeft,
  Save,
  ThreeSixty,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Avatar,
  IconButton,
  colors,
  Slider,
  Typography,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { UploadProfileImage } from "../../redux/actionUser";
import { baseUrl } from "../../redux/constants";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ImageUploadForm = () => {
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);
  const [flag, setFlag] = useState(false);
  const editor = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [open, setOpen] = useState(false);
  const [scaleImage, setScaleImage] = React.useState(1.4);
  const [rotateImage, setRotateImage] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setOpen(false);
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  return (
    <>
      <Avatar
        src={`${baseUrl}/${userData?.image}`}
        sx={{ width: 75, height: 75 }}
      />
      <Button
        component="label"
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
            const file = e.target.files;
            let format = ["jpg", "png", "jpeg", "jfif", "pjpeg", "pjp"];
            if (!format.includes(file[0].name.split(".")[1].toLowerCase())) {
              alert(`format image must be ${format.join("/")}`);
            } else {
              setImgSrc(null);
              if (file && file.length > 0) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  setImgSrc(reader.result?.toString() || "");

                  setOpen(true);
                });
                reader.readAsDataURL(file[0]);
              }
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
          sx={{ paddingY: 1 }}
          textAlign="center"
          fontWeight={700}
          color={"primary.main"}
        >
          آپلود عکس
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            bgcolor={colors.grey[500]}
            paddingTop={0.75}
          >
            <AvatarEditor
              ref={editor}
              image={imgSrc}
              width={250}
              height={200}
              border={50}
              color={[210, 210, 250, 0.7]} // RGBA
              scale={scaleImage}
              rotate={rotateImage}
            />
          </Box>
          <Box paddingY={0.125} paddingX={1} position="relative">
            <Box position="absolute" top={3} right={0}>
              <Tooltip title="تنظیمات اولیه" arrow>
                <IconButton
                  color="secondary"
                  aria-label="default setting"
                  size="small"
                  onClick={() => {
                    setRotateImage(0);
                    setScaleImage(1.4);
                  }}
                >
                  <ThreeSixty />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="p" fontSize={10} fontWeight={700}>
              مقیاس
            </Typography>
            <Slider
              sx={{ paddingY: 0.125 }}
              min={1}
              max={4}
              step={0.1}
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={typeof scaleImage === "number" ? scaleImage : 0}
              onChange={(event, newValue) => {
                setScaleImage(newValue);
              }}
            />
            <Typography variant="p" fontSize={10} fontWeight={700}>
              چرخش
            </Typography>
            <Slider
              sx={{ paddingY: 0.125 }}
              min={0}
              max={360}
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={typeof rotateImage === "number" ? rotateImage : 0}
              onChange={(event, newValue) => {
                setRotateImage(newValue);
                setFlag(true);
              }}
            />
          </Box>
        </DialogContent>
        <Box paddingX={0.5}>
          <DialogActions>
            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<Close />}
              onClick={handleClose}
            >
              انصراف
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="success"
              startIcon={<Save />}
              onClick={() => {
                const img = editor.current
                  ?.getImageScaledToCanvas()
                  .toDataURL();
                setFlag(true);
                // const rect = editor.current?.getCroppingRect();
                // console.log({ img });
                dispatch(
                  UploadProfileImage({
                    newImage: img,
                    username: userData.username,
                  })
                );
              }}
            >
              ذخیره
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ImageUploadForm;
