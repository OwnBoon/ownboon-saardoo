import React from 'react';
import Layout from '../components/Layout/Layout';
import Roadmap from '../components/pages/Roadmap';

const home = () => {
    return (
        <Layout bgColor={'#131626'} children={<Roadmap />} icon='socials.svg' text='Home' border='1B1F3A' />
    );
};

export default home;