import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
    border: string
}

const Sidebar = ({ border }: Props) => {

    const router = useRouter();
    const selected = "transition-all duration-150 w-fit cursor-pointer flex items-center gap-8 text-[#2CD3E1]";
    const normal = "w-fit cursor-pointer flex items-center gap-8";

    return (
        <div
            className={`w-1/5 h-screen text-[#DDDDDD] flex flex-col items-start justify-between p-5 border-r-2 border-[#${border}] fixed`}
        >
            <div className="logo flex justify-between items-center gap-8" >
                <img src="ownboon.svg" />
                <span>OwnBoon</span>
            </div>
            <div className="flex flex-col gap-8">
                <div
                    onClick={() => router.push("/socials")}
                    className={router.pathname == "/socials" ? selected : normal}
                >
                    <Image
                        src="socials.svg"
                        alt={""}
                        width={35}
                        height={35}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                    />
                    <span>Socials</span>
                </div>
                <div
                    onClick={() => router.push("/chats")}
                    className={router.pathname == "/chats" ? selected : normal}
                >
                    <Image
                        src="chat.svg"
                        width={35}
                        height={35}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                    />
                    <span>Chats</span>
                </div>
                <div
                    onClick={() => router.push("/buddies")}
                    className={router.pathname == "/buddies" ? selected : normal}
                >
                    <Image
                        src="buddies.svg"
                        width={35}
                        height={35}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                    />
                    <span>Buddies</span>
                </div>
                <div
                    onClick={() => router.push("/workspace")}
                    className={router.pathname == "/workspace" ? selected : normal}
                >
                    <Image
                        src="workspace.svg"
                        width={35}
                        height={35}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                    />
                    <span>Workspace</span>
                </div>
                <div
                    onClick={() => router.push("/roadmap")}
                    className={router.pathname == "/roadmap" ? selected : normal}
                >
                    <Image
                        src="roadmap.svg"
                        width={35}
                        height={35}
                        alt={""}
                        className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                    />
                    <span>Roadmap</span>
                </div>
            </div>
            <div className="p-2 flex gap-4 items-center text-[#2CD3E1]">
                <Image
                    src="feedback.svg"
                    width={35}
                    height={35}
                    alt={""}
                    className="bg-[#1B1F3A] p-2 rounded border-2 border-[#333858]"
                />
                <span>Feedback</span>
            </div>
        </div>
    );
};

export default Sidebar;