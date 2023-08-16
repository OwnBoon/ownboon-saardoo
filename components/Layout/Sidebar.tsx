import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
    border: string
}

const Sidebar = ({ border }: Props) => {

    const router = useRouter();
    const selected = "transition-all duration-150 w-fit cursor-pointer flex items-center gap-8 text-white";
    const normal = "w-fit cursor-pointer flex items-center text-gray-400 gap-8";

    return (
        <div
            className={` h-screen w-[11vw]  text-[#FFFFFF] text-[15px] flex flex-col items-start justify-between p-5 border-r-2 border-[#1B1F3A] fixed`}
        >
            <div className="logo flex flex-col   gap-y-8" >
                <div className="flex flex-row  gap-8 items-center">
                <img className='w-[50px]' src="ownboon.svg" />
                <span  className='font-fontspring '>OwnBoon</span>

                </div>
                <div className="flex flex-col  justify-center gap-y-8">
                <div
                    onClick={() => router.push("/socials")}
                    className={router.pathname == "/socials" ? selected : normal}
                >
                    <Image
                        src="socials.svg"
                        alt={""}
                        width={50}
                        height={50}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span className='font-fontspring text-[15px]'>Socials</span>
                </div>
                <div
                    onClick={() => router.push("/chats")}
                    className={router.pathname == "/chats" ? selected : normal}
                >
                    <Image
                        src="chat.svg"
                        width={50}
                        height={50}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span  className='font-fontspring text-[15px]'>Chats</span>
                </div>
                <div
                    onClick={() => router.push("/buddies")}
                    className={router.pathname == "/buddies" ? selected : normal}
                >
                    <Image
                        src="buddies.svg"
                        width={50}
                        height={50}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span  className='font-fontspring'>Buddies</span>
                </div>
                <div
                    onClick={() => router.push("/workspace")}
                    className={router.pathname == "/workspace" ? selected : normal}
                >
                    <Image
                        src="workspace.svg"
                        width={50}
                        height={50}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span  className='font-fontspring'>Workspace</span>
                </div>
                <div
                    onClick={() => router.push("/roadmap")}
                    className={router.pathname == "/roadmap" ? selected : normal}
                >
                    <Image
                        src="roadmap.svg"
                        width={50}
                        height={50}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span  className='font-fontspring'>Roadmap</span>
                </div>
                <div
                    onClick={() => router.push("/lofi")}
                    className={router.pathname == "/lofi" ? selected : normal}
                >
                    <Image
                        src="workspace.svg"
                        width={50}
                        height={50}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                    />
                    <span  className='font-fontspring'>Lofi</span>
                </div>

                </div>
            </div>
            <div className="flex flex-col gap-8">
            </div>
            <div className="p-2 flex gap-4 items-center text-white">
                <Image
                    src="feedback.svg"
                    width={50}
                    height={50}
                    alt={""}
                    className="bg-[#1B1F3A] p-2 rounded border-2 border-gray-700"
                />
                <span  className='font-fontspring'>Feedback</span>
            </div>
        </div>
    );
};

export default Sidebar;