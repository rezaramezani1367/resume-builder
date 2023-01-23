import { ModeEdit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const AboutMe = ({ setProfileStatus }) => {
  return (
    <Box
      padding={3}
      position="relative"
      sx={{
        paddingTop:{xs:5,md:3},
        cursor: "pointer",
        "&:hover": {
          "#edit3": {
            display: "block",
          },
          "#about-me-content": {
            paddingTop: {xs:0,md:2},
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
      <Typography id="about-me-content">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
        داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
        رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
        پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </Typography>
    </Box>
  );
};

export default AboutMe;
