import { Close,Save } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react'

const AboutMeForm = ({setProfileStatus}) => {
  return (
    <Box padding={2}>
    <Box sx={{ display: "flex", justifyContent: "end", gap: 2,marginTop:2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Close />}
          onClick={() =>
            setProfileStatus((last) => {
              return { ...last, aboutMeEditStatus: false };
            })
          }
        >
          انصراف
        </Button>
        <Button variant="contained" color="success" startIcon={<Save />}>
          ذخیره
        </Button>
      </Box>
    </Box>
  )
}

export default AboutMeForm