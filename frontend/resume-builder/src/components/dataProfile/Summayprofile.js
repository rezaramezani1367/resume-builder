import { Box, Button, colors, Stack, Typography } from "@mui/material";
import { ModeEdit, Visibility, Grading } from "@mui/icons-material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";
import EmptyValue from "../EmptyValue";

const Summayprofile = ({ setProfileStatus, userData }) => {
  return (
    <Grid
      xs={12}
      md={9}
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          "#edit1": {
            display: "block",
          },
        },
      }}
    >
      <Box
        id="edit1"
        position="absolute"
        top={10}
        right={10}
        sx={{ display: { xs: "block", md: "none" } }}
        onClick={() =>
          setProfileStatus((last) => {
            return { ...last, summaryEditStatus: true };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      <Typography
        variant="h5"
        component="div"
        color="primary.main"
        fontWeight={700}
        marginBottom={1}
      >
        {userData?.username}
      </Typography>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          نام و نام خانوادگی:
        </Typography>
        <Typography variant="p" fontWeight={600} component="span">
          {userData?.profile?.fullname ?? <EmptyValue />}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          عنوان شغلی:
        </Typography>
        <Typography variant="p" fontWeight={600} component="span">
          {userData?.profile?.jobTitle ?? <EmptyValue />}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          {" "}
          وضعیت اشتغال:
        </Typography>
        <Typography variant="p" fontWeight={600} component="span">
          {userData?.profile?.employmentStatus ?? <EmptyValue />}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          {" "}
          آخرین شرکت:
        </Typography>
        <Typography
          variant="p"
          fontWeight={500}
          component="span"
          color="secondary"
        >
          {userData?.profile?.resumeSection.length ? (
            <Button
              size="small"
              variant="text"
              sx={{ paddingTop: 0.5, fontWeight: 700 }}
              color="secondary"
              onClick={() => {
                const element = document
                  .getElementById("resume-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {userData?.profile?.resumeSection[0]?.resumeTitle} -
              {userData?.profile?.resumeSection[0]?.companyName}
            </Button>
          ) : (
            <EmptyValue />
          )}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          {" "}
          آخرین مدرک تحصیلی:
        </Typography>
        <Typography
          variant="p"
          fontWeight={500}
          component="span"
          color="secondary"
        >
          {userData?.profile?.educationalSection.length ? (
            <Button
              size="small"
              variant="text"
              sx={{ paddingTop: 0.5, fontWeight: 700 }}
              color="secondary"
              onClick={() => {
                const element = document
                  .getElementById("education-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {userData?.profile?.educationalSection[0]?.field} -
              {userData?.profile?.educationalSection[0]?.universityName}
            </Button>
          ) : (
            <EmptyValue />
          )}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <NavLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/user/resume"
        >
          <Button variant="outlined" startIcon={<Visibility />}>
            مشاهده رزومه
          </Button>
        </NavLink>
        {/* <NavLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/login"
        >
          <Button variant="outlined" startIcon={<Grading />}>
            دریافت فایل رزومه
          </Button>
        </NavLink> */}
      </Stack>
    </Grid>
  );
};

export default Summayprofile;
