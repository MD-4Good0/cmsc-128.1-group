import React from 'react';
import './Header.css';

import home_icon from '../Assets/Home-LO.png';

const Header = () => {
    return (
        <div className='header'>
            <div className="title-lo-move">
                <div className="title-short-lo">MLV DTP</div>
                <div className="title-lo">MLV Diagnostic Test Portal</div>
            </div>

            <div className="home-lo">
                    <img src={home_icon} alt="Home" />
            </div>
        </div>
    );
}

export default Header;
