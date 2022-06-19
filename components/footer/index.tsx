import { Grid, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";

export default function FooterApp() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        padding: "50px",
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Title>Thông tin</Title>
            <ItemContent>Email : anhnh@blockchaindeveloper.asia</ItemContent>
            <ItemContent>Facebook : Ánh Nguyễn</ItemContent>
            <ItemContent>Number Phone : 0388831609</ItemContent>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Title>Địa Chỉ</Title>
            <ItemContent>hiệp Thuận, Phúc Thọ, Hà Nội</ItemContent>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const Title = styled(Typography)(() => ({
  color: "#fff",
  fontSize: "32px",
}));

export const ItemContent = styled(Typography)(() => ({
  color: "#fff",
  fontSize: "18px",
  margin: "8px 0px",
}));
