import { Typography } from "@mui/material";
import React from "react";

const EmptyValue = () => {
  return <Typography variant="h6" fontWeight={600} paddingLeft={1} letterSpacing={3} component="p" color="error.main">---</Typography>;
};

export default EmptyValue;
