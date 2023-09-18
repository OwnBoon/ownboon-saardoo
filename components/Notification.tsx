import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  shownotifications: boolean;
  setShownotifications?: (value: boolean) => void;
}

export default function Notification({
  setShownotifications,
  shownotifications,
}: Props) {
  return (
    <div
      className={`flex flex-col fade fixed right-3 rounded-b-2xl w-[300px] max-h-[90vh] transition-all duration-[2000] overflow-scroll ${
        shownotifications ? "translate-y-0 top-24" :"-translate-y-[100vh] "
      } shadow-2xl  p-5  z-30 items-center bg-[#101010]`}
    >
      <div className="flex flex-col  items-center justify-center">
        <h1 className="text-[1.3vw] my-2  text-white text-center ">
          Notifications
        </h1>
        <div className="w-44 h-[0px] border border-neutral-400 mb-4"></div>
      </div>
      <div className="flex flex-col w-full justify-center space-y-6 my-2">
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
        <Link href={""} className="flex p-2 bg-[#191919] w-full flex-row   space-x-4">
          <Image
            width={45}
            height={45}
            className={`p-2  fade rounded hover:brightness-150 transition-all cursor-pointer`}
            src="cancel.svg"
            alt={"cancel"}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-poppins text-lg md:text-xl">Heading of notification</h1>
            <h2 className="text-gray-400 font-poppins text-md">Little Descrioption</h2>
          </div>
        </Link>
       
      </div>
    </div>
  );
}
