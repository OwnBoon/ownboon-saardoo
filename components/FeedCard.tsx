import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Comment,
  CommentBody,
  FeedComment,
  FeedCommentBody,
  Posts,
  User as Users,
  UserBody,
  Videos,
} from "../typings";
import ReactTimeago from "react-timeago";
import { fetchComments } from "../utils/fetchComments";
import { Button, Grid, Input, Text, Tooltip, User } from "@nextui-org/react";
import { BsSend } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import ReactPlayer from "react-player";
import { fetchFeedComments } from "../utils/fetchFeedComments";
import { SendIcon } from "./Postcard/SendIcon";
import {
  FaComments,
  FaInfoCircle,
  FaShareAlt,
  FaThumbsUp,
} from "react-icons/fa";
import { useRouter } from "next/router";
import {
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from "@mui/material";
import { DeleteIcon } from "lucide-react";

interface Props {
  feeds: Videos;
  match: Users[];
  users: Users[];
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,

    color:
      theme.palette.mode === "light"
        ? "theme.palette.grey[300]"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const FeedCard = ({ feeds, match, users }: Props) => {
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const random = generateString(8);
  const random2 = generateString(9);

  const { isLoaded, isSignedIn, user } = useUser();
  const refreshComments = async () => {
    // @ts-ignore

    const comments: FeedComment[] = await fetchFeedComments(feeds._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const blogauthor = users.filter(
    (userss) => userss.slug!.current === feeds.author
  );

  const likeIfFollowMoreThan0 = async (id: string) => {
    const liked = feeds.liked!.map((follows) => ({
      _key: random,
      _ref: follows._id,
      _type: "reference",
    }));
    const mutation = {
      _id: id,
      liked: [
        // previously liked

        ...liked,

        {
          _key: random2,
          _ref: match[0]._id,
          _type: "reference",
        },
      ],
    };
    const result = await fetch(`/api/setBlog`, {
      body: JSON.stringify(mutation),
      method: "POST",
    });

    const json = result.json();
    // console.log(json);
    router.replace(router.pathname);
    return json;
  };
  const likeIfFollowLessThan0 = async (id: string) => {
    const mutation = {
      _id: id,
      liked: [
        // previously liked

        {
          _key: random2,
          _ref: match[0]._id,
          _type: "reference",
        },
      ],
    };
    const result = await fetch(`/api/setBlog`, {
      body: JSON.stringify(mutation),
      method: "POST",
    });

    const json = result.json();
    // console.log(json);
    router.replace(router.pathname);
    return json;
  };
  const isfollowing = match[0].follow?.map((followers) => followers.name);
  const addFollowIfFollowMoreThan1 = async (e: any) => {
    const follows = match[0].follow!.map((follows) => ({
      _key: random,
      _ref: follows._id,
      _type: "reference",
    }));
    e.preventDefault();
    try {
      const postInfo: UserBody = {
        id: match[0]._id,
        follow: [
          ...follows,

          {
            _key: random2,
            _ref: blogauthor[0]._id!,
            _type: "reference",
          },
        ],
      };
      const result = await fetch(`/api/addFollow`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });

      const json = await result.json();
      return json;
    } catch (err) {
      console.error(err);
    } finally {
      // window.location.reload();
      router.replace(router.pathname);
    }
  };
  const addDelete = async (id: string) => {
    const postInfo = {
      // @ts-ignore
      _id: id,
    };

    const result = await fetch(`/api/deleteGoals`, {
      body: JSON.stringify(postInfo),
      method: "POST",
    });
    const json = await result.json();
    return json;
  };
  console.log(blogauthor);
  const addFollowIfFollowLessThan1 = async (e: any) => {
    e.preventDefault();
    try {
      const postInfo: UserBody = {
        id: match[0]._id,
        follow: [
          {
            _key: "uehquhe",
            _ref: blogauthor[0]._id!,
            _type: "reference",
          },
        ],
      };
      const result = await fetch(`/api/addFollow`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });

      const json = await result.json();
      return json;
    } catch (err) {
      console.error(err);
    } finally {
      // window.location.reload();
      router.replace(router.pathname);
    }
    router.replace(router.pathname);
  };

  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = async (id: string) => {
    setLoading(true);
    // Comment logic
    const comment: FeedCommentBody = {
      _type: "feedcomment",
      comment: input,
      tweetId: id,
      username: user?.username || "unknown user",
      profileImg: user?.profileImageUrl || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addFeedComments`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    setInput("");
    refreshComments();
    setLoading(false);
  };
  return (
    <div className="bg-zinc-600 fade bg-opacity-10 self-stretch mt-5 w-full p-3 rounded-xl border-[0.75px] border-solid border-zinc-700 border-opacity-50 max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[58%] max-md:w-full max-md:ml-0">
          <div className="flex-col shine-button2 overflow-hidden relative flex min-h-[429px] pl-5 pr-2 pt-2 pb-96 max-md:max-w-full max-md:mt-6">
            <img
              loading="lazy"
              src={feeds.image}
              className="absolute  z-10 h-full w-full object-cover rounded-md object-center inset-0"
            />
          </div>
        </div>
        <div className="flex flex-col items-stretch lg:w-[10%] ml-5 h-full  max-md:ml-0">
          <div className="flex flex-col w-full lg:w-[22rem]   max-md:mt-6">
            <div className="self-stretch flex w-full items-start justify-between gap-5">
              <div className="flex items-start gap-2.5 max-md:justify-center">
                <img
                  loading="lazy"
                  src={feeds.profileImage}
                  className="aspect-square shine-button object-cover object-center w-[33px] overflow-hidden self-stretch max-w-full rounded-[50%]"
                />
                <Link
                  // @ts-ignore
                  href={`/user/${blogauthor[0].slug!.current}`}
                  className="text-zinc-300 text-base font-semibold self-center my-auto"
                >
                  {feeds.author}
                </Link>
                {match[0].follow ? (
                  isfollowing!.includes(blogauthor[0].name) ? (
                    <div className="text-neutral-500 shine-button cursor-pointer text-start text-xs font-semibold flex border bg-white bg-opacity-5 w-fit justify-center   px-4 py-2 rounded border-solid border-white border-opacity-10">
                      Following
                    </div>
                  ) : (
                    <div
                      onClick={(e) => {
                        {
                          match[0].follow
                            ? match[0].follow.length > 0
                              ? addFollowIfFollowMoreThan1(e)
                              : addFollowIfFollowLessThan1(e)
                            : addFollowIfFollowLessThan1(e);
                        }
                      }}
                      className="text-zinc-300 flex shine-button cursor-pointer text-center text-xs font-semibold self-center border bg-white bg-opacity-20 w-fit justify-center max-w-full my-auto pl-4 pr-4 py-2 rounded border-solid border-white border-opacity-30"
                    >
                      Follow
                    </div>
                  )
                ) : (
                  <div
                    onClick={(e) => {
                      {
                        match[0].follow
                          ? match[0].follow.length > 0
                            ? addFollowIfFollowMoreThan1(e)
                            : addFollowIfFollowLessThan1(e)
                          : addFollowIfFollowLessThan1(e);
                      }
                    }}
                    className="text-zinc-300 flex shine-button cursor-pointer text-center text-xs font-semibold self-center border bg-white bg-opacity-20 w-fit justify-center max-w-full my-auto pl-4 pr-4 py-2 rounded border-solid border-white border-opacity-30"
                  >
                    Follow
                  </div>
                )}
              </div>
              <img
                // @ts-ignore
                onClick={handleClick}
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ee68cff6-5213-4f0a-bc26-e39fb42df07c?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                className="aspect-square cursor-pointer object-cover object-center w-[30px] overflow-hidden max-w-full"
              />
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  Report
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />
                {blogauthor[0].name == match[0].name && (
                  <MenuItem onClick={() => addDelete(feeds._id!)} disableRipple>
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                )}
              </StyledMenu>
            </div>
            <div className="bg-zinc-700 bg-opacity-50 self-stretch w-full h-px mt-3" />
            <div className="text-zinc-300 text-base mt-5">
              <span className="font-semibold">{feeds.author} :</span>
              <span className=""> </span>
              <span className="">{feeds.title}</span>
            </div>
            <div className="h-52 overflow-y-scroll scrollbar-none">
              {comments.map((comment) => (
                <div className="self-stretch flex items-start justify-start gap-2.5 mt-4">
                  <img
                    loading="lazy"
                    src={comment.profileImg}
                    className="aspect-[1.12] object-cover object-center w-7 overflow-hidden max-w-full rounded-[50%]"
                  />

                  <div className="text-zinc-300 text-sm   shrink-0 basis-auto mt-1.5">
                    <span className="font-semibold"> {comment.username}</span>
                    <span className=""> </span>
                    <span className="">{comment.comment}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-700 bg-opacity-50 self-stretch w-full h-px mt-3.5" />
            <div className="py-2 flex gap-4 mt-2">
              <Tooltip content={feeds.liked ? feeds.liked.length : 0}>
                {match[0].follow ? (
                  isfollowing!.includes(blogauthor[0].name) ? (
                    <img
                      onClick={(e) => {
                        {
                          feeds.liked
                            ? feeds.liked.length > 1
                              ? likeIfFollowMoreThan0(feeds._id!)
                              : likeIfFollowLessThan0(feeds._id!)
                            : likeIfFollowLessThan0(feeds._id!);
                        }
                      }}
                      loading="lazy"
                      src="https://cdn.discordapp.com/attachments/1018558539947585596/1167502249883349102/New_Project.png?ex=654e5c33&is=653be733&hm=f572aa28044141d5286d43bd7bfd892b5f9fbf4bc091ae6b9bff2fac200be80b&"
                      className={`h-6 w-6 select-none ${
                        match[0].follow
                          ? isfollowing!.includes(blogauthor[0].name)
                            ? "!text-pink-500"
                            : "text-neutal-200"
                          : "text-neutal-200"
                      }`}
                    />
                  ) : (
                    <img
                      onClick={(e) => {
                        {
                          feeds.liked
                            ? feeds.liked.length > 1
                              ? likeIfFollowMoreThan0(feeds._id!)
                              : likeIfFollowLessThan0(feeds._id!)
                            : likeIfFollowLessThan0(feeds._id!);
                        }
                      }}
                      loading="lazy"
                      src="https://cdn.discordapp.com/attachments/1018558539947585596/1167111169270620170/d1567390-3379-41d2-babd-6b498aa16668.png?ex=654ceffa&is=653a7afa&hm=afd7c302b6aabe3652afd62784cdf468b22b9e157f25bc2d642b56f38a50e6b8&"
                      className={`h-6 w-6 select-none ${
                        match[0].follow
                          ? isfollowing!.includes(blogauthor[0].name)
                            ? "!text-pink-500"
                            : "text-neutal-200"
                          : "text-neutal-200"
                      }`}
                    />
                  )
                ) : (
                  <img
                    onClick={(e) => {
                      {
                        feeds.liked
                          ? feeds.liked.length > 1
                            ? likeIfFollowMoreThan0(feeds._id!)
                            : likeIfFollowLessThan0(feeds._id!)
                          : likeIfFollowLessThan0(feeds._id!);
                      }
                    }}
                    loading="lazy"
                    src="https://cdn.discordapp.com/attachments/1018558539947585596/1167111169270620170/d1567390-3379-41d2-babd-6b498aa16668.png?ex=654ceffa&is=653a7afa&hm=afd7c302b6aabe3652afd62784cdf468b22b9e157f25bc2d642b56f38a50e6b8&"
                    className={`h-6 w-6 select-none ${
                      match[0].follow
                        ? isfollowing!.includes(blogauthor[0].name)
                          ? "!text-pink-500"
                          : "text-neutal-200"
                        : "text-neutal-200"
                    }`}
                  />
                )}
                {/* <img
                  onClick={(e) => {
                    {
                      feeds.liked
                        ? feeds.liked.length > 1
                          ? likeIfFollowMoreThan0(feeds._id!)
                          : likeIfFollowLessThan0(feeds._id!)
                        : likeIfFollowLessThan0(feeds._id!);
                    }
                  }}
                  loading="lazy"
                  src="https://cdn.discordapp.com/attachments/1018558539947585596/1167111169270620170/d1567390-3379-41d2-babd-6b498aa16668.png?ex=654ceffa&is=653a7afa&hm=afd7c302b6aabe3652afd62784cdf468b22b9e157f25bc2d642b56f38a50e6b8&"
                  className={`h-6 w-6 select-none ${
                    match[0].follow
                      ? isfollowing!.includes(blogauthor[0].name)
                        ? "!text-pink-500"
                        : "text-neutal-200"
                      : "text-neutal-200"
                  }`}
                /> */}
              </Tooltip>
              <img
                onClick={() => {
                  showInput ? setShowInput(false) : setShowInput(true);
                }}
                loading="lazy"
                src="https://cdn.discordapp.com/attachments/1018558539947585596/1167111660796923994/8c272588-6472-4826-a64b-a0f519036dce.png?ex=654cf06f&is=653a7b6f&hm=ccbebd184604575c240073226a68df30bc14f83af055f9ed73788207b3e830af&"
                className="h-6 w-6 active:scale-105 cursor-pointer "
              />
              <img
                loading="lazy"
                src="https://cdn.discordapp.com/attachments/1018558539947585596/1167111697740337202/71494566-81c8-402d-ad47-e34437d23e81.png?ex=654cf078&is=653a7b78&hm=a7788e1baa91c04e11eb627dfd88801b8bb75b6ddd6e72a306100491c8d671f4&"
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            {/* <img
        loading="lazy"
        className="aspect-[12.32] object-cover object-center w-full overflow-hidden self-stretch mt-4"
        alt="Description of the other image"
      /> */}
            {showInput && (
              <div className="bg-zinc-700 fade2  bg-opacity-10 backdrop-blur-md self-stretch h-fit   flex w-full items-center gap-2 mt-4 p-2 rounded-md border-[0.75px] border-solid border-zinc-700 border-opacity-50 justify-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter" && input.length > 0) {
                      handleSubmit(feeds._id!);
                    }
                  }}
                  placeholder="write your comment"
                  className="text-zinc-300 text-sm bg-transparent outline-none focus:outline-none focus:ring-0 font-semibold self-stretch w-full max-w-full pl-3 pr-5 py-1.5   "
                />

                <img
                  onClick={() => handleSubmit(feeds._id!)}
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5dbc9a54-5238-46f5-b5e8-0c265974538a?apiKey=8d19dab166a647fb9eff6738dee1ce62&"
                  className=" w-4 h-4 md:w-5 md:h-5 cursor-pointer active:scale-105 "
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
