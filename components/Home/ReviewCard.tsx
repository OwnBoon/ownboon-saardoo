import VanillaTilt from "vanilla-tilt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect } from "react";

export default function ReviewCard({
  name,
  title,
  rating,
  review,
  border,
  pfp,
  pc,
}) {
  useEffect(() => {
    if (pc === true) {
      VanillaTilt.init(document.querySelectorAll(".review-card"), {
        max: 15,
        speed: 400,
        transition: true,
      });
    }
  }, []);
  return (
    <div
      className={`md:w-[23vw] w-[350px] h-auto cursor-pointer  review-card rounded mx-5 mb-0 md:mb-5  flex flex-col p-7 ${
        border === "green"
          ? "border-[#00ff3773]"
          : border === "blue"
          ? "border-[#00AEFF73]"
          : border === "red"
          ? "border-[#ff737373]"
          : ""
      }  border `}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-between space-x-1 items-center">
          <div className="flex flex-col">
            <Image
              loading="lazy"
              src={`${pfp ? "/" + pfp : "/user.png"}`}
              alt="userImage"
              width={40}
              height={40}
              className="md:w-[2vw] rounded-3xl "
            />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="font-bold md:text-[1vw] text-[1rem] ">{name}</h3>
            <h4 className="md:text-[0.8vw] text-[0.8rem] text-[gray]">{title}</h4>
          </div>
        </div>
        <div className="flex  flex-row place-items-center space-x-1">
          {rating === 2 ? (
            <>
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
            </>
          ) : rating === 3 ? (
            <>
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
            </>
          ) : rating === 4 ? (
            <>
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
            </>
          ) : rating === 5 ? (
            <>
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
              <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
            </>
          ) : (
            <FontAwesomeIcon icon={faStar} className="md:w-[0.9vw]" color={"orange"} />
          )}
        </div>
      </div>
      <div className={`${name ==="Vanessa"? "" :""} my-5`}>
        <p className="text-left break-normal font-normal font-poppins md:text-[0.9vw] text-[1rem]">
          {review}
        </p>
      </div>
    </div>
  );
}
