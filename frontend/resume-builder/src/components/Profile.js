import {
  Avatar,
  Box,
  Button,
  colors,
  Divider,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  PersonAddAlt,
  ModeEdit,
  Visibility,
  Grading,
  Person,
} from "@mui/icons-material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <Box>
      {/* section 1 include image && summery info */}

      <Grid container sx={{ border: 1, borderColor: "divider" }}>
        <Grid
          xs={12}
          md={3}
          sx={{
            borderRight: { xs: 0, md: 1 },
            borderBottom: { xs: 1, md: 0 },
            borderColor: { xs: "divider", md: "divider" },
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ width: 75, height: 75 }} />
          <Button variant="outlined" startIcon={<PersonAddAlt />} size="small">
            آپلود عکس
          </Button>
        </Grid>
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
            display="none"
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
      </Grid>

      {/* section 2 includes personal information */}
      <Box border={1} borderColor="divider" marginTop={2}>
        <Box bgcolor={colors.grey[200]} color={colors.grey[700]} sx={{display:'flex',gap:1}} padding={1.5}>
          <Person  />
          <Typography variant="h6" >اطلاعات فردی</Typography>
        </Box>
        <Divider />
        <Box padding={1.5}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero maiores
          veniam molestias recusandae. Consequatur quo veritatis eveniet
          similique tempora natus delectus sequi illo eaque quia magni illum
          deleniti, fugiat exercitationem.
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
