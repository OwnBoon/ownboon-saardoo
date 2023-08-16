import React from 'react';
import Layout from '../components/Layout/Layout';
import ComingSoonCard from '../components/ComingSoonCard';

const socials = () => {
  return (
    <Layout
      hasBg={false}
      bgColor={'#121212'}
      icon='socials.svg'
      text='Socials'
      border='gray-500'
      children={
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <ComingSoonCard />
        </div>
      }
    />
  );
};

export default socials;