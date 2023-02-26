import { Check, Close, Moving } from "@mui/icons-material";
import { Box, colors } from "@mui/material";
import React from "react";

const JobBenefitsItem = ({ active, item, editBenefitsItem }) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3.5,
          transition: "hover 1s ",
          userSelect: "none",
          ":hover": editBenefitsItem
            ? {
                bgcolor: colors.grey[200],
                cursor: "pointer",
                transform: "scale(1.03)",
              }
            : {},
          color: active ? "info.main" : "error.main",
          alignItems: "center",
          border: 1,
          borderColor: active ? "info.main" : "error.main",
          borderRadius: 10,
          paddingY: 0.5,
          paddingX: 1.5,
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.75,
            alignItems: "center",
          }}
        >
          {item.icon}
          {item.name}
        </Box>
        {active ? (
          <Check sx={{ transform: "scaleX(1)", fontSize: 17 }} />
        ) : (
          <Close sx={{ transform: "scaleX(1)", fontSize: 17 }} />
        )}
      </Box>
    </Box>
  );
};

export default JobBenefitsItem;
