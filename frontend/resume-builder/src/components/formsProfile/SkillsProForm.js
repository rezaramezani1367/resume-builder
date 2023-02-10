import { Add, Close, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputBase,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateProfile } from "../../redux/actionUser";
import { useDispatch, useSelector } from "react-redux";
import EmptyValue from "../EmptyValue";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const SkillsProForm = ({ setProfileStatus }) => {
  const [flag, setFlag] = useState(false);
  const [skillValue, setSkillValue] = useState("");
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
    },
  } = useSelector((last) => last);

  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};
    return errors;
  };
  useEffect(() => {
    if (flag && !userLoading && isSuccess) {
      setProfileStatus((last) => {
        return { ...last, skillProEditStatus: false };
      });
      setFlag(false);
    }
  }, [userLoading, isSuccess, flag]);

  const formik = useFormik({
    initialValues: {
      skills: userData?.profile?.skills ?? [],
    },
    onSubmit: (values) => {
      setFlag(true);
      const variables = { ...values, skills: [...new Set(values.skills)] };
      dispatch(updateProfile(variables));
    },
    validate,
  });

  const addSkillTolist = () => {
    if (skillValue)
      formik.setFieldValue("skills", [...formik.values.skills, skillValue]);
    setSkillValue("");
  };
  console.log(formik.values.skills);
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
      {formik.values?.skills ? (
        <Box
          component="ul"
          sx={{
            display: "flex",
            // justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
        >
          {formik.values?.skills?.map((data, index) => {
            return (
              <ListItem key={`${data}-${index}`}>
                <Chip
                  label={data}
                  variant="outlined"
                  color="primary"
                  onDelete={() => {
                    formik.setFieldValue(
                      "skills",
                      formik.values.skills.filter((item, ind) => ind != index)
                    );
                  }}
                />
              </ListItem>
            );
          })}
        </Box>
      ) : (
        <EmptyValue />
      )}
      <Box
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 400 },
          border: 1,
          borderColor: "divider",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="ثبت مهارت جدید"
          onChange={(e) => setSkillValue(e.target.value)}
          value={skillValue}
          onKeyPress={(e) => {
            if (e.which === 13) {
              e.preventDefault();
              addSkillTolist();
            }
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="secondary"
          sx={{ borderRadius: 0 }}
          onClick={addSkillTolist}
        >
          <Add />
        </IconButton>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", gap: 2, marginTop: 2 }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<Close />}
          onClick={() =>
            setProfileStatus((last) => {
              return { ...last, skillProEditStatus: false };
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

export default SkillsProForm;
