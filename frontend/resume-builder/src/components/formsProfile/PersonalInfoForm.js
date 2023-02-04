import {
  Close,
  Save,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import {
  Autocomplete,
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
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider, DatePicker, deDE } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { ostans, shahrs } from "../../utils/iran-cities-json";

const khedmat = [
  { id: 1, name: "پایان خدمت" },
  { id: 2, name: "معافیت دائم" },
  { id: 3, name: "معافیت تحصیلی" },
  { id: 4, name: "در حال انجام" },
  { id: 5, name: "مشمول" },
];
const PersonalInfoForm = ({ setProfileStatus }) => {
  const [flag, setFlag] = useState(false);
  const [flagOstan, setFlagOstan] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);

  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};
    if (!/^[0][9][0-9]{9}$/.test(values.mobile)) {
      errors.mobile = `شماره تلفن باید شامل 11 کاراکتر که با 09 شروع شود باشد مثل 09123456789`;
    }
    if (!values.province) {
      errors.province = "استان محل سکونت نباید خالی باشد.";
    }
    if (!values.city) {
      errors.city = "شهر محل سکونت نباید خالی باشد.";
    }
    // if (!values.address) {
    //   errors.city = "آدرس محل سکونت نباید خالی باشد.";
    // }
    if (!values.birthday) {
      errors.birthday = "تاریخ تولد نباید خالی باشد.";
    }
    if (!values.gender) {
      errors.gender = "جنسیت نباید خالی باشد.";
    }
    if (!values.maritalStatus) {
      errors.maritalStatus = "وضعیت تاهل نباید خالی باشد.";
    }
    // if (!values.militarySituation) {
    //   errors.militarySituation = "وضعیت خدمت نباید خالی باشد.";
    // }

    return errors;
  };

  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, personInfoEditStatus: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  const formik = useFormik({
    initialValues: {
      mobile: userData?.profile?.mobile ?? "",
      province: userData?.profile?.province ?? null,
      city: userData?.profile?.city ?? null,
      address: userData?.profile?.address ?? "",
      birthday: userData?.profile?.birthday ?? "",
      gender: userData?.profile?.gender ?? "",
      maritalStatus: userData?.profile?.maritalStatus ?? "",
      militarySituation: userData?.profile?.militarySituation ?? null,
      inputAutocomplete: {
        ostanInput: userData?.profile?.province.name ?? "",
        cityInput: userData?.profile?.city.name ?? "",
        militarySituationInput: userData?.profile?.militarySituation?.name ?? "",
      },
    },
    onSubmit: (values) => {
      setFlag(true);
      dispatch(updateProfile(values));
    },
    validate,
  });
  useEffect(() => {
    if (flagOstan) {
      formik.setFieldValue("city", null);
      setFlagOstan(false);
    }
  }, [flagOstan, formik.values.province]);

  console.log(formik.values);
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
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            آدرس ایمیل:
          </Typography>
          <Typography variant="p" component="span" color={colors.grey[600]}>
            {userData.email}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mobile && formik.touched.mobile}
            helperText={
              formik.errors.mobile && formik.touched.mobile
                ? formik.errors.mobile
                : ""
            }
            name="mobile"
            id="mobile"
            value={formik.values.mobile}
            label="شماره موبایل"
            placeholder="مثلا: 09121234567"
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
            value={formik.values.province}
            inputValue={formik.values.inputAutocomplete.ostanInput}
            id="ostan"
            options={ostans}
            getOptionLabel={(option) => option.name}
            fullWidth
            onChange={(event, value) => {
              setFlagOstan(true);
              formik.setFieldValue("province", value);
            }}
            onInputChange={(event, newInputValue) => {
              console.log(newInputValue);
              formik.setFieldValue(
                "inputAutocomplete.ostanInput",
                newInputValue
              );
            }}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            renderInput={(params) => (
              <TextField
                error={formik.errors.province && formik.touched.province}
                helperText={
                  formik.errors.province && formik.touched.province
                    ? formik.errors.province
                    : ""
                }
                required
                {...params}
                label="استان محل سکونت"
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
        <Grid xs={12} sm={6}>
          <Autocomplete
            id="city"
            noOptionsText={"چیزی یافت نشد"}
            value={formik.values.city}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            inputValue={formik.values.inputAutocomplete.cityInput}
            options={shahrs.filter(
              (option) => option.ostan == formik.values.province?.id ?? 0
            )}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue("city", value);
            }}
            onInputChange={(event, newInputValue) => {
              formik.setFieldValue(
                "inputAutocomplete.cityInput",
                newInputValue
              );
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                error={formik.errors.city && formik.touched.city}
                helperText={
                  formik.errors.city && formik.touched.city
                    ? formik.errors.city
                    : ""
                }
                required
                {...params}
                label=" شهر محل سکونت "
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

        <Grid xs={12} sm={6}>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.address && formik.touched.address}
            helperText={
              formik.errors.address && formik.touched.address
                ? formik.errors.address
                : ""
            }
            name="address"
            id="address"
            value={formik.values.address}
            label="  آدرس محل سکونت "
            placeholder="مثلا: کرج، خیابان فلاح نژاد..."
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              "& input": {
                paddingY: "13px",
              },
            }}
            size="small"
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <LocalizationProvider
            dateAdapter={AdapterJalali}
            dateFormats={{
              monthShort: "MMMM",
            }}
            localeText={{
              cancelButtonLabel: "انصراف",
              okButtonLabel: "تایید",
              todayButtonLabel: "امروز",
            }}
          >
            <DatePicker
              dayOfWeekFormatter={(day) => {
                if (day.includes("ش")) {
                  return `${day}نبه`;
                } else if (day.includes("ج")) {
                  return `${day}معه`;
                }
              }}
              orientation="portrait"
              disableFuture
              components={{
                LeftArrowIcon: KeyboardArrowRight,
                RightArrowIcon: KeyboardArrowLeft,
              }}
              componentsProps={{
                actionBar: {
                  // actions: ["today", "cancel", "accept"],
                },
              }}
              showDaysOutsideCurrentMonth
              openTo="year"
              views={["year", "month", "day"]}
              value={formik.values.birthday}
              onChange={(newValue) =>
                formik.setFieldValue("birthday", newValue)
              }
              label="تاریخ تولد"
              mask="____/__/__"
              PopperProps={{
                placement: "bottom-end" || "top-end",
              }}
              maxDate={Date.now()}
              // toolbarFormat="dd MMMM yyyy"
              // showToolbar
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  {...params}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "روز/ماه/سال",
                  }}
                  error={formik.errors.birthday && formik.touched.birthday}
                  helperText={
                    formik.errors.birthday && formik.touched.birthday
                      ? formik.errors.birthday
                      : ""
                  }
                  sx={{
                    "& input": {
                      paddingY: "13px!important",
                    },
                  }}
                  size="small"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ color: colors.grey[800], fontWeight: 600 }}
              error={formik.errors.gender && formik.touched.gender}
            >
              جنسیت
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="مرد"
                control={<Radio />}
                label="مرد"
                sx={{ color: colors.grey[600] }}
              />

              <FormControlLabel
                value="زن"
                control={<Radio />}
                label="زن"
                sx={{ color: colors.grey[600] }}
              />
            </RadioGroup>
            <FormHelperText error>
              {formik.errors.gender && formik.touched.gender
                ? formik.errors.gender
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ color: colors.grey[800], fontWeight: 600 }}
              error={
                formik.errors.maritalStatus && formik.touched.maritalStatus
              }
            >
              وضعیت تاهل
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="maritalStatus"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="مجرد"
                control={<Radio />}
                label="مجرد"
                sx={{ color: colors.grey[600] }}
              />

              <FormControlLabel
                value="متاهل"
                control={<Radio />}
                label="متاهل"
                sx={{ color: colors.grey[600] }}
              />
            </RadioGroup>
            <FormHelperText error>
              {formik.errors.maritalStatus && formik.touched.maritalStatus
                ? formik.errors.maritalStatus
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6}>
          <Autocomplete
            disablePortal
            value={formik.values.militarySituation}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            inputValue={formik.values.inputAutocomplete.militarySituationInput}
            id="combo-box-demo"
            options={khedmat}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue("militarySituation", value);
            }}
            onInputChange={(event, newInputValue) => {
              formik.setFieldValue(
                "inputAutocomplete.militarySituationInput",
                newInputValue
              );
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                error={
                  formik.errors.militarySituation &&
                  formik.touched.militarySituation
                }
                helperText={
                  formik.errors.militarySituation &&
                  formik.touched.militarySituation
                    ? formik.errors.militarySituation
                    : ""
                }
                required
                {...params}
                label="وضعیت خدمت سربازی"
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
              return { ...last, personInfoEditStatus: false };
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

export default PersonalInfoForm;
