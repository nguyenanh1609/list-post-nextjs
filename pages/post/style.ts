import { Box, styled } from "@mui/system";

// #dba83d

export const ItemPost = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "30px",
  borderRadius: "4px",
  boxShadow: "rgb(10 10 10 / 82%) 0px 0px 5px",
  "& > .user-infor": {
    display: "flex",
    columnGap: "20px",
    "& > .user-infor-img": {
      width: "50px",
      height: "50px",
      "& > img": {
        borderRadius: "99999px",
      },
    },
    "& > .user-infor-content": {},
  },
  "& > .content-post": {
    marginTop: "30px",
    display: "flex",
    // alignItems: "center",
    columnGap: "20px",
    "& > .content-post-img": {
      flexBasis: "50%",
    },
    "& > .content-post-infor": {
      display: "flex",
      flexBasis: "50%",
      flexDirection: "column",
      rowGap: "20px",
      "& > .content-post-infor-like": {
        width: "20px",
        height: "20px",
        display: "flex",
        columnGap: "8px",
      },
    },
  },
}));
