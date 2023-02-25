import {
  Autocomplete,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete, Remove, Save } from "@mui/icons-material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import AlertDialog from "../AlertDialog";

const languageName = [
  { id: 18, name: "آذری" },
  { id: 6, name: "آلمانی" },
  { id: 13, name: "ارمنی" },
  { id: 5, name: "اسپانیایی" },
  { id: 2, name: "انگلیسی" },
  { id: 7, name: "ایتالیایی" },
  { id: 17, name: "ترکی استانبولی" },
  { id: 10, name: "چینی" },
  { id: 8, name: "روسی" },
  { id: 9, name: "ژاپنی" },
  { id: 16, name: "سوئدی" },
  { id: 3, name: "عربی" },
  { id: 1, name: "فارسی" },
  { id: 4, name: "فرانسوی" },
  { id: 15, name: "فنلاندی" },
  { id: 19, name: "کردی" },
  { id: 11, name: "کره‌ای (هانگول)" },
  { id: 12, name: "هلندی" },
  { id: 14, name: "هندی" },
];
const levelName = [
  { id: 1, name: "مبتدی" },
  { id: 2, name: "کار راه انداز" },
  { id: 3, name: "توانمند برای کار" },
  { id: 4, name: "حرفه‌ای" },
  { id: 5, name: "زبان مادری" },
];
const LanguageForm = ({ setProfileStatus, index }) => {
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

    if (!values.languageName) {
      errors.languageName = " نام زبان نباید خالی باشد.";
    }
    if (!values.languageLevel) {
      errors.languageLevel = " سطح تسلط نباید خالی باشد.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      languageLevel:
        index >= 0
          ? userData.profile?.languageSection[index].languageLevel
          : null,
      languageName:
        index >= 0
          ? userData.profile?.languageSection[index].languageName
          : null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFlag(true);
      if (index >= 0) {
        const help = [...userData.profile?.languageSection];
        help[index] = values;
        dispatch(
          updateProfile({
            languageSection: [...help],
          })
        );
      } else {
        dispatch(
          updateProfile({
            languageSection: [...userData.profile?.languageSection, values],
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
          const help = [...last.editLanguage];
          help[index] = false;

          return { ...last, editLanguage: [...help] };
        });
      } else {
        // save new item
        setProfileStatus((last) => {
          return {
            ...last,
            newLanguage: false,
            editLanguage: [...last.editLanguage, false],
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
          <Autocomplete
            disablePortal
            value={formik.values.languageName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id="combo-box-demo1131"
            options={languageName}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue("languageName", value);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                error={
                  formik.errors.languageName && formik.touched.languageName
                }
                helperText={
                  formik.errors.languageName && formik.touched.languageName
                    ? formik.errors.languageName
                    : ""
                }
                required
                {...params}
                label="نام زبان"
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
            value={formik.values.languageLevel}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id="combo-box-demo1131"
            options={levelName}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue("languageLevel", value);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                error={
                  formik.errors.languageLevel && formik.touched.languageLevel
                }
                helperText={
                  formik.errors.languageLevel && formik.touched.languageLevel
                    ? formik.errors.languageLevel
                    : ""
                }
                required
                {...params}
                label="سطح تسلط"
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
        {index >= 0 && (
          <AlertDialog
            buttonPrpos={{
              name: "حذف",
              variant: "outlined",
              color: "error",
              size: "small",
              startIcon: <Delete />,
            }}
            title="آیا از حذف زبان مورد نظر مطمئن هستید"
            description={`${userData.profile?.languageSection[index]?.languageName.name} 
              `}
            handleSave={() => {
              const resumeList = [...userData.profile?.languageSection];
              resumeList.splice(index, 1);
              setIsDeleted(true);
              setFlag(true);
              dispatch(updateProfile({ languageSection: [...resumeList] }));
              setProfileStatus((last) => {
                const help = [...last.editLanguage];
                // delete item
                help.splice(index, 1);

                return { ...last, editLanguage: [...help] };
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
                const help = [...last.editLanguage];
                help[index] = false;
                return { ...last, editLanguage: [...help] };
              });
            } else {
              setProfileStatus((last) => {
                return {
                  ...last,
                  newLanguage: false,
                  editLanguage: [...last.editLanguage, false],
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

export default memo(LanguageForm);
