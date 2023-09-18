import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [pc, setPc] = useState(false);
  function setInitialPositions() {
    if (window.innerWidth < 768) {
      setPc(false);
    } else {
      setPc(true);
    }
  }

  useEffect(() => {
    setInitialPositions();
    window.addEventListener("resize", setInitialPositions);

    return () => {
      window.removeEventListener("resize", setInitialPositions);
    };
  }, []);
  return (
    <div className="border justify-center items-center border-[#E0E0E0]">
      <footer className="mt-5 mx-auto md:flex  md:justify-between  md:w-[80%] ">
        <div className=" w-full  p-4 py-6 lg:py-2 ">
          <div className="md:flex md:justify-between ">
            {pc === true ? (
              <div className="mb-6 md:mb-0">
                <Link href="https://ownboon.com/" className="flex items-center">
                  <Image
                    width={30}
                    height={30}
                    src="/logo.png"
                    className=" mr-1 rounded-full "
                    alt="Ownboon Logo"
                  />
                  <span className="self-center  text-2xl font-semibold whitespace-nowrap ">
                    Own<span className="text-[#00F0B5]">Boon</span>
                  </span>
                </Link>
                <div className="pt-[1vh]  text-[18px]">
                  <h1 className="font-semibold">
                    Ignite your <span className=" tracking-[3px]">GROWTH</span>
                  </h1>
                  <div className="flex flex-row ">
                    <h1 className="font-semibold">
                      Unleash your{" "}
                      <span className=" tracking-[3px]">POTENTIAL</span>
                    </h1>
                  </div>
                  <div className="flex flex-row text-3xl space-x-4 mt-5">
                    <Link href="https://www.linkedin.com/company/ownboon">
                      <FontAwesomeIcon color={"#343434"} icon={faLinkedin} />
                    </Link>
                    <Link href="https://instagram.com/OwnBoon">
                      <FontAwesomeIcon color={"#343434"} icon={faInstagram} />
                    </Link>
                    <Link href="https://twitter.com/OwnBoonHQ">
                      <FontAwesomeIcon color={"#343434"} icon={faTwitter} />
                    </Link>
                    <Link href="https://discord.gg/nxeUX3Uufn">
                      <FontAwesomeIcon color={"#343434"} icon={faDiscord} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 md:mb-0 justify-between flex flex-row">
                  <div className="flex flex-col pt-[1vh]  text-[1.1rem]">
                    <Link
                      href="https://flowbite.com/"
                      className="flex items-center"
                    >
                      <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8 mr-3"
                        alt="FlowBite Logo"
                      />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                        Own<span className="text-cyan">Boon</span>
                      </span>
                    </Link>
                    <h1 className="font-semibold mt-2 ">
                      Ignite your{" "}
                      <span className=" tracking-[3px]">GROWTH</span>
                    </h1>
                    <h1 className="font-semibold">
                      Unleash your{" "}
                      <span className=" tracking-[3px]">POTENTIAL</span>
                    </h1>
                  </div>
                  <div className="flex flex-row box-content	text-3xl space-x-2 mt-5">
                    <div className="flex flex-col">
                      <Link href="https://www.linkedin.com/company/ownboon">
                        <FontAwesomeIcon color={"#343434"} icon={faLinkedin} />
                      </Link>
                      <Link href="https://instagram.com/OwnBoon">
                        <FontAwesomeIcon color={"#343434"} icon={faInstagram} />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <Link href="https://twitter.com/OwnBoonHQ">
                        <FontAwesomeIcon color={"#343434"} icon={faTwitter} />
                      </Link>
                      <Link href="https://discord.gg/nxeUX3Uufn">
                        <FontAwesomeIcon color={"#343434"} icon={faDiscord} />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-8 font-poppins sm:gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-6 text-[1rem] font-bold text-gray-900  ">
                  Company
                </h2>
                <ul className="text-gray-600 text-[0.9rem] dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href="/#about" className="hover:underline ">
                      About Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="#" className=" cursor-not-allowed">
                      Terms of Use
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="#" className=" cursor-not-allowed">
                      Privacy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="https://discord.gg/KBNaHgn287"
                      className="hover:underline"
                    >
                      Give feedback
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-[1rem] font-bold text-gray-900">
                  Contact Us
                </h2>
                <ul className="text-gray-600 text-[0.9rem] font-medium">
                  <li className="mb-4">
                    <Link
                      href="https://discord.gg/nxeUX3Uufn"
                      className="hover:underline"
                    >
                      Join our community
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href="mailto:team@ownboon.com"
                      className="hover:underline"
                    >
                      Email Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
