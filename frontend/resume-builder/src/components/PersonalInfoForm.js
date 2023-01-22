import { Close, Save, ModeEdit } from "@mui/icons-material";
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
import Grid from "@mui/material/Unstable_Grid2";

const PersonalInfoForm = ({ setProfileStatus }) => {
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
            reza30361@gmail.com
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
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            label="استان محل سکونت"
            placeholder="مثلا: تهران، قزوین یا ..."
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
            label="  آدرس محل سکونت (اختیاری):"
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
          <TextField
            label="سال تولد"
            placeholder="مثلا: ۱۳۷۲"
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
          <TextField
            label="وضعیت خدمت سربازی"
            placeholder="مثلا: انجام شده"
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
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2,marginTop:2 }}>
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
