import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


import { useContext, useEffect, useState } from "react";
export default function Navbar() {
  const router = useRouter();
  const { asPath } = router;
  const handleClick = () => {
    //openPopup(true);
  };
  const [display, setDisplay] = useState(false);
  const [displaylock, lockDisplay] = useState(false);
  const [displaypromise, promiseDisplay] = useState(false);
  const dropdownlock = () => {
    if (displaypromise === false) {
      lockDisplay(true);
      promiseDisplay(true);
    } else {
      promiseDisplay(false);
      lockDisplay(false);
    }
  };
  const hoverInside = () => {
    setDisplay(true);
  };
  const hoverOutside = () => {
    if (displaylock === true) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const [bugermenu, setBurgerMenu] = useState(false);
  const dorpdownburgermenu = () => {
    if (bugermenu === false) {
      setBurgerMenu(true);
    } else {
      setBurgerMenu(false);
    }
  };

  const [show, setShow] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav ul li");
    window.onscroll = () => {
      var current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });

      navLi.forEach((li) => {
        li.classList.remove("activelink");
        if (li.classList.contains(current)) {
          li.classList.add("activelink");
        }
      });
    };

    const handleScroll = () => {
     

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
        setShow(visible);
        setPrevScrollPos(currentScrollPos);
      
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav
        className={`${show? "navbarhide":"navbarshow"} px-5 sm:px-4 text-[0.9rem] py-2.5 fixed  w-full z-100 bg-white z-20 top-0 left-0 text-[#2E2E2E]  font-inter `}
      >
        <div className="container bg-white flex flex-wrap items-center justify-between mx-auto">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={dorpdownburgermenu}
            className="inline-flex  items-center p-2 rounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </button>
          <Link href="https://ownboon.com" className="flex items-center">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              className=" mr-1 rounded-full "
              alt="Ownboon Logo"
            />
            <span className="self-center text-[20px] font-semibold whitespace-nowrap ">
              Own<span className="text-[#00F0B5]">Boon</span>
            </span>
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              className="  text-white !bg-gradient-to-br !from-[#AA77FF] !via-[#00AEFF] !to-[#00F0B5]  sm:text-[1rem] xs:text[0.5rem] login  w-[111px] h-[38px] text-center  rounded-full"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              Login
            </button>
          </div>
          <div
            className={`items-center text-[0.9rem] justify-between ${
              bugermenu === true ? "" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 bg-white rounded-lg md:flex-row md:space-x-8 md:mt-0 ">
              <li>
                <Link
                  href={`${asPath === "/" ? "/#home" : "/"}`}
                  className={`transform-letter  block py-2 pl-3 pr-4 md:p-0 ${
                    asPath == "/" ? " activelink font-bold" : "Link"
                  }`}
                  id="homelink"
                  scroll={false}
                >
                  Home
                </Link>
              </li>
              <li onMouseEnter={hoverInside} onMouseLeave={hoverOutside}>
                <button
                  id="dropdownNavbarLink"
                  onClick={dropdownlock}
                  className={`transform-letter flex text-left justify-between w-full  py-2 pl-3 pr-4 md:p-0 font-medium ${
                    asPath == "/productivity" ||
                    asPath == "/habits" ||
                    asPath == "/workspace" ||
                    asPath == "/community"
                      ? "activelink font-bold"
                      : "Link"
                  }  md:w-auto `}
                >
                  Explore
                  <svg
                    className="w-5 h-5 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`${
                    display === true ? "z-100 ml-2 " : "hidden"
                  } bg-white items-start  font-light   divide-y divide-gray-100 rounded-lg  w-full `}
                >
                  <ul
                    className="ml-[-30px] z-100 bg-white justify-center py-3 px-5 items-center absolute text-gray-700 transform-letter"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/habits"
                        className={`transform-letter block p-4  ${
                          asPath === "/habits" ? "activelink font-bold" : "Link"
                        }`}
                      >
                        Habits
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/productivity"
                        className={`transform-letter block p-4  ${
                          asPath == "/productivity"
                            ? "activelink font-bold"
                            : "Link"
                        }`}
                      >
                        Productivity
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/community"
                        className={`transform-letter  block p-4  ${
                          asPath == "/community"
                            ? "activelink font-bold"
                            : "Link"
                        }`}
                      >
                        Community
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  href="/#benefit"
                  scroll={false}
                  id="benefitlink"
                  className={`transform-letter block  ${
                    asPath == "/#benefit" ? "activelink font-bold" : "Link"
                  } py-2  pl-3 pr-4 md:p-0 `}
                >
                  Benefit
                </Link>
              </li>
              <li>
                <Link
                  scroll={false}
                  href="/#about"
                  className={`transform-letter block  ${
                    asPath == "/#about" ? "activelink font-bold" : "Link"
                  } py-2  pl-3 pr-4 md:p-0 `}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
