import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete, Remove, Save } from "@mui/icons-material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import RangePickerFooter from "react-multi-date-picker/plugins/range_picker_footer";
import AlertDialog from "../AlertDialog";

const gradeName = [
  { id: 1, name: "دیپلم" },
  { id: 2, name: "کاردانی" },
  { id: 3, name: "کارشناسی" },
  { id: 4, name: "کارشناسی ارشد" },
  { id: 5, name: "دکتراو بالاتر" },
  { id: 5, name: "دیگر" },
];
const EducationalForm = ({ setProfileStatus, index }) => {
  const [flag, setFlag] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);

  const dispatch = useDispatch();

  const validate = (values) => {
    let errors = {};

    if (!values.field) {
      errors.field = "  رشته تحصیلی نباید خالی باشد.";
    }
    if (!values.universityName) {
      errors.universityName = "نام دانشگاه نباید خالی باشد.";
    }
    if (!values.date.length) {
      errors.date = " تاریخ شروع نباید خالی باشد.";
    }
    if (!values.grade) {
      errors.grade = " مقطع تحصیلی نباید خالی باشد.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      field:
        index >= 0 ? userData.profile?.educationalSection[index].field : "",
      universityName:
        index >= 0
          ? userData.profile?.educationalSection[index].universityName
          : "",
      grade:
        index >= 0 ? userData.profile?.educationalSection[index].grade : null,
      description:
        index >= 0
          ? userData.profile?.educationalSection[index].description
          : "",
      date: index >= 0 ? userData.profile?.educationalSection[index].date : [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFlag(true);
      if (index >= 0) {
        const help = [...userData.profile?.educationalSection];
        help[index] = values;
        dispatch(
          updateProfile({
            educationalSection: [...help],
          })
        );
      } else {
        dispatch(
          updateProfile({
            educationalSection: [
              ...userData.profile?.educationalSection,
              values,
            ],
          })
        );
      }
    },
    validate,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (flag && !userLoading && isSuccess && !isDeleted) {
      // save edit item
      if (index >= 0) {
        setProfileStatus((last) => {
          const help = [...last.editEducational];
          help[index] = false;

          return { ...last, editEducational: [...help] };
        });
      } else {
        // save new item
        setProfileStatus((last) => {
          return {
            ...last,
            newEducational: false,
            editEducational: [...last.editEducational, false],
          };
        });
      }
      setFlag(false);
      setIsDeleted(false);
    }
  }, [userLoading, isSuccess, flag]);

  // console.log({ userLoading, isSuccess, flag, isDeleted, index });
  // console.log({ education: formik.values });

  return (
    <Box
      padding={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      borderBottom={1}
      borderColor="divider"
    >
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <TextField
            autoFocus
            onChange={formik.handleChange}
            error={formik.errors.field && formik.touched.field}
            helperText={
              formik.errors.field && formik.touched.field
                ? formik.errors.field
                : ""
            }
            name="field"
            id="field"
            value={formik.values.field}
            label="رشته تحصیلی"
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
            error={
              formik.errors.universityName && formik.touched.universityName
            }
            helperText={
              formik.errors.universityName && formik.touched.universityName
                ? formik.errors.universityName
                : ""
            }
            name="universityName"
            id="universityName"
            value={formik.values.universityName}
            label="نام دانشگاه/موسسه"
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
          <Autocomplete
            disablePortal
            value={formik.values.grade}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id="combo-box-demo111"
            options={gradeName}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue("grade", value);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                error={formik.errors.grade && formik.touched.grade}
                helperText={
                  formik.errors.grade && formik.touched.grade
                    ? formik.errors.grade
                    : ""
                }
                required
                {...params}
                label="مقطع تحصیلی"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& input": {
                    paddingY: "7px!important",
                  },
                }}
                size="small"
              />
            )}
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
            value={formik.values.date}
            maxDate={new Date()}
            onChange={(array) => {
              formik.setFieldValue("date", [...array]);
            }}
            range
            numberOfMonths={1}
            render={(value, openCalendar) => {
              return (
                <TextField
                  fullWidth
                  size="small"
                  error={!!formik.errors.date && !!formik.touched.date}
                  helperText={
                    formik.errors.date && formik.touched.date
                      ? formik.errors.date
                      : ""
                  }
                  name="date"
                  required
                  InputLabelProps={{ shrink: true }}
                  label="تاریخ شروع و پایان تحصیل"
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
                  selectedDates: "تاریخ شروع و پایان تحصیل",
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
        {index >= 0 && (
          <AlertDialog
            buttonPrpos={{
              name: "حذف",
              variant: "outlined",
              color: "error",
              size: "small",
              startIcon: <Delete />,
            }}
            title="آیا از حذف سابقه تحصیلی مورد نظر مطمئن هستید"
            description={`${userData.profile?.educationalSection[index]?.field} - 
            ${userData.profile?.educationalSection[index]?.universityName}
            `}
            handleSave={() => {
              const resumeList = [...userData.profile?.educationalSection];
              resumeList.splice(index, 1);
              setIsDeleted(true);
              setFlag(true);
              dispatch(updateProfile({ educationalSection: [...resumeList] }));
              setProfileStatus((last) => {
                const help = [...last.editEducational];
                // delete item
                help.splice(index, 1);

                return { ...last, editEducational: [...help] };
              });
            }}
          />
        )}
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<Close />}
          onClick={() => {
            if (index >= 0) {
              setProfileStatus((last) => {
                const help = [...last.editEducational];
                help[index] = false;
                return { ...last, editEducational: [...help] };
              });
            } else {
              setProfileStatus((last) => {
                return {
                  ...last,
                  newEducational: false,
                  editEducational: [...last.editEducational, false],
                };
              });
            }
          }}
        >
          انصراف
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="small"
          startIcon={<Save />}
        >
          ذخیره
        </Button>
      </Box>
    </Box>
  );
};

export default memo(EducationalForm);
