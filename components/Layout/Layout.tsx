import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Head from "next/head";
import { useUser } from '@clerk/nextjs';

interface Props {
    children?: ReactNode;
    bgColor: string;
    icon: string;
    text: string;
    border: string;
}

const Layout = ({ children, bgColor, icon, text, border }: Props) => {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <div
            className={`w-full flex h-screen`} style={{ backgroundColor: bgColor }}
        >
            <Head>
                <title> Dashboard @ {user?.firstName || user?.username} </title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Sidebar border={border} />
            <div className="w-4/5 ml-auto">
                <Navbar icon={icon} text={text} bgColor={bgColor} border={border} />
                <div className="text-[#DDDDDD] py-20 px-8 max-h-full overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;