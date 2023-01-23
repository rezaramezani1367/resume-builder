import { Box, Button, colors, Stack, Typography } from "@mui/material";
import { ModeEdit, Visibility, Grading } from "@mui/icons-material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";

const Summayprofile = ({ setProfileStatus }) => {
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
        sx={{display:{xs:"block",md:"none"}}}
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
        رضا رمضانی
      </Typography>
      <Stack direction="row" gap={2}>
        <Typography
          variant="subtitle1"
          component="span"
          fontWeight={500}
          color={colors.grey[600]}
        >
          {" "}
          عنوان شغلی:
        </Typography>
        <Typography variant="p" fontWeight={600} component="span">
          {" "}
          IT{" "}
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
          {" "}
          جویای‌کار{" "}
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
        <Typography variant="p" fontWeight={600} component="span">
          {" "}
          سناتور{" "}
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
        <Typography variant="p" fontWeight={600} component="span">
          {" "}
          لیسانس علوم کامپیوتر{" "}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <NavLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/login"
        >
          <Button variant="outlined" startIcon={<Visibility />}>
            مشاهده رزومه
          </Button>
        </NavLink>
        <NavLink
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/login"
        >
          <Button variant="outlined" startIcon={<Grading />}>
            دریافت فایل رزومه
          </Button>
        </NavLink>
      </Stack>
    </Grid>
  );
};

export default Summayprofile;
