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
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider, DatePicker, deDE } from "@mui/x-date-pickers";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { ostans, shahrs } from "../../utils/iran-cities-json";

const khedmat = [
  { id: 1, name: "پایان خدمت" },
  { id: 2, name: "معافیت دائم" },
  { id: 3, name: "معافیت تحصیلی" },
  { id: 4, name: "در حال انجام" },
  { id: 5, name: "مشمول" },
];
const PersonalInfoForm = ({ setProfileStatus,userData }) => {
  const [province, setprovince] = useState({
    value: null,
    inputValue: "",
  });
  const [birthDay, setBirthDay] = React.useState(null);
  console.log(province);
  console.log(birthDay);
  return (
    <Box padding={2} component="form" noValidate autoComplete="off">
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
            value={userData.mobile}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Autocomplete
            value={province.value}
            inputValue={province.inputValue}
            id="combo-box-demo"
            options={ostans}
            getOptionLabel={(option) => option.name}
            fullWidth
            onChange={(event, value) => {
              setprovince((last) => {
                return { ...last, value };
              });
            }}
            onInputChange={(event, inputValue) => {
              setprovince((last) => {
                return { ...last, inputValue };
              });
            }}
            renderInput={(params) => (
              <TextField
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
            disablePortal
            id="combo-box-demo"
            noOptionsText={"چیزی یافت نشد"}
            options={shahrs.filter(
              (option) => option.ostan == province.value?.id ?? 0
            )}
            getOptionLabel={(option) => {
              return option.name;
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
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
              value={birthDay}
              onChange={(newValue) => setBirthDay(newValue)}
              label="تاریخ تولد"
              mask="____/__/__"
              PopperProps={{
                placement: "bottom-end" || "top-end",
              }}
              maxDate={Date.now()}
              // toolbarFormat="dd MMMM yyyy"
              showToolbar
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  {...params}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "روز/ماه/سال",
                  }}
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
            >
              جنسیت
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
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
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ color: colors.grey[800], fontWeight: 600 }}
            >
              وضعیت تاهل
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
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
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={khedmat}
            getOptionLabel={(option) => {
              return option.name;
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
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
        <Button variant="contained" color="success" startIcon={<Save />}>
          ذخیره
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;
