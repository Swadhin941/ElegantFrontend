import React from 'react';
import TopBanner from '../TopBanner/TopBanner';
import useTitle from '../../CustomHook/useTitle/useTitle';
const Home = () => {
    useTitle('3legant- Home')
    return (
        <div className='container-fluid p-0'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <TopBanner></TopBanner>
                </div>
            </div>
        </div>
    );
};

export default Home;