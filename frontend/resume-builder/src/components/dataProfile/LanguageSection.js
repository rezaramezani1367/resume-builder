import { Box, colors, Typography, Button, Rating } from "@mui/material";
import React, { memo, useState } from "react";
import { ModeEdit } from "@mui/icons-material";

const LanguageSection = ({ item, setProfileStatus, index }) => {
  const [showEditIcon, setShowEditIcon] = useState(-1);
  return (
    <Box
      position="relative"
      sx={{
        padding: 3,
        borderBottom: 1,
        borderColor: "divider",
        cursor: "pointer",
      }}
      onMouseEnter={() => {
        setShowEditIcon(index);
      }}
      onMouseLeave={() => {
        setShowEditIcon(-1);
      }}
    >
      <Box
        position="absolute"
        top={10}
        right={10}
        sx={{
          display: {
            xs: "block",
            md: index === showEditIcon ? "block" : "none",
          },
        }}
        onClick={() =>
          setProfileStatus((last) => {
            const help = [...last.editLanguage];
            help[index] = true;
            return { ...last, editLanguage: [...help] };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}
      >
        <Typography
          variant="h6"
          color={colors.brown.A700}
          fontWeight={600}
          fontSize={15.5}
        >
          {"زبان "}
          {item.languageName.name}
        </Typography>
        <Rating
          name="read-only"
          sx={{
            "& .MuiRating-iconFilled": {
              color: colors.grey[700],
            },
          }}
          value={item.languageLevel.id}
          precision={0.5}
          readOnly
          size="small"
        />
      </Box>
    </Box>
  );
};

export default memo(LanguageSection);
