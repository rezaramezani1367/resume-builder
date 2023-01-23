import { Grading, Add, Save, Close } from "@mui/icons-material";
import {
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
import React from "react";

const SummaryProfileForm = ({ setProfileStatus }) => {
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
        // onSubmit={formik.handleSubmit}
      >
        <TextField
          size="small"
          id="outlined-basic"
          label="نام و نام خانوادگی"
          variant="outlined"
          sx={{ width: { sm: "100%", md: "50%" } }}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="عنوان شغلی"
          variant="outlined"
          sx={{ width: { sm: "100%", md: "50%" }, fontSize: 12 }}
        />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            وضعیت اشتغال
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
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
          <Button variant="contained" color="success" startIcon={<Save />}>
            ذخیره
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SummaryProfileForm;
