import {
  Apartment,
  CalendarMonth,
  DoubleArrowRounded,
  Download,
  Info,
  Language,
  NavigateNext,
  Print,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  colors,
  Divider,
  Link,
  Paper,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import { getUserTest } from "../redux/actionUser";
import LoadingDialog from "./LoadingDialog";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import { baseUrl } from "../redux/constants";

const ShowResume = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
      userError,
    },
  } = useSelector((last) => last);
  useEffect(() => {
    dispatch(getUserTest());
  }, []);
  return (
    <Box sx={{ bgcolor: "#333333", minHeight: "100vh" }}>
      <LoadingDialog userLoading={userLoading} />
      {/* header */}
      <Box
        bgcolor="#000"
        color="white"
        padding={2}
        sx={{
          display: "flex",
          justifyContent: { xs: "start", sm: "space-between" },
          alignItems: { xs: "center", sm: "start" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 3, sm: 0 },
        }}
      >
        <Box>
          <Breadcrumbs
            sx={{
              "& .MuiBreadcrumbs-separator": {
                color: "#444",
              },
            }}
            aria-label="breadcrumb"
            color="#777"
            separator={<NavigateNext />}
          >
            <Link underline="none" color="inherit" href="/">
              رزومه
            </Link>
            <Link underline="none" color="inherit">
              نمایش رزومه
            </Link>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<Print />}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            پرینت
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<Share />}
          >
            به اشتراک گذاری
          </Button>
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<Download />}
          >
            دریافت رزومه
          </Button>
        </Box>
      </Box>
      {/* info */}
      <Box
        sx={{
          color: "#555",
          backgroundColor: "#ffc457",
          fontSize: "11px!important",
          lineHeight: "1.8181818182",
          padding: 1,
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Info fontSize="small" />
        <Typography variant="inherit">
          اطلاعات تماس داخل رزومه فقط به خود شما و کارفرمایانی که برایشان رزومه
          ارسال کرده‌اید نمایش داده می‌شود.
          <Link color="inherit" href="/">
            اطلاعات بیشتر
          </Link>
        </Typography>
      </Box>
      {/* resume section */}
      <Box sx={{ padding: 3 }}>
        <Container>
          <Paper sx={{ borderRadius: 0 }}>
            <Grid container>
              <Grid
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  bgcolor: { xs: "", md: "#eee" },
                }}
              >
                {/* section1 */}
                <Box
                  sx={{
                    paddingTop: 5,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Avatar
                    alt=""
                    src={userData?.image ? `${baseUrl}/${userData?.image}` : ""}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography
                    color={colors.grey[700]}
                    fontWeight={600}
                    fontSize={18}
                  >
                    {userData?.profile?.fullname}
                  </Typography>
                </Box>
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    اطلاعات شخصی
                  </Divider>
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      gap: 1.5,
                      flexDirection: "column",
                    }}
                  >
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        تخصص :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData?.profile?.jobTitle}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        آدرس ایمیل :
                      </Typography>
                      <Typography fontSize={14}>{userData?.email}</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        شماره موبایل :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData.profile?.mobile}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        سال تولد :
                      </Typography>
                      <Typography fontSize={14}>
                        {new DateObject({
                          date: `${userData.profile?.birthday}`,
                          locale: persian_fa,
                          calendar: persian,
                        }).format("D MMMM YYYY")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        جنسیت :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData.profile?.gender}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        وضعیت سربازی :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData.profile?.militarySituation.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        وضعیت تأهل :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData.profile?.maritalStatus}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        استان سکونت :
                      </Typography>
                      <Typography fontSize={14}>
                        {userData.profile?.province?.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        آدرس :
                      </Typography>
                      <Typography fontSize={14}>
                        شهرستان {userData.profile?.city?.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid
                xs={12}
                md={8}
                sx={{
                  padding: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* about me */}
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    درباره‌ی من
                  </Divider>
                  <Typography variant="body2" lineHeight={2} paddingTop={1}>
                    {userData.profile?.aboutMe}
                  </Typography>
                </Box>
                {/* resume section */}
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    سوابق شغلی
                  </Divider>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      paddingY: 3,
                    }}
                  >
                    {userData.profile?.resumeSection.map((item, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                        key={`${item.resumeTitle}${index}`}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <DoubleArrowRounded fontSize="small" />
                          <Typography
                            fontSize={15}
                            color={colors.grey[800]}
                            fontWeight={600}
                          >
                            {item.resumeTitle}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <Apartment fontSize="small" />
                          <Typography fontSize={14} fontWeight={600}>
                            {item.companyName}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <CalendarMonth fontSize="small" />
                          <Typography fontSize={12} fontWeight={600}>
                            از{" "}
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
                          </Typography>
                        </Stack>
                        <Typography variant="body2" lineHeight={2}>
                          {item.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                {/* skill section */}
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    مهارت‌ها
                  </Divider>
                  <Box
                    sx={{
                      paddingY: 3,
                    }}
                  >
                    <Timeline
                      sx={{
                        padding: 0,
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                      }}
                    >
                      {userData.profile?.skills.map((item, index) => (
                        <TimelineItem
                          sx={{ minHeight: 40 }}
                          key={`${item}${index}`}
                        >
                          <TimelineSeparator>
                            <TimelineDot
                              sx={{
                                margin: 0.1,
                                minWidth: 16,
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 600,
                                bgcolor: colors.blueGrey[500],
                                height: 14,
                                alignItems: "center",
                                boxShadow: 2,
                              }}
                            >
                              {++index}
                            </TimelineDot>
                            {index !== userData.profile?.skills?.length && (
                              <TimelineConnector
                                sx={{ bgcolor: colors.blueGrey[200] }}
                              />
                            )}
                          </TimelineSeparator>
                          <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                            <Typography
                              // variant="h6"
                              fontSize={14}
                              fontWeight={600}
                              component="span"
                              color={colors.grey[700]}
                            >
                              {item}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Box>
                </Box>
                {/* education section */}
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    سوابق تحصیلی
                  </Divider>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      paddingY: 3,
                    }}
                  >
                    {userData.profile?.educationalSection.map((item, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                        key={`${item.field}${index}`}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <DoubleArrowRounded fontSize="small" />
                          <Typography
                            fontSize={15}
                            color={colors.grey[800]}
                            fontWeight={600}
                          >
                            {item.field} {" - "}
                            {item.grade.name}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <Apartment fontSize="small" />
                          <Typography fontSize={14} fontWeight={600}>
                            {item.universityName}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          color={colors.grey[700]}
                        >
                          <CalendarMonth fontSize="small" />
                          <Typography fontSize={12} fontWeight={600}>
                            از{" "}
                            {new DateObject({
                              date: `${item.date[0]}`,
                              locale: persian_fa,
                              calendar: persian,
                            }).format("DD MMMM YYYY")}{" "}
                            الی {"  "}
                            {item.date[1]
                              ? new DateObject({
                                  date: `${item.date[1]}`,
                                  locale: persian_fa,
                                  calendar: persian,
                                }).format("DD MMMM YYYY")
                              : "..."}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" lineHeight={2}>
                          {item.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                {/* language section */}
                <Box>
                  <Divider
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "primary.dark",
                    }}
                  >
                    زبان‌های مسلط
                  </Divider>
                  <Box
                    sx={{
                      paddingY: 3,
                    }}
                  >
                    <Timeline
                      sx={{
                        padding: 0,
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                      }}
                    >
                      {userData.profile?.languageSection.map((item, index) => (
                        <TimelineItem
                          sx={{ minHeight: 40 }}
                          key={`${item.languageName.name}${index}`}
                        >
                          <TimelineSeparator>
                            <TimelineDot
                              sx={{
                                margin: 0.1,
                                minWidth: 16,
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 600,
                                bgcolor: colors.blueGrey[500],
                                height: 14,
                                alignItems: "center",
                                boxShadow: 2,
                              }}
                            >
                              {++index}
                            </TimelineDot>
                            {index !==
                              userData.profile?.languageSection?.length && (
                              <TimelineConnector
                                sx={{ bgcolor: colors.blueGrey[200] }}
                              />
                            )}
                          </TimelineSeparator>
                          <TimelineContent
                            color={colors.grey[700]}
                            sx={{ paddingY: "0px", px: 2 }}
                          >
                            <Typography
                              // variant="h6"
                              fontSize={14}
                              fontWeight={600}
                              component="span"
                            >
                              {item.languageName.name}({item.languageLevel.name}
                              )
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ShowResume;
