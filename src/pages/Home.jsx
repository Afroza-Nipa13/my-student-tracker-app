import React from 'react';
import Banner from '../shared/Banner';
import ClassList from './classes/ClassList';

const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <ClassList></ClassList>
        </div>
    );
};

export default Home;