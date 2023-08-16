import React from 'react';
import Layout from '../components/Layout/Layout';
import ComingSoonCard from '../components/ComingSoonCard';

const chat = () => {
    return (
        <Layout
            hasBg={false}
            bgColor={'#121212'}
            icon='chat.svg'
            text='Chats'
            border='gray-500'
            children={
                <div className='flex flex-col items-center justify-center w-full h-full'>
                    <ComingSoonCard />
                </div>
            }
        />
    );
};

export default chat;