import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import VanillaTilt from "vanilla-tilt";
import { StackedImageAnimation } from "./StackedImageAnimation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import Footer from "../Home/Footer";
export default function ExplorePages({ section }: any) {
  const list = {
    habit: {
      title: "Habits",
      about:
        "Discover curated self-improvement content and essential tools in one place, accompanied by a motivating playlist.",
      featureheading: [
        "Extensive Research & Analysis",
        "Personalized Roadmaps",
        "Tailored Community",
      ],
      featureparagraph: [
        "Explore comprehensive content tailored to each habit, providing valuable insights and guidance.",
        "Receive AI-generated personalized roadmaps for self-improvement, guiding you towards your best self.",
        "Connect with like-minded individuals, find study and gym buddies, and engage in focused group chats.",
      ],
    },
    productivity: {
      title: "Productivity",
      about:
        "Boost your productivity with AI-powered tools, task scheduling, and study techniques tailored to your goals.",
      featureheading: [
        "The AI Powered Platform",
        "Immersive Lofi Study Sessions",
        "Ultimate Ecosystem",
      ],
      featureparagraph: [
        "Leverage AI to automate task scheduling and discover optimal study techniques for efficient progress.",
        "Immerse yourself in animated Lofi video sessions and curated playlists designed to enhance focus.",
        "Access a comprehensive range of features including todos, journaling, notion templates, and more, all synchronized across the platform.",
      ],
    },
    community: {
      title: "Community",
      about:
        "Join a supportive community of like-minded individuals, fostering motivation, and discipline for greater progress.",
      featureheading: [
        "Productive Media",
        "AI Minimalism",
        "Group Inspiration",
      ],
      featureparagraph: [
        "Engage in content solely focused on self-improvement and productivity, eliminating distractions.",
        "Experience distraction-free sessions with AI-imposed time limits on chatting and scrolling.",
        "Create and join group chats focused on specific topics, fostering inspiration and growth together.",
      ],
    },
    icons: ["green", "blue", "purple"],
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".review-card"), {
      max: 15,
      speed: 300,
      transition: true,
    });
  }, []);
  const preview = () => {
    toast.info("Coming soon");
  };
  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>OwnBoon - Explore {section.title}</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="Explore a vibrant community, productive workspace, and effective habits at our platform. Connect with like-minded individuals, collaborate on projects, and cultivate positive routines. Join us today for a transformative experience."
        />
        <meta
          name="keywords"
          content="community, workspace, habits, connect, collaboration, productivity, positive routines, transformative experience"
        />
      </Head>
      <section id="Habits" className="fade  md:mt-[100px]">
        <div
          className={`${
            section.title === "Habits"
              ? "bg-habits"
              : section.title === "Productivity"
              ? "bg-productivity"
              : "bg-community"
          } rounded-br-full  z-no blur-3xl font-poppins	 absolute  md:w-[75%] h-[120%] w-[100%] md:h-[100%]`}
        ></div>
        <div className="flex flex-row mt-[-9vh] flex-wrap-reverse min-h-screen items-center align-center   justify-center">
          <div className="flex px-[3vw]  flex-col items-center md:items-start text-center md:text-left w-auto md:w-[50%] text-white ">
            <h1 className="md:text-[96px] py-2 fade text-6xl font-bold font-fontspring">
              {section.title}
            </h1>
            <p className="text-[20px] fade py-2 font-poppins">
              {section.about}
            </p>
            <button
              className="bg-white w-[191px] h-[45px] mt-5"
              onClick={preview}
            >
              <h1 className="py-2 font-poppins text-[16px] font-btn-gradient">
                Try It Now
              </h1>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center md:flex-row  p-2 ">
            <StackedImageAnimation />
          </div>
        </div>
        <div className="flex  bg-white flex-col mt-[100px]    items-center">
          <div className="heading font-poppins">
            <h1 className="revealtitle font-[600] mt-5 text-[32px] md:text-[3vw]">
              Coming Soon
            </h1>
          </div>
          <Image
            alt="amongus"
            src="/pic.webp"
            className="my-2 w-[100vw]"
            height={1950}
            width={1950}
          />
        </div>
        <div className="flex  flex-col min-h-screen pb-10  habit-bg-img justify-center ">
          <div className="heading font-poppins">
            <h1 className="revealtitle font-[600] mt-5 text-[32px] md:text-[3vw]">
              Features
            </h1>
          </div>
          <div className="flex flex-wrap mb-5 w-full justify-center p-1 gap-8 ">
            {section.featureheading.map((word: any, index: any) => {
              return (
                <div
                  key={index}
                  className="w-full  font-poppins  md:w-3/5 lg:w-2/5 xl:w-1/4 2xl:w-1/5 p-5"
                >
                  <div className="flex bg-white p-[3.5rem] h-[110%]  shadow-md rounded-[2rem] flex-col ">
                    <svg
                      className="w-1/3"
                      viewBox="0 0 95 95"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {list.icons[index] === "blue" ? (
                        <>
                          <g filter="url(#filter0_d_520_2)">
                            <circle
                              cx="46.5"
                              cy="43.5"
                              r="32.5"
                              fill="#00AEFF"
                            />
                          </g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M37.956 32.8437C36.0222 34.3611 28.0158 47.6496 28.0002 49.3674C27.964 53.4085 32.7931 55.5361 35.4939 52.6688C36.8825 51.1939 44.5813 38.9466 44.9764 37.5834C46.0743 33.7953 41.0587 30.4093 37.956 32.8437ZM52.7293 32.4321C51.5009 32.9337 43.9038 44.3061 42.4024 47.8907C40.8326 51.6382 44.9369 55.1058 48.6654 53.1825C49.5946 52.7033 52.5451 48.327 57.762 39.6901C60.5115 35.1388 57.3319 30.5532 52.7293 32.4321ZM58.3243 45.6006C54.9048 47.3321 55.3224 52.1937 59.0224 53.7225C61.4392 54.7212 64.4091 52.9103 64.934 50.1178C65.5671 46.7526 61.5161 43.9841 58.3243 45.6006Z"
                            fill="white"
                          />
                          <defs>
                            <filter
                              id="filter0_d_520_2"
                              x="0"
                              y="0"
                              width="95"
                              height="95"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="1" dy="4" />
                              <feGaussianBlur stdDeviation="7.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0.681529 0 0 0 0 1 0 0 0 0.4 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_520_2"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_520_2"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </>
                      ) : list.icons[index] === "green" ? (
                        <>
                          <g filter="url(#filter0_d_409_4928)">
                            <circle
                              cx="46.5"
                              cy="43.5"
                              r="32.5"
                              fill="#00F0B5"
                            />
                          </g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M45.6106 27.0705C44.3968 27.3276 44.1055 27.5901 36.2855 35.4757C29.1423 42.679 28.6217 43.2342 28.6217 43.6498C28.6217 44.271 43.3063 59.1791 44.596 59.8673C45.6893 60.4508 47.3225 60.4664 48.4117 59.9039C49.1765 59.5089 54.5871 54.2364 54.9601 53.5227C55.2787 52.9131 55.137 52.7387 50.57 48.1173C46.1564 43.6513 46.1564 43.6513 50.5477 39.2095C55.2073 34.4965 55.2333 34.4647 54.9574 33.8172C54.6463 33.0872 49.2231 27.7854 48.4034 27.4098C47.6103 27.0464 46.4119 26.9009 45.6106 27.0705ZM47.6168 29.3502C47.805 29.451 49.0062 30.5946 50.2862 31.8915C52.6134 34.2495 52.6134 34.2495 48.1843 38.7193C44.0469 42.8947 43.7552 43.2192 43.7552 43.6474C43.7552 44.0702 43.9829 44.3373 46.7019 47.1047C53.2873 53.8072 52.8776 52.8108 50.166 55.5332C47.3223 58.3883 46.9157 58.6139 45.6064 58.0621C45.2075 57.8939 31.2226 43.8863 31.2116 43.644C31.1997 43.3796 45.3217 29.3832 45.7671 29.218C46.3305 29.009 47.0797 29.0626 47.6168 29.3502ZM54.0765 39.9544C49.9832 44.072 50.0211 43.23 53.7551 47.0787C56.7623 50.1782 57.1947 50.5582 57.7154 50.5596C58.1908 50.5609 61.9656 46.739 62.5351 45.6799C63.1216 44.5894 63.1583 42.8015 62.616 41.7504C62.2706 41.0811 58.5739 37.1544 58.0242 36.8729C57.4711 36.5896 57.2499 36.7623 54.0765 39.9544ZM59.1121 40.8061C61.6244 43.3534 61.6219 43.9773 59.0901 46.5139C57.5936 48.0133 57.5936 48.0133 55.4288 45.8293C53.2641 43.6454 53.2641 43.6454 55.3959 41.4917C56.5684 40.3073 57.5584 39.3381 57.5959 39.3381C57.6334 39.3381 58.3157 39.9988 59.1121 40.8061ZM25 60.739C25 60.8826 25.0528 61 25.1172 61C25.1817 61 25.204 60.8826 25.1669 60.739C25.1296 60.5955 25.0768 60.478 25.0495 60.478C25.0224 60.478 25 60.5955 25 60.739Z"
                            fill="white"
                          />
                          <defs>
                            <filter
                              id="filter0_d_409_4928"
                              x="0"
                              y="0"
                              width="95"
                              height="95"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="1" dy="4" />
                              <feGaussianBlur stdDeviation="7.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0.941176 0 0 0 0 0.709804 0 0 0 0.4 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_409_4928"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_409_4928"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </>
                      ) : (
                        <>
                          <g filter="url(#filter0_d_410_5110)">
                            <circle
                              cx="46.5"
                              cy="43.5"
                              r="32.5"
                              fill="#AA77FF"
                            />
                          </g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M42.4406 27.3125C37.6853 29.0537 33.2361 33.9973 33.1857 37.5959C33.1487 40.249 35.8795 40.1201 36.8519 37.4228C37.9909 34.2633 40.6792 31.6444 43.6978 30.7536C45.587 30.1961 46.2306 28.7339 45.0901 27.5911C44.3957 26.8956 43.7614 26.8286 42.4406 27.3125ZM49.3397 27.6536C48.3814 28.6822 49.0387 30.5625 50.3564 30.5625C50.5656 30.5625 50.7954 30.6575 50.8671 30.7736C50.9387 30.8897 51.1447 30.9847 51.3252 30.9847C53.0714 30.9847 56.9225 35.2938 57.5737 37.9767C58.1315 40.2744 60.9991 40.0715 60.9643 37.7367C60.8929 32.9594 51.7695 25.0454 49.3397 27.6536ZM40.8829 34.9744C38.8909 36.839 41.5583 39.9216 43.7285 38.2631C45.401 36.9848 44.5234 34.3621 42.4231 34.3621C41.7361 34.3621 41.3902 34.4997 40.8829 34.9744ZM50.2338 34.8374C48.4432 36.3807 50.2898 39.2346 52.5277 38.3822C53.252 38.1061 53.7972 37.2035 53.7723 36.3218C53.7243 34.6202 51.546 33.7064 50.2338 34.8374ZM33.9972 42.625C31.0715 44.0475 35.0044 51.113 40.3339 54.0089C41.9786 54.9026 41.9069 54.7249 41.9107 57.9224C41.9147 61.4173 42.5682 62.4768 44.3104 61.8131C44.9249 61.579 51.5593 54.8914 51.9852 54.0768C52.5797 52.9399 51.6817 51.6711 50.2825 51.6711C49.5298 51.6711 49.3018 51.8298 47.5561 53.5708C45.2895 55.8312 45.4952 55.7758 45.4952 54.1271C45.4952 52.7601 44.9938 51.6711 44.3645 51.6711C43.8895 51.6711 40.5522 49.8819 39.8351 49.2428C38.605 48.1464 37.3158 46.0465 36.6149 43.9979C36.1658 42.6856 35.0625 42.107 33.9972 42.625ZM58.2687 43.2431C57.9634 43.4835 57.7136 43.7974 57.7136 43.9401C57.7136 44.6774 55.971 47.6596 54.892 48.7689C53.7575 49.9351 53.6191 50.2104 53.6984 51.1434C53.7521 51.7758 54.6899 52.5154 55.4382 52.5154C56.9122 52.5154 60.5487 47.5748 60.9692 45.001C61.2479 43.2942 59.5809 42.2088 58.2687 43.2431ZM41.8345 43.6591C40.8189 43.9601 40.3339 44.6622 40.3339 45.8316C40.3339 48.2293 43.4509 48.9405 44.5579 46.7952C45.4819 45.0048 43.8056 43.0746 41.8345 43.6591ZM51.135 43.595C50.1312 43.7383 49.4097 45.1067 49.7282 46.2631C50.1908 47.9418 51.9654 48.3963 53.2054 47.1539C54.8151 45.5409 53.4879 43.2591 51.135 43.595Z"
                            fill="white"
                          />

                          <defs>
                            <filter
                              id="filter0_d_410_5110"
                              x="0"
                              y="0"
                              width="95"
                              height="95"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="1" dy="4" />
                              <feGaussianBlur stdDeviation="7.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.666667 0 0 0 0 0.466667 0 0 0 0 1 0 0 0 0.4 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_410_5110"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_410_5110"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </>
                      )}
                    </svg>

                    <h2 className="text-[24px] font-semibold">{word}</h2>
                    <svg
                      className="my-2"
                      width="76"
                      height="16"
                      viewBox="0 0 76 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_409_4946)">
                        <path
                          d="M7 6H67"
                          stroke="#00AEFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_409_4946"
                          x="0"
                          y="0"
                          width="76"
                          height="16"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dx="1" dy="2" />
                          <feGaussianBlur stdDeviation="3.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.681529 0 0 0 0 1 0 0 0 0.5 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_409_4946"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_409_4946"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>

                    <p className="text-[16px]">
                      {section.featureparagraph[index]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
