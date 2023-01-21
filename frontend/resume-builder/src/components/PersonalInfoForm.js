import { Grading } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";

const PersonalInfoForm = ({setProfileStatus}) => {
  return (
    <Box>
      <div>PersonalInfoForm</div>
      <Button
        variant="outlined"
        startIcon={<Grading />}
        onClick={() =>
          setProfileStatus((last) => {
            return { ...last, personInfoEditStatus: false };
          })
        }
      >
        انصراف
      </Button>
    </Box>
  );
};

export default PersonalInfoForm;
