import { Box, Typography } from "@mui/material";
import React from "react";

const Notfound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontWeight="bold"
      height="85vh"
    >
      <Box
        border={1}
        borderColor="divider"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        padding={4}
        borderRadius={2}
      >
        <Typography variant="h3" component="span" color="error.main">
          صفحه مورد نظر یافت نشد.
        </Typography>
        <Typography variant="h4" component="span" color="secondary.main">
          خطای 404
        </Typography>
      </Box>
    </Box>
  );
};

export default Notfound;
