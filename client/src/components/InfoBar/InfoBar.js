import React from 'react'

import './InfoBar.css'
import onlineIcon from '../../icons/onlineIcon';
import closeIcon from '../../icons/closeIcon';

const InfoBar = ({room}) => {
    <div className='infoBar'>
        <div className="leftInnerContainer">
            <img classname="onlineIcon" src={onlineIcon} alt="Online image"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                <img src={closeIcon} alt="CLose image" />
            </a> 
        </div>
    </div>
}

export default InfoBar;