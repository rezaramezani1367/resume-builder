import { Box, Button, Chip, colors, styled, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  AccessTime,
  BeachAccess,
  Close,
  LocalLibrary,
  ModeEdit,
  Moving,
  DirectionsBusFilled,
  LunchDining,
} from "@mui/icons-material";
import EmptyValue from "../EmptyValue";
import JobBenefitsItem from "./JobBenefitsItem";

const benefitsItem = [
  {
    name: "امکان ترفیع سمت",
    icon: <Moving sx={{ transform: "scaleX(1)" }} />,
    nameEN: "promotion",
  },
  { name: "بیمه", icon: <BeachAccess />, nameEN: "Insurance" },
  {
    name: "دوره‌های آموزشی",
    icon: <LocalLibrary />,
    nameEN: "educationCourses",
  },
  {
    name: "ساعت کاری منعطف",
    icon: <AccessTime sx={{ transform: "scaleX(1)" }} />,
    nameEN: "flexibleHours",
  },
  {
    name: "سرویس رفت‌و‌آمد",
    icon: <DirectionsBusFilled />,
    nameEN: "shuttleService",
  },
  {
    name: "غذا به عهده شرکت",
    icon: <LunchDining />,
    nameEN: "food",
  },
];
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const PreferencesSection = ({ setProfileStatus, userData }) => {
  return (
    <Box
      padding={1.5}
      position="relative"
      sx={{
        cursor: "pointer",
        "&:hover": {
          "#preference": {
            display: "block",
          },
        },
      }}
    >
      <Box
        id="preference"
        position="absolute"
        top={10}
        right={10}
        sx={{ display: { xs: "block", md: "none" } }}
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
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            استان‌های مورد نظر برای کار:
          </Typography>
          {userData.profile?.preferencesSection?.provinces?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.provinces.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data.name}-${index}`}
                      label={data.name}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            دسته‌بندی شغلی و زمینه‌کاری:
          </Typography>
          {userData.profile?.preferencesSection?.categories?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.categories.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data.name}-${index}`}
                      label={data.name}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            سطح ارشدیت در زمینه فعالیت:
          </Typography>
          {userData.profile?.preferencesSection?.seniorityLevel?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.seniorityLevel.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data}-${index}`}
                      label={data}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            نوع قراردادهای قابل قبول:
          </Typography>
          {userData.profile?.preferencesSection?.contractType?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.contractType.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data}-${index}`}
                      label={data}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            حداقل حقوق درخواستی:
          </Typography>
          <Typography variant="p" component="div" color={colors.grey[600]}>
            {userData?.profile?.preferencesSection?.MinimumSalary?.name ? (
              <Chip
                variant="outlined"
                label={
                  userData?.profile?.preferencesSection?.MinimumSalary?.name
                }
              />
            ) : (
              <EmptyValue />
            )}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            مزایای شغلی مورد نظر:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingY: 1,
              gap: 1,
            }}
          >
            {benefitsItem.map((item, index) => (
              <JobBenefitsItem
                key={item.name}
                item={item}
                active={
                  userData?.profile?.preferencesSection?.jobBenefits[
                    item.nameEN
                  ]
                }
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreferencesSection;
