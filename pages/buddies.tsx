import React from 'react';
import Layout from '../components/Layout/Layout';
import ComingSoonCard from '../components/ComingSoonCard';

const buddies = () => {
  return (
    <Layout
      hasBg={false}
      bgColor={'#121212'}
      icon='buddies.svg'
      text='Buddies'
      border='gray-500'
      children={
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <ComingSoonCard />
        </div>
      }
    />
  );
};

export default buddies;