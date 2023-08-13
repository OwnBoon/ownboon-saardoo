import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface Props {
    children?: ReactNode;
    bgColor: string;
    icon: string;
    text: string;
    border: string;
}

const Layout = ({ children, bgColor, icon, text, border }: Props) => {
    return (
        <div
            className={`w-full flex h-screen`} style={{ backgroundColor: bgColor }}
        >
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