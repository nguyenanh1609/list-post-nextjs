import {
  CardMedia,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OneColumnLayout from "../layout/oneColumnLayout";

interface HomeProps {
  listPosts: Array<listPostsProps>;
  page: string | number;
  total: string | number;
  status: boolean;
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
  const { listPosts, page, total, status } = props;
  const [data, setData] = useState<Array<listPostsProps>>([]);
  const [dataDefault, setDataDefault] = useState<Array<listPostsProps>>([]);
  const [sortLike, setSortLike] = useState<number>(0);
  const [stausLoading, setStausLoading] = useState<boolean>(true);

  useEffect(() => {
    setData([...listPosts]);
    setDataDefault([...listPosts]);
    setStausLoading(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextPageDetail = (id: string) => {
    router.push(`/post/${id}`);
  };

  const callDataPage = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    let json;
    try {
      setData([]);
      setDataDefault([]);

      await setStausLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?limit=12&page=${value - 1}`,
        {
          headers: {
            "app-id": "62adde6f72c63a0f1600fa5a",
          },
        }
      );

      json = await res.json();

      await setStausLoading(false);
    } catch (error) {
      await setStausLoading(true);
    }

    const listPosts = json.data;

    setDataDefault(listPosts);

    switch (sortLike) {
      case 1:
        setData([...listPosts].sort((a, b) => a.likes - b.likes));
        break;
      case 2:
        setData([...listPosts].sort((a, b) => b.likes - a.likes));
        break;
      default:
        setData([...listPosts]);
        break;
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
        setData(dataDefault);
        break;
    }
  };

  return (
    <>
      <Head>
        <title>List post</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_API_URL_ICON_1}`} />
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

          {stausLoading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {!stausLoading && (
            <Grid container spacing={2}>
              {data &&
                data.map((e, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <ItemPost>
                      <Box className="user-infor">
                        <Box className="user-infor-img">
                          <Image
                            src={e.owner.picture}
                            alt={`${e.owner.title} ${e.owner.firstName} ${e.owner.lastName}`}
                            layout="responsive"
                            width={"100%"}
                            height={"100%"}
                            style={{
                              borderRadius: "99999px",
                            }}
                            placeholder="blur"
                            blurDataURL={e.owner.picture}
                          />
                        </Box>
                        <Box className="user-infor-content">
                          <Typography>
                            {`${e.owner.title} ${e.owner.firstName} ${e.owner.lastName}`}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#65676b",
                            }}
                          >
                            {moment(e.publishDate).format(
                              "MMM DD YYYY HH:mm:ss"
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="content-post">
                        <Box
                          className="content-post-img"
                          sx={{
                            "& > img": {
                              width: "100%",
                              height: "240px",
                            },
                          }}
                        >
                          <Link href={`/post/${e.id}`}>
                            <a>
                              <Image
                                src={e.image}
                                alt={``}
                                layout="responsive"
                                width={"100%"}
                                height={"100%"}
                                style={{
                                  cursor: "pointer",
                                }}
                                placeholder="blur"
                                blurDataURL={e.image}
                              />
                            </a>
                          </Link>
                        </Box>
                        <Box className="content-post-infor">
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#65676b",
                            }}
                          >
                            {moment(e.publishDate).format(
                              "MMM DD YYYY HH:mm:ss"
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            <Link href={`/post/${e.id}`}>
                              <a> {e.text}</a>
                            </Link>
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
          )}
          <Box
            sx={{
              margin: "20px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(Number(total) / 12)}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?limit=12`, {
    headers: {
      "app-id": "62adde6f72c63a0f1600fa5a",
    },
  });
  const json = await res.json();

  const listPosts = json.data;

  return {
    props: {
      listPosts: listPosts,
      page: json.page,
      total: json.total,
      status: false,
    },
  };
}

export default Home;

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
    alignItems: "center",
    columnGap: "20px",
    "& > .content-post-img": {
      flexBasis: "50%",
    },
    "& > .content-post-infor": {
      display: "flex",
      flexBasis: "50%",
      flexDirection: "column",
      rowGap: "8px",
      "& > .content-post-infor-like": {
        width: "20px",
        height: "20px",
        display: "flex",
        columnGap: "8px",
      },
    },
  },
}));
