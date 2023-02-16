import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Settings from "react-multi-date-picker/plugins/settings";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import RangePickerFooter from "react-multi-date-picker/plugins/range_picker_footer";
import { display } from "@mui/system";

const ResumeForm = ({ setProfileStatus }) => {
  const [flag, setFlag] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);

  const dispatch = useDispatch();

  const validate = (values) => {
    let errors = {};

    if (!values.resumeTitle) {
      errors.resumeTitle = "  عنوان شغلی نباید خالی باشد.";
    }
    if (!values.companyName) {
      errors.companyName = "نام شرکت نباید خالی باشد.";
    }
    if (!values.dateJob.length) {
      errors.dateJob = " تاریخ شروع نباید خالی باشد.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      resumeTitle: "",
      companyName: "",
      description: "",
      dateJob: [],
    },
    onSubmit: (values) => {
      setFlag(true);
      dispatch(
        updateProfile({
          resumeSection: [...userData.profile?.resumeSection, values],
        })
      );
    },
    validate,
  });

  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, newResume: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);
  console.log({ userLoading, isSuccess, flag });
  console.log(formik.errors);
  return (
    <Box
      padding={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <TextField
            autoFocus
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.resumeTitle && formik.touched.resumeTitle}
            helperText={
              formik.errors.resumeTitle && formik.touched.resumeTitle
                ? formik.errors.resumeTitle
                : ""
            }
            name="resumeTitle"
            id="resumeTitle"
            value={formik.values.resumeTitle}
            label="عنوان شغلی(سمت)"
            placeholder=""
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            sx={{
              "& input": {
                paddingY: "13px",
              },
            }}
            size="small"
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!formik.errors.companyName}
            helperText={
              formik.errors.companyName && formik.touched.companyName
                ? formik.errors.companyName
                : ""
            }
            name="companyName"
            id="companyName"
            value={formik.values.companyName}
            label="نام شرکت"
            placeholder=""
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            sx={{
              "& input": {
                paddingY: "13px",
              },
            }}
            size="small"
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          sx={{
            ".rmdp-wrapper": {
              paddingX: 1,
            },
            ".rmdp-button": {
              display: "none",
            },
            "& h6": {
              fontWeight: 700,
              marginBottom: 1.5,
              textAlign: "center",
              width: "100%",
              fontSize: "20px!important",
            },
            "& .rmdp-header-values[0]": {
              display: "flex",
              flexDirection: "column",
            },
            "& .rmdp-header-values div": {
              display: "flex!important",
              flexDirection: "row-reverse",
              justifyContent: "start",
              marginBottom: 0.5,
            },
            "& .rmdp-header-values>div>span": {
              fontSize: "12px!important",
            },
            "& .rmdp-header-values>div+span": {
              display: "none",
            },
          }}
        >
          <DatePicker
            containerStyle={{
              width: "100%",
            }}
            value={formik.values.dateJob}
            maxDate={new Date()}
            onChange={(array) => {
              formik.setFieldValue("dateJob", [...array]);
            }}
            range
            numberOfMonths={1}
            render={(value, openCalendar) => {
              return (
                <TextField
                  fullWidth
                  size="small"
                  error={!!formik.errors.dateJob}
                  helperText={
                    formik.errors.dateJob ? formik.errors.dateJob : ""
                  }
                  name="dateJob"
                  InputLabelProps={{ shrink: true }}
                  label="تاریخ اشتغال"
                  value={`از ${value[0] ?? "---"}  الی  ${value[1] ?? "---"}`}
                  onClick={openCalendar}
                  sx={{
                    "& input": {
                      paddingY: "13px",
                    },
                  }}
                />
              );
            }}
            plugins={[
              <RangePickerFooter
                position="top"
                format="DD MMMM YYYY"
                size="small"
                names={{
                  selectedDates: "تاریخ اشتغال",
                  from: "از:",
                  to: "تا:",
                  selectDate: "انتخاب کنید",
                  close: "بستن",
                  separator: "---",
                }}
              />,
            ]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{
              "& textarea": {
                paddingY: "4px",
              },
            }}
            label="توضیحات(اختیاری)"
            name="description"
            id="description"
            value={formik.values.description}
            multiline
            maxRows={5}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "end", gap: 2, marginTop: 2 }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<Close />}
          onClick={() =>
            setProfileStatus((last) => {
              return { ...last, newResume: false };
            })
          }
        >
          انصراف
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          startIcon={<Save />}
        >
          ذخیره
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeForm;
