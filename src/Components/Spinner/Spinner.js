import React from 'react';
import "./Spinner.css";
import ScaleLoader from "react-spinners/ScaleLoader";

const Spinner = () => {
    return (
        <div className='container-fluid spinnerContainer'>
            <ScaleLoader height={35} width={10} speedMultiplier={2} color="#FFC95C" />
        </div>
    );
};

export default Spinner;