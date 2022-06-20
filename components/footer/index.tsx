import { Grid, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function FooterApp() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0f4174",
          padding: "50px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container sx={{ color: "#fff" }}>
            <Grid item xs={12} lg={6}>
              <Title>Thông tin</Title>
              <Box display="flex" columnGap="10px" alignItems="center">
                <Box>
                  <FacebookIcon />
                </Box>
                <Typography>Ánh Nguyễn</Typography>
              </Box>
              <Box display="flex" columnGap="10px" alignItems="center">
                <Box>
                  <EmailIcon />
                </Box>
                <Typography>nguyenhuuanh102000@gmail.com</Typography>
              </Box>
              <Box display="flex" columnGap="10px" alignItems="center">
                <Box>
                  <LocalPhoneIcon />
                </Box>
                <Typography>038.883.1609</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Title>Địa Chỉ</Title>
              <Box>hiệp Thuận, Phúc Thọ, Hà Nội</Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#113c68",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Typography>© 2022 Copyright: Anh Nguyen</Typography>
      </Box>
    </>
  );
}

export const Title = styled(Typography)(() => ({
  color: "#fff",
  fontSize: "32px",
}));
