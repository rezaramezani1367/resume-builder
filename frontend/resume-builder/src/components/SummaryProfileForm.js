import { Grading } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";

const SummaryProfileForm = ({ setProfileStatus }) => {
  return (
    <Box>
      <div>SummaryProfileForm</div>
      <Button
        variant="outlined"
        startIcon={<Grading />}
        onClick={() =>
          setProfileStatus((last) => {
            return { ...last, summaryEditStatus: false };
          })
        }
      >
       انصراف
      </Button>
    </Box>
  );
};

export default SummaryProfileForm;
