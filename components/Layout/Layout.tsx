import React, { ReactNode } from 'react';
import Head from 'next/head';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUser } from '@clerk/nextjs';

interface Props {
    children?: ReactNode;
    bgColor: string;
    icon: string;
    text: string;
    border: string;
    hasBg: Boolean;
}

const Layout = ({ children, bgColor, icon, text, border, hasBg }: Props) => {
    return (
        <div
            className={`w-full flex h-screen`}
            style={{
                backgroundColor: bgColor,
            }}
        >

            <Head>
                <title>{text} | OwnBoon</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <Sidebar border={border} />
            <div className="w-4/5 ml-auto">
                <Navbar icon={icon} text={text} bgColor={bgColor} border={border} />
                <div
                    className="text-[#DDDDDD] py-20 px-8 max-h-full overflow-y-scroll"
                    style={{
                        backgroundImage: hasBg ? 'url(lofi.svg)' : 'none',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;