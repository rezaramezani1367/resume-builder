import { Close, Save } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";

const AboutMeForm = ({ setProfileStatus }) => {
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
    const lengthWord = values.aboutMe.split(" ").length;
    if (lengthWord < 10) {
      errors.aboutMe = "فیلد درباره من ، باید حداقل شامل 10 کلمه  باشد";
    }
    if (lengthWord > 200) {
      errors.aboutMe = "فیلد درباره من ، باید حداکثر 200 کلمه باشد";
    }

    return errors;
  };
  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, aboutMeEditStatus: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  const formik = useFormik({
    initialValues: {
      aboutMe: userData?.profile?.aboutMe ?? "",
    },
    onSubmit: (values) => {
      setFlag(true);
      dispatch(updateProfile(values));
    },
    validate,
  });
  return (
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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.aboutMe && formik.touched.aboutMe}
        helperText={
          formik.errors.aboutMe && formik.touched.aboutMe
            ? formik.errors.aboutMe
            : ""
        }
        name="aboutMe"
        id="aboutMe"
        value={formik.values.aboutMe}
        multiline
        rows={4}
        fullWidth
      />
      <Box
        sx={{ display: "flex", justifyContent: "end", gap: 2, marginTop: 2 }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<Close />}
          onClick={() =>
            setProfileStatus((last) => {
              return { ...last, aboutMeEditStatus: false };
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

export default AboutMeForm;
