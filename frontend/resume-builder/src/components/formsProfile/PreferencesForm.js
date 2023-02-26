import {
  Autocomplete,
  Box,
  Button,
  Chip,
  colors,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Close, Save } from "@mui/icons-material";
import EmptyValue from "../EmptyValue";
import JobBenefitsItem from "../dataProfile/JobBenefitsItem";
import { benefitsItem } from "../dataProfile/PreferencesSection";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";
import { ostans } from "../../utils/iran-cities-json";

const PreferencesForm = ({ setProfileStatus, profileStatus }) => {
  const [flag, setFlag] = useState(false);
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);

  const dispatch = useDispatch();
  return (
    <Box
      padding={2}
      component="form"
      noValidate
      autoComplete="off"
      //   onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <Autocomplete
            multiple
            id="ostanMultiple"
            size="small"
            options={ostans}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="استان‌های مورد نظر برای کار"
                placeholder="انتخاب کنید"
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& input": {
                    paddingY: "7px!important",
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Autocomplete
            multiple
            id="ostanMultiple"
            size="small"
            options={categoryList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="دسته‌بندی شغلی و زمینه‌کاری"
                placeholder="انتخاب کنید"
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& input": {
                    paddingY: "7px!important",
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            سطح ارشدیت در زمینه فعالیت:
          </Typography>
          {userData.profile?.preferencesSection?.seniorityLevel?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.seniorityLevel.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data}-${index}`}
                      label={data}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            نوع قراردادهای قابل قبول:
          </Typography>
          {userData.profile?.preferencesSection?.contractType?.length ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingY: 0.5,
                gap: 1,
              }}
            >
              {userData.profile?.preferencesSection?.contractType.map(
                (data, index) => {
                  return (
                    <Chip
                      key={`${data}-${index}`}
                      label={data}
                      variant="outlined"
                      size="small"
                    />
                  );
                }
              )}
            </Box>
          ) : (
            <EmptyValue />
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <Autocomplete
            size="small"
            options={salaryList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label=" حداقل حقوق درخواستی"
                placeholder="انتخاب کنید"
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& input": {
                    paddingY: "7px!important",
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Typography
            variant="subtitle1"
            component="div"
            color={colors.grey[800]}
            fontWeight={600}
          >
            مزایای شغلی مورد نظر:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              paddingY: 1,
              gap: 1,
            }}
          >
            {benefitsItem.map((item, index) => (
              <JobBenefitsItem
                editBenefitsItem={profileStatus.preferencesEditStatus}
                key={item.name}
                item={item}
                active={
                  userData?.profile?.preferencesSection?.jobBenefits[
                    item.nameEN
                  ]
                }
              />
            ))}
          </Box>
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
              return { ...last, preferencesEditStatus: false };
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

export default PreferencesForm;

const categoryList = [
  { name: "وب،‌ برنامه‌نویسی و نرم‌افزار" },
  { name: "IT / DevOps / Server" },
  { name: "آموزش" },
  { name: "انبارداری" },
  { name: "پزشکی،‌ پرستاری و دارویی" },
  { name: "پشتیبانی و امور مشتریان" },
  { name: "تحقیق بازار و تحلیل اقتصادی" },
  { name: "تربیت بدنی" },
  { name: "ترجمه" },
  { name: "تکنسین فنی، تعمیرکار" },
  { name: "تولید و مدیریت محتوا" },
  { name: "حمل و نقل" },
  { name: "حوزه‌ سینما و تصویر" },
  { name: "حوزه‌ موسیقی و صدا" },
  { name: "خبر‌نگاری" },
  { name: "خرید و بازرگانی" },
  { name: "دیجیتال مارکتینگ" },
  { name: "راننده، پیک موتوری" },
  { name: "روابط عمومی" },
  { name: "شیمی، داروسازی" },
  { name: "صنایع غذایی" },
  { name: "طراحی" },
  { name: "علوم زیستی و آزمایشگاهی" },
  { name: "فروش و بازاریابی" },
  { name: "کارشناس حقوقی،‌ وکالت" },
  { name: "کارگر ساده، نیروی خدماتی" },
  { name: "کارگر ماهر، کارگر صنعتی" },
  { name: "گردشگری" },
  { name: "مالی و حسابداری" },
  { name: "مدیر محصول" },
  { name: "مدیریت بیمه" },
  { name: "مسئول دفتر، اجرائی و اداری" },
  { name: "منابع انسانی و کارگزینی" },
  { name: "مهندسی پزشکی" },
  { name: "مهندسی پلیمر" },
  { name: "مهندسی شیمی و نفت" },
  { name: "مهندسی صنایع و مدیریت صنعتی" },
  { name: "مهندسی عمران و معماری" },
  { name: "مهندسی کشاورزی" },
  { name: "مهندسی معدن و متالورژی" },
  { name: "مهندسی مکانیک و هوافضا" },
  { name: "مهندسی نساجی، طراحی پارچه و لباس" },
  { name: "نگهبان" },
  { name: "هتلداری" },
  { name: "CEO" },
  { name: "HSE" },
  { name: "تحقیق و توسعه" },
  { name: "مهندسی برق و الکترونیک" },
];

const salaryList = [
  { name: "توافقی" },
  { name: "حقوق پایه (وزارت کار)" },
  { name: "از ۴,۵۰۰,۰۰۰ تومان" },
  { name: "از ۵,۰۰۰,۰۰۰ تومان" },
  { name: "از ۵,۵۰۰,۰۰۰ تومان" },
  { name: "از ۶,۰۰۰,۰۰۰ تومان" },
  { name: "از ۶,۵۰۰,۰۰۰ تومان" },
  { name: "از ۷,۰۰۰,۰۰۰ تومان" },
  { name: "از ۸,۰۰۰,۰۰۰ تومان" },
  { name: "از ۹,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۰,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۱,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۲,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۳,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۴,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۵,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۶,۰۰۰,۰۰۰ تومان" },
  { name: "از ۱۸,۰۰۰,۰۰۰ تومان" },
  { name: "از ۲۰,۰۰۰,۰۰۰ تومان" },
  { name: "از ۲۲,۰۰۰,۰۰۰ تومان" },
  { name: "از ۲۴,۰۰۰,۰۰۰ تومان" },
  { name: "از ۲۶,۰۰۰,۰۰۰ تومان" },
  { name: "از ۲۸,۰۰۰,۰۰۰ تومان" },
  { name: "از ۳۰,۰۰۰,۰۰۰ تومان" },
  { name: "از ۳۵,۰۰۰,۰۰۰ تومان" },
  { name: "از ۴۰,۰۰۰,۰۰۰ تومان" },
  { name: "از ۴۵,۰۰۰,۰۰۰ تومان" },
  { name: "از ۵۰,۰۰۰,۰۰۰ تومان" },
];
