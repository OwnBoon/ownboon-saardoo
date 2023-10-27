import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const drawerBleeding = 42;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? grey[800]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101010" : "#101010",
  //   width: "",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SidebarMobile(props: Props) {
  const router = useRouter();
  const { window } = props;
  const selected =
    "transition-all duration-50 sidebar brightness-150 w-fit cursor-pointer flex items-center gap-y-8 gap-x-4 text-white";
  const normal =
    "w-fit cursor-pointer sidebar brightness-[-50] flex items-center text-gray-400 gap-y-8 gap-x-4";
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="inline z-50 scrollbar-none md:hidden">
      <SwipeableDrawer
        className="w-full scrollbar-none"
        container={container}
        anchor="left"
        sx={{
          width: "100%",
        }}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* <Puller /> */}

        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            width: "100%",
            overflow: "auto",
          }}
          className="scrollbar-none"
        >
          <div className="flex flex-col scrollbar-none items-center gap-6">
            <div>
              <img
                src="https://ownboon.com/_next/image?url=%2Flogo.png&w=48&q=75"
                alt={""}
                width={55}
                height={55}
                className=" p-2  rounded  "
              />
            </div>
            <div className="flex flex-col gap-10 items-center">
              <Link
                href={"/socials"}
                //   onClick={() => router.push("/socials")}
                className={router.pathname == "/socials" ? selected : normal}
              >
                <Image
                  src="/socials.svg"
                  alt={""}
                  width={50}
                  height={50}
                  className=" p-2  rounded  "
                />
              </Link>
              <Link
                href={"/chat"}
                //   onClick={() => router.push("/chats")}
                className={router.pathname == "/chats" ? selected : normal}
              >
                <Image
                  src="/chat.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </Link>
              <div
                //   onClick={() => router.push("/buddies")}
                className={router.pathname == "/buddies" ? selected : normal}
              >
                <Image
                  src="/buddies.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </div>
              <div
                onClick={() => router.push("/workspace")}
                className={router.pathname == "/workspace" ? selected : normal}
              >
                <Image
                  src="/workspace.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </div>
              <div
                onClick={() => router.push("/roadmap")}
                className={router.pathname == "/roadmap" ? selected : normal}
              >
                <Image
                  src="/roadmap.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </div>
              <div
                onClick={() => router.push("/lofi")}
                className={router.pathname == "/lofi" ? selected : normal}
              >
                <Image
                  src="/lofi.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </div>
            </div>
            <div className="flex items-end h-full ">
              <div
                className={
                  router.pathname == "/lofi"
                    ? `${selected}  pb-3 `
                    : `${normal} pb-6 flex items-end`
                }
              >
                <Image
                  src="/feedback.svg"
                  width={50}
                  height={50}
                  alt={""}
                  className=" p-2 rounded  "
                />
              </div>
            </div>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Box>
  );
}
