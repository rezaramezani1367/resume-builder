import { ImportExport, Add, Close, Save, OpenWith } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  Slide,
  Typography,
  colors,
  Box,
  Button,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable,
} from "react-reorder";
import { updateProfile } from "../../redux/actionUser";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ResumeSort = () => {
  const [flag, setFlag] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);
  const [resumeData, setResumeData] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setResumeData(userData.profile?.resumeSection ?? []);
  }, [userData.profile?.resumeSection]);

  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      handleClose();
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);
  console.log({ resumeData });
  return (
    <>
      <IconButton aria-label="sort" onClick={handleClickOpen}>
        <ImportExport />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            padding: 2,
            width: { sm: 400, md: 500 },
            "& .placeholder": {
              background: "#ccc!important",
            },
            "& .dragged": {
              background: "#ccc!important",
            },
          }}
        >
          <Reorder
            reorderId="resumeSort"
            onReorder={(event, previousIndex, nextIndex, fromId, toId) => {
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
      </Dialog>
    </>
  );
};

export default ResumeSort;
