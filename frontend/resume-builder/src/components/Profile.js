import {
  Avatar,
  Box,
  Button,
  colors,
  Divider,
  Typography,
} from "@mui/material";
import { Add, HowToReg, Person, Person2, Work } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Summayprofile from "./dataProfile/Summayprofile";
import PersonInfoPrfile from "./dataProfile/PersonInfoPrfile";
import SummaryProfileForm from "./formsProfile/SummaryProfileForm";
import PersonalInfoForm from "./formsProfile/PersonalInfoForm";
import AboutMe from "./dataProfile/AboutMe";
import AboutMeForm from "./formsProfile/AboutMeForm";
import ImageUploadForm from "./formsProfile/ImageUploadForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTest } from "../redux/actionUser";
import LoadingDialog from "./LoadingDialog";
import SkillsProForm from "./formsProfile/SkillsProForm";
import ResumeForm from "./formsProfile/ResumeForm";
import SkillsPro from "./dataProfile/SkillsPro";
import ResumeSection from "./dataProfile/ResumeSection";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: {
      userLoading,
      userData: { isSuccess, userData },
      userError,
    },
  } = useSelector((last) => last);
  const [profileStatus, setProfileStatus] = useState({
    summaryEditStatus: false,
    personInfoEditStatus: false,
    aboutMeEditStatus: false,
    skillProEditStatus: false,
    newResume: false,
    editResume: [],
  });

  useEffect(() => {
    dispatch(getUserTest());
  }, []);
  useEffect(() => {
    if (!profileStatus.editResume.length)
      userData.profile?.resumeSection.forEach((item) =>
        setProfileStatus((last) => {
          return { ...last, editResume: [...last.editResume, false] };
        })
      );
  }, [userData.profile?.resumeSection]);

  console.log(profileStatus.editResume);

  return (
    <Box>
      {/* section 1 include image && Summary  info */}
      <LoadingDialog userLoading={userLoading} />
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
          <ImageUploadForm userData={userData} />
        </Grid>
        {profileStatus.summaryEditStatus ? (
          <SummaryProfileForm setProfileStatus={setProfileStatus} />
        ) : (
          <Summayprofile
            setProfileStatus={setProfileStatus}
            userData={userData}
          />
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
          <PersonalInfoForm
            setProfileStatus={setProfileStatus}
            userData={userData}
          />
        ) : (
          <PersonInfoPrfile
            setProfileStatus={setProfileStatus}
            userData={userData}
          />
        )}
      </Box>
      {/* about section */}
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
          <AboutMe setProfileStatus={setProfileStatus} userData={userData} />
        )}
      </Box>
      {/* skill section */}
      <Box border={1} borderColor="divider" marginTop={2}>
        <Box
          bgcolor={colors.grey[200]}
          color={colors.grey[700]}
          sx={{ display: "flex", gap: 1 }}
          padding={1.5}
        >
          <HowToReg />
          <Typography variant="h6"> مهارت های حرفه ای </Typography>
        </Box>
        <Divider />
        {profileStatus.skillProEditStatus ? (
          <SkillsProForm setProfileStatus={setProfileStatus} />
        ) : (
          <SkillsPro setProfileStatus={setProfileStatus} userData={userData} />
        )}
      </Box>
      {/* resume section */}
      <Box border={1} borderColor="divider" marginTop={2}>
        <Box
          bgcolor={colors.grey[200]}
          color={colors.grey[700]}
          sx={{ display: "flex", gap: 1 }}
          padding={1.5}
        >
          <Work />
          <Typography variant="h6"> سوابق شغلی</Typography>
        </Box>
        <Divider />
        {userData?.profile?.resumeSection.map((item, index) =>
          profileStatus.editResume[index] ? (
            <ResumeForm
              key={index}
              index={index}
              setProfileStatus={setProfileStatus}
            />
          ) : (
            <ResumeSection
              setProfileStatus={setProfileStatus}
              index={index}
              item={item}
              key={`${item.resumeTitle}-${index}`}
            />
          )
        )}
        {profileStatus.newResume ? (
          <ResumeForm setProfileStatus={setProfileStatus} />
        ) : (
          <Button
            startIcon={<Add />}
            variant="text"
            color="inherit"
            size="large"
            fullWidth
            sx={{ borderRadius: 0 }}
            onClick={() =>
              setProfileStatus((last) => {
                return { ...last, newResume: true };
              })
            }
          >
            ایجاد سابقه‌کاری
          </Button>
        )}
      </Box>
      <Box padding={10}></Box>
    </Box>
  );
};

export default Profile;
