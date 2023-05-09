import React from 'react';
import "../styles/app.scss";
import Toolbar from '../components/Toolbar';
import Canvas from '../components/Canvas';
import SettingBar from '../components/Settingbar';

const Main = () => {
    return (
        <div className='main'>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
}

export default Main;