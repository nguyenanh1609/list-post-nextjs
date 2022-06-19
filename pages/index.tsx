import {
  CardMedia,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OneColumnLayout from "../layout/oneColumnLayout";
import { ItemPost } from "./style";

interface HomeProps {
  listPosts: Array<listPostsProps>;
  page: string | number;
  total: string | number;
}

interface listPostsProps {
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
}

const Home = (props: HomeProps) => {
  const router = useRouter();

  const { listPosts } = props;

  const [data, setData] = useState<Array<listPostsProps>>([]);
  const [sortLike, setSortLike] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setData([...listPosts].slice(0, 12));
  }, []);

  const handleNextPageDetail = (id: string) => {
    router.push(`/post/${id}`);
  };

  const callDataPage = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    if (value === 1) {
      switch (sortLike) {
        case 1:
          setData(
            [...listPosts].slice(0, 12).sort((a, b) => a.likes - b.likes)
          );
          break;
        case 2:
          setData(
            [...listPosts].slice(0, 12).sort((a, b) => b.likes - a.likes)
          );
          break;

        default:
          setData([...listPosts].slice(0, 12));
          break;
      }
      return;
    } else {
      switch (sortLike) {
        case 1:
          setData(
            [...listPosts].slice(12, 24).sort((a, b) => a.likes - b.likes)
          );
          break;
        case 2:
          setData(
            [...listPosts].slice(12, 24).sort((a, b) => b.likes - a.likes)
          );
          break;

        default:
          setData([...listPosts].slice(12, 24));
          break;
      }
      return;
    }
  };

  const handleSortLike = (e: any) => {
    setSortLike(e.target.value);

    switch (e.target.value) {
      case 1:
        setData([...data].sort((a, b) => a.likes - b.likes));
        break;
      case 2:
        setData([...data].sort((a, b) => b.likes - a.likes));
        break;

      default:
        setData(
          page === 1
            ? [...listPosts].slice(0, 12)
            : [...listPosts].slice(12, 24)
        );
        break;
    }
  };

  return (
    <>
      <Head>
        <title>List post</title>
        <meta name="description" content="Home page" />
        <link
          rel="icon"
          href="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-1/183517623_1467332616945216_4411592049694411845_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=101&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tlVT9Kob-RMAX-jBavk&_nc_ht=scontent.fhan14-1.fna&oh=00_AT_8aS8bktGB6uiKH9xdw_m2Nay6-WBdYv2OOTZ98cV5vA&oe=62D32A35"
        />
      </Head>
      <OneColumnLayout>
        <>
          <Box
            sx={{
              margin: "20px 0px",
            }}
          >
            <Box display="flex" columnGap="20px" alignItems="center">
              <Typography>Like</Typography>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortLike}
                  onChange={handleSortLike}
                >
                  <MenuItem value={0}>Mặc định</MenuItem>
                  <MenuItem value={1}>Từ thấp đến cao</MenuItem>
                  <MenuItem value={2}>Từ cao đến thấp</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {data &&
              data.map((e, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <ItemPost>
                    <Box className="user-infor">
                      <Box className="user-infor-img">
                        <CardMedia
                          component="img"
                          image={e.owner.picture}
                          alt="Paella dish"
                        />
                      </Box>
                      <Box className="user-infor-content">
                        <Typography>
                          {`${e.owner.title} ${e.owner.firstName} ${e.owner.lastName}`}
                        </Typography>
                        <Typography>
                          {moment(e.publishDate).format("MMM DD YYYY HH:mm:ss")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="content-post">
                      <Box className="content-post-img">
                        <CardMedia
                          component="img"
                          image={e.image}
                          alt="Paella dish"
                          sx={{
                            width: "100%",
                            height: "240px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => handleNextPageDetail(e.id)}
                        />
                      </Box>
                      <Box className="content-post-infor">
                        <Typography>
                          {moment(e.publishDate).format("MMM DD YYYY HH:mm:ss")}
                        </Typography>
                        <Typography
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleNextPageDetail(e.id)}
                        >
                          {e.text}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            columnGap: "5px",
                            flexWrap: "wrap",
                            rowGap: "5px",
                          }}
                        >
                          {e.tags.map((e, index) => (
                            <Chip
                              label={e}
                              color="primary"
                              size="small"
                              key={index}
                            />
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
                          <Typography>{e.likes}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ItemPost>
                </Grid>
              ))}
          </Grid>
          <Box
            sx={{
              margin: "20px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={2}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={callDataPage}
            />
          </Box>
        </>
      </OneColumnLayout>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://dummyapi.io/data/v1/post?limit=24", {
    headers: {
      "app-id": "62adde6f72c63a0f1600fa5a",
    },
  });
  const json = await res.json();

  const listPosts = json.data;

  return {
    props: {
      listPosts: listPosts,
    },
  };
}

export default Home;
