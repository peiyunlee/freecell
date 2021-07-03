import React, { Component } from 'react';
import styles from './style.scss';
import info from '../../assets/images/info.png'

class Menu extends React.Component {

    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.gamestate}>
                    <div className={styles.info}><img src={info} alt="" /></div>
                    <div>TIME: 00:00</div>
                    <div>SCORE: 0</div>
                </div>
                <div className={styles.gamecontroller}>
                    <button>NEW GAME</button>
                    <button>RESTART</button>
                    <button>HINT</button>
                    <button>UNDO</button>
                </div>
            </div>
        );
    }
}

export default Menu;