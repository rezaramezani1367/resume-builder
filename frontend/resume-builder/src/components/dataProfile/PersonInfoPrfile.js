import { Box, Button, colors, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { ModeEdit } from "@mui/icons-material";
import { useSelector } from "react-redux";

const PersonInfoPrfile = ({ setProfileStatus,userData }) => {

  return (
    <Box
      padding={1.5}
      position="relative"
      sx={{
        cursor: "pointer",
        "&:hover": {
          "#edit2": {
            display: "block",
          },
        },
      }}
    >
      
      <Box
        id="edit2"
        position="absolute"
        top={10}
        right={10}
        sx={{display:{xs:"block",md:"none"}}}
        onClick={() =>
          setProfileStatus((last) => {
            return { ...last, personInfoEditStatus: true };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            آدرس ایمیل:
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
           {userData?.email}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            شماره موبایل:
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
          {userData?.mobile}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            استان محل سکونت:
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            تهران
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            آدرس محل سکونت (اختیاری):
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            ورامین
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            وضعیت تاهل
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            مجرد
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            سال تولد
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            1367
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            جنسیت
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            مرد
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            وضعیت خدمت سربازی
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            انجام شده
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonInfoPrfile;
