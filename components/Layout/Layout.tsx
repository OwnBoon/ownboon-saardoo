import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface Props {
    children?: ReactNode;
    bgColor: string;
    icon: string;
    text: string;
}

const Layout = ({ children, bgColor, icon, text }: Props) => {
    return (
        <div
            className={`w-full flex bg-[#${bgColor}]`}
        >
            <Sidebar />
            <div className="w-4/5 ml-auto">
                <Navbar icon={icon} text={text} bgColor={bgColor} />
                <div className="text-[#DDDDDD] p-8 mt-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;