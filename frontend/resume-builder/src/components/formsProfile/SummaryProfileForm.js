import { Add, Save, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  colors,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { storeSummaryProfile } from "../../redux/actionUser";
import { useDispatch } from "react-redux";

const SummaryProfileForm = ({ setProfileStatus, userData }) => {
  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};
    if (values.fullname.length < 5) {
      errors.fullname = "نام و نام خانوادگی حداقل باید شامل 5 کاراکتر باشد";
    }
    if (values.jobTitle.length < 2) {
      errors.jobTitle = "عنوان شغلی حداقل باید شامل 2 کاراکتر باشد";
    }
    if (!values.employmentStatus) {
      errors.employmentStatus = " وضعیت اشتغال نباید خالی باشد";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      jobTitle: "",
      employmentStatus: "",
    },
    onSubmit: (values) => {
      console.log(values);

      dispatch(storeSummaryProfile(values));
    },
    validate,
  });
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        padding={2}
        display="flex"
        flexDirection="column"
        flexGrow={1}
        gap={3}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          size="small"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.fullname && formik.touched.fullname}
          helperText={
            formik.errors.fullname && formik.touched.fullname
              ? formik.errors.fullname
              : ""
          }
          name="fullname"
          id="fullname"
          label="نام و نام خانوادگی"
          variant="outlined"
          sx={{ width: { sm: "100%", md: "50%" } }}
        />
        <TextField
          size="small"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.jobTitle && formik.touched.jobTitle}
          helperText={
            formik.errors.jobTitle && formik.touched.jobTitle
              ? formik.errors.jobTitle
              : ""
          }
          name="jobTitle"
          id="jobTitle"
          label="عنوان شغلی"
          variant="outlined"
          sx={{ width: { sm: "100%", md: "50%" }, fontSize: 12 }}
        />
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            error={
              formik.errors.employmentStatus && formik.touched.employmentStatus
            }
          >
            وضعیت اشتغال
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="employmentStatus"
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="جویای‌کار"
              control={<Radio />}
              label="جویای‌کار"
            />
            <FormControlLabel
              value=" به دنبال شغل بهتر"
              control={<Radio />}
              label=" به دنبال شغل بهتر"
            />
            <FormControlLabel value="شاغل" control={<Radio />} label="شاغل" />
          </RadioGroup>
          <FormHelperText error>
            {formik.errors.employmentStatus && formik.touched.employmentStatus
              ? formik.errors.employmentStatus
              : ""}
          </FormHelperText>
        </FormControl>
        <Box>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[600]}
            fontWeight={500}
          >
            آخرین شرکت:
          </Typography>
          <Button variant="outlined" startIcon={<Add />}>
            اضافه کردن سابقه کار
          </Button>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[600]}
            fontWeight={500}
          >
            آخرین مدرک تحصیلی:
          </Typography>
          <Button variant="outlined" startIcon={<Add />}>
            اضافه‌کردن تحصیلات
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Close />}
            onClick={() =>
              setProfileStatus((last) => {
                return { ...last, summaryEditStatus: false };
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
    </>
  );
};

export default SummaryProfileForm;
