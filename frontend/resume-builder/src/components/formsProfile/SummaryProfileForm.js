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
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";

const SummaryProfileForm = ({ setProfileStatus }) => {
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
  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, summaryEditStatus: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  const formik = useFormik({
    initialValues: {
      fullname: userData?.profile?.fullname ?? "",
      jobTitle: userData?.profile?.jobTitle ?? "",
      employmentStatus: userData?.profile?.employmentStatus ?? "",
    },
    onSubmit: (values) => {
      setFlag(true);
      dispatch(updateProfile(values));
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
          value={formik.values.fullname}
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
          value={formik.values.jobTitle}
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
            value={formik.values.employmentStatus}
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
          {userData?.profile?.resumeSection.length ? (
            <Typography
              variant="p"
              fontWeight={600}
              sx={{ paddingTop: 0.5 }}
              component="div"
              color="secondary"
            >
              {userData?.profile?.resumeSection[0]?.resumeTitle}-
              {userData?.profile?.resumeSection[0]?.companyName}
            </Typography>
          ) : (
            <Button variant="outlined" startIcon={<Add />}>
              اضافه کردن سابقه کار
            </Button>
          )}
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
          {userData?.profile?.resumeSection.length ? (
            <Typography
              variant="p"
              fontWeight={600}
              sx={{ paddingTop: 0.5 }}
              component="div"
              color="secondary"
            >
              {userData?.profile?.educationalSection[0]?.field} -
              {userData?.profile?.educationalSection[0]?.universityName}
            </Typography>
          ) : (
            <Button variant="outlined" startIcon={<Add />}>
              اضافه‌کردن تحصیلات
            </Button>
          )}
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
