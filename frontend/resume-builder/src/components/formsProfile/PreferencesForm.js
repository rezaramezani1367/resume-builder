import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  colors,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Close, Save } from "@mui/icons-material";
import EmptyValue from "../EmptyValue";
import JobBenefitsItem from "../dataProfile/JobBenefitsItem";
import { benefitsItem } from "../dataProfile/PreferencesSection";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";
import { ostans } from "../../utils/iran-cities-json";
import { useFormik } from "formik";
import { pink } from "@mui/material/colors";

const seniorityList = ["تازه کار", "متخصص", "مدیر", "مدیر ارشد"];
const contractList = ["تمام وقت", "پاره وقت", "دورکاری", "کارآموزی"];

const PreferencesForm = ({ setProfileStatus, profileStatus }) => {
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
    if (!values.provinces.length) {
      errors.provinces = "فیلد استان  نباید خالی باشد";
    }
    if (!values.categories.length) {
      errors.categories = "فیلد دسته بندی  نباید خالی باشد";
    }
    if (!values.MinimumSalary) {
      errors.MinimumSalary = "فیلد حقوق درخواستی  نباید خالی باشد";
    }
    if (!values.contractType.length) {
      errors.contractType = "حداقل باید یک آیتم انتخاب شود";
    }
    if (!values.seniorityLevel.length) {
      errors.seniorityLevel = "حداقل باید یک آیتم انتخاب شود";
    }

    return errors;
  };
  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, preferencesEditStatus: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  const formik = useFormik({
    initialValues: {
      jobBenefits: userData?.profile?.preferencesSection?.jobBenefits,
      provinces: userData?.profile?.preferencesSection?.provinces ?? null,
      categories: userData?.profile?.preferencesSection?.categories ?? null,
      MinimumSalary:
        userData?.profile?.preferencesSection?.MinimumSalary ?? null,
      contractType: userData?.profile?.preferencesSection?.contractType ?? [],
      seniorityLevel:
        userData?.profile?.preferencesSection?.seniorityLevel ?? [],
    },
    onSubmit: (values) => {
      setFlag(true);
      dispatch(updateProfile({ preferencesSection: values }));
    },
    validate,
  });
  console.log(formik.values);
  return (
    <Box
      padding={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={4}>
        <Grid xs={12} sm={6}>
          <Autocomplete
            multiple
            id="ostanMultiple"
            size="small"
            options={ostans}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                error={formik.errors.provinces && formik.touched.provinces}
                helperText={
                  formik.errors.provinces && formik.touched.provinces
                    ? formik.errors.provinces
                    : ""
                }
                name="provinces"
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
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={formik.values?.provinces}
            onChange={(event, value) => {
              formik.setFieldValue("provinces", value);
            }}
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
            size="small"
            options={categoryList}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={formik.values?.categories}
            onChange={(event, value) => {
              formik.setFieldValue("categories", value);
            }}
            renderInput={(params) => (
              <TextField
                error={formik.errors.categories && formik.touched.categories}
                helperText={
                  formik.errors.categories && formik.touched.categories
                    ? formik.errors.categories
                    : ""
                }
                name="categories"
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
          <FormControl
            required
            error={
              formik.errors.seniorityLevel && formik.touched.seniorityLevel
            }
          >
            <FormLabel
              component="legend"
              sx={{ color: colors.grey[800], fontWeight: 600 }}
            >
              {" "}
              سطح ارشدیت در زمینه فعالیت:
            </FormLabel>
            <FormGroup
              sx={{
                paddingY: 0.5,
                "& span": {
                  paddingY: 0.25,
                  fontSize: 14,
                  fontWeight: 500,
                },
              }}
            >
              {seniorityList.map((data, index) => {
                return (
                  <FormControlLabel
                    key={`${data}-${index}`}
                    control={
                      <Checkbox
                        size="small"
                        checked={formik.values?.seniorityLevel?.includes(data)}
                        onChange={(event) => {
                          const status = event.target.checked;
                          status
                            ? formik.setFieldValue("seniorityLevel", [
                                ...formik.values?.seniorityLevel,
                                data,
                              ])
                            : formik.setFieldValue(
                                "seniorityLevel",
                                formik.values?.seniorityLevel.filter(
                                  (item) => item != data
                                )
                              );
                        }}
                        sx={{
                          transform: "scaleX(-1)",
                        }}
                        color="success"
                      />
                    }
                    label={data}
                  />
                );
              })}
            </FormGroup>
            {formik.errors.seniorityLevel && formik.touched.seniorityLevel && (
              <FormHelperText error>
                {formik.errors.seniorityLevel}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl
            required
            error={formik.errors.contractType && formik.touched.contractType}
          >
            <FormLabel
              component="legend"
              sx={{ color: colors.grey[800], fontWeight: 600 }}
            >
              {" "}
              نوع قراردادهای قابل قبول:
            </FormLabel>
            <FormGroup
              sx={{
                paddingY: 0.5,
                "& span": {
                  paddingY: 0.25,
                  fontSize: 14,
                  fontWeight: 500,
                },
              }}
            >
              {contractList.map((data, index) => {
                return (
                  <FormControlLabel
                    key={`${data}-${index}`}
                    control={
                      <Checkbox
                        size="small"
                        checked={formik.values?.contractType?.includes(data)}
                        onChange={(event) => {
                          const status = event.target.checked;
                          status
                            ? formik.setFieldValue("contractType", [
                                ...formik.values?.contractType,
                                data,
                              ])
                            : formik.setFieldValue(
                                "contractType",
                                formik.values?.contractType.filter(
                                  (item) => item != data
                                )
                              );
                        }}
                        sx={{
                          transform: "scaleX(-1)",
                        }}
                        color="success"
                      />
                    }
                    label={data}
                  />
                );
              })}
            </FormGroup>
            {formik.errors.contractType && formik.touched.contractType && (
              <FormHelperText error>
                {formik.errors.contractType}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <Autocomplete
            size="small"
            options={salaryList}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={formik.values?.MinimumSalary}
            onChange={(event, value) => {
              formik.setFieldValue("MinimumSalary", value);
            }}
            renderInput={(params) => (
              <TextField
                error={
                  formik.errors.MinimumSalary && formik.touched.MinimumSalary
                }
                helperText={
                  formik.errors.MinimumSalary && formik.touched.MinimumSalary
                    ? formik.errors.MinimumSalary
                    : ""
                }
                name="MinimumSalary"
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
                active={formik.values.jobBenefits[item.nameEN]}
                handleStatus={() => {
                  formik.setFieldValue("jobBenefits", {
                    ...formik.values.jobBenefits,
                    [item.nameEN]: !formik.values.jobBenefits[item.nameEN],
                  });
                }}
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
