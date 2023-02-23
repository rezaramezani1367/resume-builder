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
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import Reorder, { reorder } from "react-reorder";
import { updateProfile } from "../../redux/actionUser";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ResumeSort = ({ setProfileStatus, profileStatus }) => {
  const [flag, setFlag] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);
  const [resumeData, setResumeData] = useState([]);
  const [editResumeSync, setEditResumeSync] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResumeData(userData.profile?.resumeSection);
    setEditResumeSync(profileStatus.editResume ?? []);
  };
  useEffect(() => {
    setResumeData(userData.profile?.resumeSection ?? []);
    setEditResumeSync(profileStatus.editResume ?? []);
  }, [userData.profile?.resumeSection, profileStatus.editResume]);

  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      handleClose();
      setFlag(false);
      setProfileStatus((last) => {
        return { ...last, editResume: editResumeSync };
      });
    }
  }, [userLoading, isSuccess, flag]);
  // console.log(editResumeSync);
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
              reorderId="resumeSort"
              onReorder={(event, previousIndex, nextIndex, fromId, toId) => {
                setEditResumeSync(
                  reorder(editResumeSync, previousIndex, nextIndex)
                );
                setResumeData(reorder(resumeData, previousIndex, nextIndex));
              }}
              style={{ display: "flex", gap: 8, flexDirection: "column" }}
            >
              {resumeData.map((item, index) => (
                <Box
                  key={`${index}-${item.resumeTitle}`}
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
                  <Box>
                    <Typography
                      variant="h6"
                      color={colors.brown.A700}
                      fontWeight={600}
                      fontSize={17}
                    >
                      {item.resumeTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      marginBottom={1}
                      color={colors.grey[600]}
                      fontWeight={600}
                    >
                      {item.companyName}{" "}
                      <Typography variant="span" fontSize={9}>
                        (از{" "}
                        {new DateObject({
                          date: `${item.dateJob[0]}`,
                          locale: persian_fa,
                          calendar: persian,
                        }).format("DD MMMM YYYY")}{" "}
                        الی {"  "}
                        {item.dateJob[1]
                          ? new DateObject({
                              date: `${item.dateJob[1]}`,
                              locale: persian_fa,
                              calendar: persian,
                            }).format("DD MMMM YYYY")
                          : "..."}
                        )
                      </Typography>
                    </Typography>
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
                const variables = { resumeSection: [...resumeData] };
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

export default ResumeSort;
