import { ImportExport, Add, Close, Save, OpenWith } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  Slide,
  Typography,
  colors,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Rating,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reorder, { reorder } from "react-reorder";
import { updateProfile } from "../../redux/actionUser";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LanguageSort = ({ setProfileStatus, profileStatus }) => {
  const [flag, setFlag] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);
  const [languageData, setLanguageData] = useState([]);
  const [editLanguageSync, setEditLanguageSync] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLanguageData(userData.profile?.languageSection);
    setEditLanguageSync(profileStatus.editLanguage ?? []);
  };
  useEffect(() => {
    setLanguageData(userData.profile?.languageSection ?? []);
    setEditLanguageSync(profileStatus.editLanguage ?? []);
  }, [userData.profile?.languageSection, profileStatus.editLanguage]);

  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      handleClose();
      setFlag(false);
      setProfileStatus((last) => {
        return { ...last, editLanguage: editLanguageSync };
      });
    }
  }, [userLoading, isSuccess, flag]);
  // console.log(editLanguageSync);
  return (
    <>
      <IconButton aria-label="sort" onClick={handleClickOpen}>
        <ImportExport />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent dividers sx={{ padding: 0 }}>
          <Box
            sx={{
              padding: 2,
              "& .placeholder": {
                background: "#ccc!important",
              },
              "& .dragged": {
                background: "#ccc!important",
                opacity: 0.5,
              },
            }}
          >
            <Reorder
              reorderId="languageSort"
              onReorder={(event, previousIndex, nextIndex, fromId, toId) => {
                setEditLanguageSync(
                  reorder(editLanguageSync, previousIndex, nextIndex)
                );
                setLanguageData(reorder(languageData, previousIndex, nextIndex));
              }}
              style={{ display: "flex", gap: 8, flexDirection: "column" }}
            >
              {languageData.map((item, index) => (
                <Box
                  key={`${index}-${item.languageName.name}`}
                  sx={{
                    padding: 2,
                    border: 1,
                    borderColor: "divider",
                    cursor: "pointer",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <OpenWith fontSize="12px" sx={{ color: colors.red.A700 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={colors.brown.A700}
                      fontWeight={600}
                      fontSize={15.5}
                    >
                      {"زبان "}
                      {item.languageName.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: colors.pink[500],
                        },
                      }}
                      value={item.languageLevel.id}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Box>
                </Box>
              ))}
            </Reorder>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: 2,
              padding: 1.5,
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<Close />}
              onClick={handleClose}
            >
              انصراف
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={() => {
                setFlag(true);
                const variables = { languageSection: [...languageData] };
                dispatch(updateProfile(variables));
              }}
            >
              ذخیره
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LanguageSort;
