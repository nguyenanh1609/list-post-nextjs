import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import FooterApp from "../../components/footer";
import ResponsiveAppBar from "../../components/header";

interface OneColumnLayout {
  children: JSX.Element;
}

function OneColumnLayout(props: OneColumnLayout) {
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          minHeight: "80vh",
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            sx={{
              margin: "20px 0px",
            }}
          >
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <FooterApp />
    </>
  );
}

export default OneColumnLayout;
