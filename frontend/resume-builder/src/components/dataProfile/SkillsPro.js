import { ModeEdit } from "@mui/icons-material";
import { Box, Button, Chip, styled } from "@mui/material";
import React from "react";
import EmptyValue from "../EmptyValue";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const SkillsPro = ({ userData, setProfileStatus }) => {
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
            return { ...last, skillProEditStatus: true };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      {userData.profile?.skills ? (
        <Box
          component="ul"
          sx={{
            display: "flex",
            // justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 1.4,
            m: 0,
          }}
        >
          {userData.profile?.skills.map((data) => {
            return (
              <ListItem key={data}>
                <Chip label={data} variant="outlined" />
              </ListItem>
            );
          })}
        </Box>
      ) : (
        <EmptyValue />
      )}
    </Box>
  );
};

export default SkillsPro;
