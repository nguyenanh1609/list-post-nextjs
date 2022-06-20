import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import OneColumnLayout from "../layout/oneColumnLayout";
import { useSession, signIn, signOut } from "next-auth/react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useEffect } from "react";
import Image from "next/image";

function Profile() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="Profile" content="Profile" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_API_URL_ICON_2}`} />
      </Head>
      <OneColumnLayout>
        {session ? (
          <>
            <Box
              sx={{
                margin: "20px 0px",
              }}
            >
              <Typography>Profile</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" columnGap="20px">
                  <Typography>Đăng nhập :</Typography>
                  <Typography>
                    {moment(session?.expires).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                </Box>
                <Box display="flex" columnGap="20px">
                  <Typography>Email:</Typography>
                  <Typography>{session?.user?.email}</Typography>
                </Box>
                <Box display="flex" columnGap="20px">
                  <Typography>Tên :</Typography>
                  <Typography>{session?.user?.name}</Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography>
            Hãy đăng nhập đi nào đừng có tỏ ra là mình biết nhập url , hack ít
            thôi :(
          </Typography>
        )}
      </OneColumnLayout>
    </>
  );
}

export default Profile;
