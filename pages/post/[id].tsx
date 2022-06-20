import {
  Button,
  CardMedia,
  Chip,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import OneColumnLayout from "../../layout/oneColumnLayout";

interface PostDetailProps {
  postData: {
    id: string;
    text: string;
    image: string;
    likes: number;
    tags: Array<string>;
    publishDate: string;
    owner: {
      firstName: string;
      id: string;
      lastName: string;
      picture: string;
      title: string;
    };
  };
}

function Post(props: PostDetailProps) {
  const { postData } = props;

  const router = useRouter();

  console.log(router.isFallback);

  if (router.isFallback) {
    return <div>loading ........</div>;
  }

  return (
    <>
      <Head>
        <title>Post detail</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_API_URL_ICON_2}`} />
      </Head>
      <OneColumnLayout>
        <>
          <Box
            sx={{
              margin: "20px 0px",
            }}
          >
            <Button variant="contained" onClick={() => router.push("/")}>
              Back
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ItemPost>
                <Box className="user-infor">
                  <Box className="user-infor-img">
                    <Image
                      src={postData.owner.picture}
                      alt={`${postData.owner.title} ${postData.owner.firstName} ${postData.owner.lastName}`}
                      layout="responsive"
                      width={"100%"}
                      height={"100%"}
                      style={{
                        borderRadius: "99999px",
                      }}
                    />
                  </Box>
                  <Box className="user-infor-content">
                    <Typography>
                      {`${postData.owner.title} ${postData.owner.firstName} ${postData.owner.lastName}`}
                    </Typography>
                    <Typography>
                      {moment(postData.publishDate).format(
                        "MMM DD YYYY HH:mm:ss"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box className="content-post">
                  <Box className="content-post-img">
                    <Image
                      src={postData.image}
                      alt={``}
                      layout="responsive"
                      width={"100%"}
                      height={"100%"}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box className="content-post-infor">
                    <Typography>
                      {moment(postData.publishDate).format(
                        "MMM DD YYYY HH:mm:ss"
                      )}
                    </Typography>
                    <Typography>{postData.text}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "5px",
                        flexWrap: "wrap",
                        rowGap: "5px",
                      }}
                    >
                      {postData.tags.map((e, index) => (
                        <Chip label={e} color="primary" key={index} />
                      ))}
                    </Box>
                    <Box className="content-post-infor-like">
                      <CardMedia
                        component="img"
                        image="https://dummyapi.io/img/like.svg"
                        alt="Paella dish"
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <Typography>{postData.likes}</Typography>
                    </Box>
                  </Box>
                </Box>
              </ItemPost>
            </Grid>
          </Grid>
        </>
      </OneColumnLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    headers: {
      "app-id": "62adde6f72c63a0f1600fa5a",
    },
  });

  const json = await res.json();

  const path = json.data.map((item: any) => ({ params: { id: item.id } }));

  console.log(path);

  return {
    paths: path,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params?.id}`, {
    headers: {
      "app-id": "62adde6f72c63a0f1600fa5a",
    },
  });

  const json = await res.json();

  const postData = json;

  return {
    props: {
      postData: postData,
    },
    revalidate: 10,
  };
};

export default Post;

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
