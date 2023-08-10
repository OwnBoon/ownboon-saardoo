import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface Props {
    children?: ReactNode;
    bgColor: any;
    icon: string;
    text: string;
}

const Layout = ({ children, bgColor, icon, text }: Props) => {
    return (
        <div
            className={`absolute w-full h-full flex bg-[#${bgColor}]`}
        >
            <Sidebar />
            <div className="w-4/5">
                <Navbar icon={icon} text={text} />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;