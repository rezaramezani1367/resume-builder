import { ModeEdit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import EmptyValue from "../EmptyValue";

const AboutMe = ({ setProfileStatus, userData }) => {
  return (
    <Box
      padding={3}
      position="relative"
      sx={{
        paddingTop: { xs: 5, md: 3 },
        cursor: "pointer",
        "&:hover": {
          "#edit3": {
            display: "block",
          },
          "#about-me-content": {
            paddingTop: { xs: 0, md: 2 },
          },
        },
      }}
    >
      <Box
        id="edit3"
        position="absolute"
        top={2}
        right={10}
        sx={{ display: { xs: "block", md: "none" } }}
        onClick={() =>
          setProfileStatus((last) => {
            return { ...last, aboutMeEditStatus: true };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      <Typography component="div" id="about-me-content">
        {userData?.profile?.aboutMe ?? <EmptyValue />}
      </Typography>
    </Box>
  );
};

export default AboutMe;
