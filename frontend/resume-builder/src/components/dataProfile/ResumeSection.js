import { Box, colors, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns-jalali";
import Clamp from "react-multiline-clamp";
import { ModeEdit } from "@mui/icons-material";

const ResumeSection = ({ item, setProfileStatus, index }) => {
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
        id={`${item.resumeTitle}-${index}`}
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
            return { ...last, personInfoEditStatus: true };
          })
        }
      >
        <Button variant="outlined" endIcon={<ModeEdit />}>
          ویرایش
        </Button>
      </Box>
      <Typography
        variant="h6"
        color={colors.brown.A700}
        fontWeight={600}
        fontSize={17}
      >
        {item.resumeTitle}
      </Typography>
      <Typography
        variant="body2"
        marginBottom={1}
        color={colors.grey[600]}
        fontWeight={600}
      >
        {item.companyName}{" "}
        <Typography variant="span" fontSize={10}>
          (از {format(new Date(item.dateFrom), "yyyy/MM/dd")} الی{" "}
          {format(new Date(item.dateTo), "yyyy/MM/dd")})
        </Typography>
      </Typography>
      <Clamp withTooltip lines={2}>
        <Typography variant="h6" fontSize={14} color={colors.grey[600]}>
          {item.description}
        </Typography>
      </Clamp>
    </Box>
  );
};

export default ResumeSection;
