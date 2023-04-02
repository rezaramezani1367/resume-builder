import {
  Apartment,
  CalendarMonth,
  DoubleArrowRounded,
  Download,
  Fastfood,
  Info,
  LaptopMac,
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

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "./ShowResume.css";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";

const ShowResume = () => {
  return (
    <Box sx={{ bgcolor: "#333333", minHeight: "100vh" }}>
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
                  backgroundColor: "#eee",
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
                  <Avatar alt="" src="" sx={{ width: 80, height: 80 }} />
                  <Typography
                    color={colors.grey[700]}
                    fontWeight={600}
                    fontSize={18}
                  >
                    رضا رمضانی
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
                        کارشناس IT-برنامه نویس
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
                      <Typography fontSize={14}>reza30361@yahoo.com</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        شماره موبایل :
                      </Typography>
                      <Typography fontSize={14}>۰۹۳۹۶۱۶۰۰۸۹</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        سال تولد :
                      </Typography>
                      <Typography fontSize={14}>1367</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        جنسیت :
                      </Typography>
                      <Typography fontSize={14}>مرد</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        وضعیت سربازی :
                      </Typography>
                      <Typography fontSize={14}>انجام شده</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        وضعیت تأهل :
                      </Typography>
                      <Typography fontSize={14}>مجرد</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        استان سکونت :
                      </Typography>
                      <Typography fontSize={14}>تهران</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.75}>
                      <Typography
                        fontSize={14}
                        color={colors.grey[700]}
                        fontWeight={600}
                      >
                        آدرس :
                      </Typography>
                      <Typography fontSize={14}>شهرستان ورامین</Typography>
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
                    از سال 97 به برنامه نویسی علاقه مند شدم و دوست دارم در این
                    حوزه فعالیت کنم و دانشم را در این حوزه ارتقاء دهم. نمونه
                    کارهای بنده در گیت هاپ به آدرس
                    https://github.com/rezaramezani1367 موجود است که شامل یک
                    فروشگاه اینترنتی به آدرس
                    https://github.com/rezaramezani1367/ecommerce-fullstack-mern
                    و رزومه ساز(در حال تکمیل کردن) به آدرس
                    https://github.com/rezaramezani1367/resume-builder می باشد.
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
                    {/* item 1 */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
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
                          کارشناس IT-برنامه نویس تحت ویندوز
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
                          اریس سازه پارسیان(سناتور)
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
                          از خرداد ۱۳۹۶ تا اسفند ۱۳۹۹
                        </Typography>
                      </Stack>
                      <Typography variant="body2" lineHeight={2}>
                        از سال 97 علاوه بر فعالیت در قسمت IT ، بعنوان برنامه
                        نویس شرکت برنامه هایی برای محصولات شرکت ،کارگزینی ،آموزش
                        و... با زبان برنامه نویسی C# و دیتابیس MS SQL SERVER
                        بمدت سه سال پیاده سازی کردم.
                      </Typography>
                    </Box>
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
                      // display: "flex",
                      // flexDirection: "column",
                      // gap: 3,
                      paddingY: 3,
                    }}
                  >
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                      }}
                    >
                      <TimelineItem sx={{ minHeight: 45 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color="info"
                            sx={{
                              margin: 0,
                              minWidth: 17,
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            1
                          </TimelineDot>
                          <TimelineConnector sx={{ bgcolor: "info.light" }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                          <Typography
                            // variant="h6"
                            fontSize={14}
                            fontWeight={600}
                            component="span"
                            color={colors.grey[700]}
                          >
                            آشنا به redux
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem sx={{ minHeight: 45 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color="info"
                            sx={{
                              margin: 0,
                              minWidth: 17,
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            2
                          </TimelineDot>
                          <TimelineConnector sx={{ bgcolor: "info.light" }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                          <Typography
                            // variant="h6"
                            fontSize={14}
                            fontWeight={600}
                            component="span"
                            color={colors.grey[700]}
                          >
                            javascript
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem sx={{ minHeight: 45 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color="info"
                            sx={{
                              margin: 0,
                              minWidth: 17,
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            3
                          </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                          <Typography
                            // variant="h6"
                            fontSize={14}
                            fontWeight={600}
                            component="span"
                            color={colors.grey[700]}
                          >
                            آشنا به bootstrap
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
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
                    {/* item 1 */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
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
                          ریاضی فیزیک
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
                          مدرسه نمونه دکتر حسابی ورامین
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
                          از ۱۳۸۲ تا ۱۳۸۶
                        </Typography>
                      </Stack>
                      <Typography variant="body2" lineHeight={2}>
                        {/* از سال 97 علاوه بر فعالیت در قسمت IT ، بعنوان برنامه
                        نویس شرکت برنامه هایی برای محصولات شرکت ،کارگزینی ،آموزش
                        و... با زبان برنامه نویسی C# و دیتابیس MS SQL SERVER
                        بمدت سه سال پیاده سازی کردم. */}
                      </Typography>
                    </Box>
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
                      // display: "flex",
                      // flexDirection: "column",
                      // gap: 3,
                      paddingY: 3,
                    }}
                  >
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                      }}
                    >
                      <TimelineItem sx={{ minHeight: 45 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color="info"
                            sx={{
                              margin: 0,
                              minWidth: 17,
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            1
                          </TimelineDot>
                          <TimelineConnector sx={{ bgcolor: "info.light" }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                          <Typography
                            // variant="h6"
                            fontSize={14}
                            fontWeight={600}
                            component="span"
                            color={colors.grey[700]}
                          >
                            انگلیسی (متوسط)
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem sx={{ minHeight: 45 }}>
                        <TimelineSeparator>
                          <TimelineDot
                            color="info"
                            sx={{
                              margin: 0,
                              minWidth: 17,
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            2
                          </TimelineDot>
                          {/* <TimelineConnector sx={{ bgcolor: "info.light" }} /> */}
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingY: "0px", px: 2 }}>
                          <Typography
                            // variant="h6"
                            fontSize={14}
                            fontWeight={600}
                            component="span"
                            color={colors.grey[700]}
                          >
                            اسپانیا (متوسط)
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
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
