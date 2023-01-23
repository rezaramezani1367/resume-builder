import {
  Avatar,
  Box,
  Button,
  colors,
  Divider,
  Typography,
} from "@mui/material";
import { PersonAddAlt, ModeEdit, Person, Person2 } from "@mui/icons-material";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Summayprofile from "./dataProfile/Summayprofile";
import PersonInfoPrfile from "./dataProfile/PersonInfoPrfile";
import SummaryProfileForm from "./formsProfile/SummaryProfileForm";
import PersonalInfoForm from "./formsProfile/PersonalInfoForm";
import AboutMe from "./dataProfile/AboutMe";
import AboutMeForm from "./formsProfile/AboutMeForm";

const Profile = () => {
  const [profileStatus, setProfileStatus] = useState({
    summaryEditStatus: false,
    personInfoEditStatus: false,
    aboutMeEditStatus: false,
  });
  return (
    <Box>
      {/* section 1 include image && Summary  info */}

      <Grid container sx={{ border: 1, borderColor: "divider" }}>
        <Grid
          xs={12}
          md={3}
          sx={{
            borderRight: { xs: 0, md: 1 },
            borderBottom: { xs: 1, md: 0 },
            borderColor: { xs: "divider", md: "divider" },
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ width: 75, height: 75 }} />
          <Button variant="outlined" startIcon={<PersonAddAlt />} size="small">
            آپلود عکس
          </Button>
        </Grid>
        {profileStatus.summaryEditStatus ? (
          <SummaryProfileForm setProfileStatus={setProfileStatus} />
        ) : (
          <Summayprofile setProfileStatus={setProfileStatus} />
        )}
      </Grid>

      {/* section 2 includes personal information */}
      <Box border={1} borderColor="divider" marginTop={2}>
        <Box
          bgcolor={colors.grey[200]}
          color={colors.grey[700]}
          sx={{ display: "flex", gap: 1 }}
          padding={1.5}
        >
          <Person />
          <Typography variant="h6">اطلاعات فردی</Typography>
        </Box>
        <Divider />
        {profileStatus.personInfoEditStatus ? (
          <PersonalInfoForm setProfileStatus={setProfileStatus} />
        ) : (
          <PersonInfoPrfile setProfileStatus={setProfileStatus} />
        )}
      </Box>
      <Box border={1} borderColor="divider" marginTop={2}>
        <Box
          bgcolor={colors.grey[200]}
          color={colors.grey[700]}
          sx={{ display: "flex", gap: 1 }}
          padding={1.5}
        >
          <Person2 />
          <Typography variant="h6"> درباره‌ی من</Typography>
        </Box>
        <Divider />
        {profileStatus.aboutMeEditStatus ? (
          <AboutMeForm setProfileStatus={setProfileStatus} />
        ) : (
          <AboutMe setProfileStatus={setProfileStatus} />
        )}
      </Box>
    </Box>
  );
};

export default Profile;
